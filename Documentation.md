# ThreeJS & React Three Fiber Fundamentals

## Table of Contents
1. [ThreeJS Core Concepts](#threejs-core-concepts)
2. [React Three Fiber Basics](#react-three-fiber-basics)
3. [Scene Management](#scene-management)
4. [Materials & Texturing](#materials--texturing)
5. [Lighting System](#lighting-system)
6. [Camera & Controls](#camera--controls)
7. [Performance Optimization](#performance-optimization)
8. [Asset Loading](#asset-loading)
9. [3D Math Essentials](#3d-math-essentials)
10. [WebGL Fundamentals](#webgl-fundamentals)

---

## ThreeJS Core Concepts

### Scene Graph Architecture
ThreeJS uses a hierarchical scene graph where objects are organized in a tree structure.

```javascript
// Scene is the root container
const scene = new THREE.Scene()

// Group organizes multiple objects
const group = new THREE.Group()
scene.add(group)

// Individual objects (meshes, lights, cameras)
const mesh = new THREE.Mesh(geometry, material)
group.add(mesh)
```

### Core Object Types

#### **Object3D** (Base Class)
- Parent class for all 3D objects
- Handles transformations, children, and properties
- Methods: `add()`, `remove()`, `traverse()`, `getWorldPosition()`

#### **Group**
- Container for organizing multiple objects
- Inherits from Object3D
- Useful for applying transformations to multiple objects

#### **Mesh**
- Combines geometry and material
- Renders visible 3D objects
- Core of most 3D scenes

### Coordinate System
- **X-axis**: Right (positive) / Left (negative)
- **Y-axis**: Up (positive) / Down (negative)  
- **Z-axis**: Forward (positive) / Backward (negative)
- **Units**: Arbitrary (typically meters)

---

## React Three Fiber Basics

### Canvas Component
The main container that creates a WebGL context and renders the 3D scene.

```jsx
import { Canvas } from '@react-three/fiber'

<Canvas
  camera={{ position: [0, 0, 5], fov: 75 }}
  gl={{ antialias: true, alpha: true }}
  shadows
  dpr={[1, 2]} // Device pixel ratio
>
  {/* 3D content goes here */}
</Canvas>
```

### Key Canvas Props
- **camera**: Camera configuration
- **gl**: WebGL context options
- **shadows**: Enable shadow mapping
- **dpr**: Device pixel ratio for responsive rendering
- **performance**: Performance settings

### Suspense Integration
React Three Fiber works seamlessly with React Suspense for loading states.

```jsx
import { Suspense } from 'react'

<Suspense fallback={<LoadingSpinner />}>
  <Model />
</Suspense>
```

### Essential Hooks

#### **useFrame**
Executes code on every frame (60fps).

```jsx
import { useFrame } from '@react-three/fiber'

function RotatingBox() {
  const meshRef = useRef()
  
  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta
  })
  
  return <mesh ref={meshRef}>...</mesh>
}
```

#### **useThree**
Access the ThreeJS scene, camera, and renderer.

```jsx
import { useThree } from '@react-three/fiber'

function MyComponent() {
  const { scene, camera, gl } = useThree()
  
  // Access ThreeJS objects
  return null
}
```

---

## Scene Management

### Scene Traversal
Navigate through the scene graph to find and modify objects.

```javascript
scene.traverse((child) => {
  if (child instanceof THREE.Mesh) {
    // Found a mesh
    console.log('Mesh found:', child.name)
  }
})
```

### Object Positioning
```javascript
// Set position
mesh.position.set(x, y, z)
mesh.position.x = 1
mesh.position.y = 2
mesh.position.z = 3

// Get world position
const worldPosition = new THREE.Vector3()
mesh.getWorldPosition(worldPosition)
```

### Transformations
```javascript
// Rotation (in radians)
mesh.rotation.set(x, y, z)
mesh.rotation.x = Math.PI / 2 // 90 degrees

// Scale
mesh.scale.set(x, y, z)
mesh.scale.setScalar(2) // Uniform scale

// Quaternion rotation
mesh.quaternion.setFromAxisAngle(axis, angle)
```

---

## Materials & Texturing

### Material Types

#### **MeshStandardMaterial** (PBR)
Physically Based Rendering material with realistic lighting.

```javascript
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 0.5,    // 0-1: How metallic the surface is
  roughness: 0.5,    // 0-1: How rough/smooth the surface is
  normalMap: normalTexture,
  aoMap: aoTexture,
  emissive: 0x000000,
  emissiveIntensity: 1
})
```

#### **MeshBasicMaterial**
Simple material that doesn't react to lighting.

```javascript
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  transparent: true,
  opacity: 0.5
})
```

#### **MeshPhongMaterial**
Traditional lighting model with specular highlights.

```javascript
const material = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  shininess: 100,
  specular: 0x444444
})
```

### Texture Loading
```javascript
import { useTexture } from '@react-three/drei'

function TexturedMesh() {
  const texture = useTexture('/texture.jpg')
  
  return (
    <mesh>
      <boxGeometry />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}
```

### Texture Properties
```javascript
texture.wrapS = THREE.RepeatWrapping
texture.wrapT = THREE.RepeatWrapping
texture.repeat.set(2, 2)
texture.offset.set(0.5, 0.5)
texture.rotation = Math.PI / 4
```

---

## Lighting System

### Light Types

#### **AmbientLight**
Provides uniform lighting across the entire scene.

```jsx
<ambientLight intensity={0.5} color="#ffffff" />
```

#### **DirectionalLight**
Simulates distant light source (like the sun).

```jsx
<directionalLight 
  position={[10, 10, 5]} 
  intensity={1} 
  castShadow
  shadow-mapSize-width={2048}
  shadow-mapSize-height={2048}
/>
```

#### **PointLight**
Radiates light in all directions from a point.

```jsx
<pointLight 
  position={[0, 5, 0]} 
  intensity={1} 
  distance={10}
  decay={2}
/>
```

#### **SpotLight**
Cone-shaped light beam.

```jsx
<spotLight 
  position={[0, 10, 0]} 
  angle={0.3} 
  penumbra={0.1} 
  intensity={1}
  castShadow
/>
```

### Environment Lighting
```jsx
import { Environment } from '@react-three/drei'

<Environment preset="sunset" />
// or custom environment
<Environment>
  <Lightformer intensity={1} position={[0, 5, 0]} />
</Environment>
```

### Shadow Configuration
```javascript
// Enable shadows on renderer
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Configure shadow properties
light.shadow.camera.near = 0.1
light.shadow.camera.far = 100
light.shadow.camera.left = -10
light.shadow.camera.right = 10
light.shadow.camera.top = 10
light.shadow.camera.bottom = -10
```

---

## Camera & Controls

### Camera Types

#### **PerspectiveCamera** (Most Common)
```jsx
<Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
```

#### **OrthographicCamera**
```jsx
<Canvas camera={{ 
  position: [0, 0, 5], 
  zoom: 50,
  left: -1,
  right: 1,
  top: 1,
  bottom: -1
}}>
```

### Camera Properties
```javascript
camera.position.set(x, y, z)
camera.lookAt(target)
camera.fov = 75
camera.near = 0.1
camera.far = 1000
camera.aspect = width / height
camera.updateProjectionMatrix()
```

### Controls

#### **OrbitControls**
```jsx
import { OrbitControls } from '@react-three/drei'

<OrbitControls 
  enablePan={true}
  enableZoom={true}
  enableRotate={true}
  autoRotate={false}
  autoRotateSpeed={1}
  minDistance={1}
  maxDistance={10}
  target={[0, 0, 0]}
/>
```

#### **TransformControls**
```jsx
import { TransformControls } from '@react-three/drei'

<TransformControls mode="translate" object={meshRef.current} />
```

---

## Performance Optimization

### Geometry Optimization
```javascript
// Compute bounding volumes
geometry.computeBoundingSphere()
geometry.computeBoundingBox()

// Merge vertices
geometry.mergeVertices()

// Dispose unused geometries
geometry.dispose()
```

### Material Optimization
```javascript
// Batch similar materials
const materialMap = new Map()
materials.forEach(material => {
  const key = `${material.metalness}-${material.roughness}`
  if (!materialMap.has(key)) {
    materialMap.set(key, material)
  }
})

// Dispose materials
material.dispose()
```

### Frustum Culling
```javascript
// Enable automatic culling
mesh.frustumCulled = true

// Manual culling check
const frustum = new THREE.Frustum()
frustum.setFromProjectionMatrix(camera.projectionMatrix)
if (frustum.containsPoint(mesh.position)) {
  // Render mesh
}
```

### Level of Detail (LOD)
```jsx
import { LOD } from '@react-three/drei'

<LOD distances={[0, 10, 50]}>
  <mesh geometry={highDetailGeometry} />
  <mesh geometry={mediumDetailGeometry} />
  <mesh geometry={lowDetailGeometry} />
</LOD>
```

### Instancing
```jsx
import { Instances, Instance } from '@react-three/drei'

<Instances>
  <boxGeometry />
  <meshStandardMaterial />
  <Instance position={[0, 0, 0]} />
  <Instance position={[1, 0, 0]} />
</Instances>
```

---

## Asset Loading

### GLTF/GLB Loading
```jsx
import { useGLTF } from '@react-three/drei'

function Model() {
  const { scene } = useGLTF('/model.gltf')
  return <primitive object={scene} />
}

// Preload for better performance
useGLTF.preload('/model.gltf')
```

### Texture Loading
```jsx
import { useTexture } from '@react-three/drei'

function TexturedObject() {
  const [colorMap, normalMap, roughnessMap] = useTexture([
    '/color.jpg',
    '/normal.jpg', 
    '/roughness.jpg'
  ])
  
  return (
    <mesh>
      <boxGeometry />
      <meshStandardMaterial 
        map={colorMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
      />
    </mesh>
  )
}
```

### Loading States
```jsx
import { useProgress } from '@react-three/drei'

function Loader() {
  const { progress } = useProgress()
  return <div>Loading: {progress}%</div>
}
```

---

## 3D Math Essentials

### Vectors
```javascript
const vector = new THREE.Vector3(x, y, z)

// Common operations
vector.add(otherVector)
vector.subtract(otherVector)
vector.multiplyScalar(scalar)
vector.normalize()
vector.length()
vector.distanceTo(otherVector)
```

### Matrices
```javascript
const matrix = new THREE.Matrix4()

// Transformation matrices
matrix.makeTranslation(x, y, z)
matrix.makeRotationX(angle)
matrix.makeRotationY(angle)
matrix.makeRotationZ(angle)
matrix.makeScale(x, y, z)

// Apply to object
mesh.applyMatrix4(matrix)
```

### Quaternions
```javascript
const quaternion = new THREE.Quaternion()

// Set from axis-angle
quaternion.setFromAxisAngle(axis, angle)

// Slerp interpolation
quaternion.slerp(otherQuaternion, t)

// Apply to object
mesh.quaternion.copy(quaternion)
```

### Raycasting
```javascript
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

// Convert mouse position to normalized device coordinates
mouse.x = (event.clientX / window.innerWidth) * 2 - 1
mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

// Cast ray
raycaster.setFromCamera(mouse, camera)
const intersects = raycaster.intersectObjects(scene.children)
```

---

## WebGL Fundamentals

### Render Pipeline
1. **Vertex Shader**: Processes vertex positions
2. **Fragment Shader**: Processes pixel colors
3. **Rasterization**: Converts geometry to pixels
4. **Framebuffer**: Final output

### Buffer Types
- **Vertex Buffer**: Stores vertex data (positions, normals, UVs)
- **Index Buffer**: Stores triangle indices
- **Uniform Buffer**: Stores shader constants

### Shader Basics
```glsl
// Vertex Shader
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

// Fragment Shader
varying vec2 vUv;
uniform sampler2D map;
void main() {
    gl_FragColor = texture2D(map, vUv);
}
```

### Performance Considerations
- **Draw Calls**: Minimize number of render calls
- **Texture Memory**: Use appropriate texture sizes
- **Geometry Complexity**: Balance detail vs performance
- **Shader Complexity**: Optimize shader operations

---

## Key Interview Topics

### **Must-Know Concepts**
1. **Scene Graph**: Hierarchical object organization
2. **Materials**: PBR vs traditional lighting models
3. **Lighting**: Different light types and their use cases
4. **Performance**: Optimization techniques and best practices
5. **Asset Loading**: GLTF format and loading strategies

### **Common Interview Questions**
- How do you optimize a ThreeJS scene?
- What's the difference between MeshBasicMaterial and MeshStandardMaterial?
- How do you implement shadows in ThreeJS?
- What is PBR and why is it important?
- How do you handle loading states in React Three Fiber?

### **Advanced Topics**
- **Custom Shaders**: Writing vertex/fragment shaders
- **Post-processing**: Effects like bloom, depth of field
- **Animation**: Keyframe animation, morphing
- **Physics**: Integration with physics engines
- **VR/AR**: WebXR integration

---

## Practical Examples from Your Codebase

### Model Loading with Optimization
```jsx
// From CarModel.tsx
const { scene } = useGLTF(CAR_MODEL_URL)

// Scene optimization
const optimizeScene = useCallback(() => {
  scene.traverse((child: Object3D) => {
    if (child instanceof Mesh) {
      // Enable frustum culling
      mesh.frustumCulled = true
      
      // Optimize material
      if (mesh.material instanceof MeshStandardMaterial) {
        mesh.material.needsUpdate = true
        mesh.material.transparent = false
      }
    }
  })
}, [scene])
```

### Dynamic Material Updates
```jsx
// Material property updates
const updateMaterials = useCallback(() => {
  scene.traverse((child: Object3D) => {
    if (child instanceof Mesh && child.material instanceof MeshStandardMaterial) {
      const isCarBody = carBodyNames.some(name => 
        child.name.toLowerCase().includes(name.toLowerCase())
      )
      
      if (isCarBody) {
        child.material.color.setHex(selectedColor)
        child.material.metalness = materialProps.metalness
        child.material.roughness = materialProps.roughness
        child.material.needsUpdate = true
      }
    }
  })
}, [scene, selectedColor, materialProps])
```

### Canvas Configuration
```jsx
// From CarShowcase.tsx
<Canvas
  camera={cameraProps}
  shadows
  gl={{
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
    stencil: false,
    depth: true,
    logarithmicDepthBuffer: false,
    precision: "highp"
  }}
  dpr={[1, 2]}
  performance={{ min: 0.5 }}
  onCreated={({ gl }) => {
    gl.setClearColor(0x000000, 0)
    gl.shadowMap.enabled = true
    gl.shadowMap.type = 2 // PCFSoftShadowMap
    gl.toneMapping = 3 // ACESFilmicToneMapping
  }}
>
```

### Lighting Setup
```jsx
// Comprehensive lighting setup
<ambientLight intensity={0.6} color="#ffffff" />
<directionalLight
  position={[6, 8, 4]}
  intensity={2.2}
  castShadow
  shadow-mapSize-width={2048}
  shadow-mapSize-height={2048}
  shadow-camera-far={30}
  shadow-camera-left={-15}
  shadow-camera-right={15}
  shadow-camera-top={15}
  shadow-camera-bottom={-15}
/>
<Environment resolution={256}>
  <Lightformer intensity={2.5} color="white" position={[0, 6, -8]} scale={[12, 6, 1]} />
</Environment>
```

---

*This documentation covers the essential fundamentals needed for ThreeJS and React Three Fiber development. Focus on understanding the core concepts, performance optimization, and practical implementation patterns. The examples from your codebase demonstrate production-ready implementation with proper optimization, error handling, and user experience considerations.* 