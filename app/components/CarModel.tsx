"use client"

import { useRef, useEffect, useMemo, useCallback, useState } from "react"
import { useGLTF } from "@react-three/drei"
import { type Group, Mesh, MeshStandardMaterial, Object3D, TextureLoader, LinearMipmapLinearFilter, LinearFilter, BufferGeometry } from "three"
import { useCarContext } from "../context/CarContext"

// Use the local car model
const CAR_MODEL_URL = "/car/scene.gltf"

// Preload textures with optimized settings
const textureLoader = new TextureLoader()

// Preload critical textures
const preloadTextures = () => {
  const textures = [
    "/car/textures/carpaint_base_baseColor.png",
    "/car/textures/brakedisk_metallicRoughness.png"
  ]

  textures.forEach(url => {
    const texture = textureLoader.load(url)
    texture.generateMipmaps = true
    texture.minFilter = LinearMipmapLinearFilter
    texture.magFilter = LinearFilter
    texture.anisotropy = 4 // Improve texture quality
  })
}

export default function CarModel() {
  const groupRef = useRef<Group>(null)
  const { scene } = useGLTF(CAR_MODEL_URL)
  const { selectedColor, selectedMaterial } = useCarContext()
  const [isOptimized, setIsOptimized] = useState(false)

  // Memoize material properties to reduce calculations
  const materialProps = useMemo(() => {
    switch (selectedMaterial) {
      case "metallic":
        return { metalness: 0.6, roughness: 0.1 }
      case "matte":
        return { metalness: 0.1, roughness: 0.9 }
      default: // glossy
        return { metalness: 0.3, roughness: 0.2 }
    }
  }, [selectedMaterial])

  // Memoize car body material names
  const carBodyNames = useMemo(() => [
    "carpaint_base",
    "carpaint",
    "body",
    "Body",
    "BODY",
    "paint",
    "Paint",
    "PAINT",
    "exterior",
    "Exterior",
    "EXTERIOR",
    "shell",
    "Shell",
    "SHELL",
    "car",
    "Car",
    "CAR",
  ], [])

  // Optimize scene geometry and materials
  const optimizeScene = useCallback(() => {
    if (!scene || isOptimized) return

    const geometries: BufferGeometry[] = []
    const materials: MeshStandardMaterial[] = []
    const meshes: Mesh[] = []

    // Collect all meshes and their materials
    scene.traverse((child: Object3D) => {
      if (child instanceof Mesh) {
        if (child.geometry) {
          geometries.push(child.geometry)
        }
        if (child.material instanceof MeshStandardMaterial) {
          materials.push(child.material)
        }
        meshes.push(child)
      }
    })

    // Optimize geometries
    geometries.forEach(geometry => {
      if (geometry.attributes.position) {
        geometry.computeBoundingSphere()
        geometry.computeBoundingBox()
      }
    })

    // Optimize materials - batch similar materials
    const materialMap = new Map<string, MeshStandardMaterial>()
    materials.forEach(material => {
      const key = `${material.metalness}-${material.roughness}-${material.color.getHexString()}`
      if (!materialMap.has(key)) {
        materialMap.set(key, material)
      }
    })

    // Apply optimizations to meshes
    meshes.forEach(mesh => {
      // Enable frustum culling (already enabled by default)
      mesh.frustumCulled = true

      // Optimize material
      if (mesh.material instanceof MeshStandardMaterial) {
        mesh.material.needsUpdate = true
        mesh.material.transparent = false // Disable transparency for better performance
        mesh.material.alphaTest = 0.5 // Use alpha test instead of transparency
      }
    })

    setIsOptimized(true)
  }, [scene, isOptimized])

  // Optimized material update function
  const updateMaterials = useCallback(() => {
    if (scene) {
      scene.traverse((child: Object3D) => {
        if (child instanceof Mesh && child.material instanceof MeshStandardMaterial) {
          const isCarBody = carBodyNames.some(
            (name) =>
              child.name.toLowerCase().includes(name.toLowerCase()) ||
              child.material.name.toLowerCase().includes(name.toLowerCase()),
          )

          if (isCarBody) {
            // Apply selected color
            child.material.color.setHex(selectedColor)

            // Apply material properties
            child.material.metalness = materialProps.metalness
            child.material.roughness = materialProps.roughness

            child.material.needsUpdate = true
          }
        }
      })
    }
  }, [scene, selectedColor, materialProps, carBodyNames])

  // Optimize scene on mount
  useEffect(() => {
    optimizeScene()
  }, [optimizeScene])

  // Update materials when dependencies change
  useEffect(() => {
    updateMaterials()
  }, [updateMaterials])

  // Preload textures on mount with better error handling
  useEffect(() => {
    try {
      preloadTextures()
    } catch (error) {
      console.warn("Texture preloading failed:", error)
    }
  }, [])

  return (
    <group ref={groupRef} position={[0, -1.0, 0]} scale={[1.2, 1.2, 1.2]}>
      <primitive object={scene} />
    </group>
  )
}

// Preload the model with higher priority
useGLTF.preload(CAR_MODEL_URL, true) // true = high priority
