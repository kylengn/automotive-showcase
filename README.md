# 🚗 Automotive Showcase - ThreeJS & React Three Fiber

A modern, interactive 3D automotive showcase built with **ThreeJS**, **React Three Fiber**, and **Next.js**. Features real-time car customization, high-performance 3D rendering, and a beautiful user interface.

![Automotive Showcase](https://img.shields.io/badge/ThreeJS-3D%20Graphics-000000?style=for-the-badge&logo=three.js)
![React Three Fiber](https://img.shields.io/badge/React%20Three%20Fiber-3D%20React-61DAFB?style=for-the-badge&logo=react)
![Next.js](https://img.shields.io/badge/Next.js-Framework-000000?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Language-3178C6?style=for-the-badge&logo=typescript)

## ✨ Features

### 🎨 **Interactive 3D Car Model**
- High-quality GLTF car model with realistic materials
- Real-time material and color customization
- Smooth camera controls with orbit and zoom
- Optimized rendering with frustum culling

### 🎛️ **Car Configurator**
- **Color Selection**: Choose from a palette of car colors
- **Material Types**: Switch between Metallic, Matte, and Glossy finishes
- **Real-time Updates**: See changes instantly in 3D
- **Responsive UI**: Beautiful configurator panel with animations

### ⚡ **Performance Optimized**
- **Model Preloading**: Assets load before user interaction
- **Geometry Optimization**: Efficient mesh handling
- **Material Batching**: Reduced draw calls
- **Texture Optimization**: Mipmaps and anisotropic filtering
- **Level of Detail**: Adaptive quality based on distance

### 🎯 **User Experience**
- **Loading States**: Smooth loading with progress indicators
- **Error Handling**: Graceful fallbacks for failed loads
- **Responsive Design**: Works on desktop and mobile
- **Smooth Animations**: Framer Motion integration
- **Accessibility**: ARIA labels and keyboard navigation

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 14** - React framework with App Router
- **React Three Fiber** - ThreeJS React renderer
- **Three.js** - 3D graphics library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library

### **3D & Graphics**
- **@react-three/drei** - ThreeJS helpers and utilities
- **GLTF/GLB** - 3D model format
- **PBR Materials** - Physically Based Rendering
- **Shadow Mapping** - Realistic shadows
- **Environment Lighting** - HDR lighting setup

### **Development Tools**
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **pnpm** - Package manager

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **pnpm** (recommended) or npm

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/automotive-showcase.git
cd automotive-showcase
```

2. **Install dependencies**
```bash
pnpm install
# or
npm install
```

3. **Run the development server**
```bash
pnpm dev
# or
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
automotive-showcase/
├── app/                          # Next.js App Router
│   ├── components/               # React components
│   │   ├── CarModel.tsx         # 3D car model component
│   │   ├── CarShowcase.tsx      # Main showcase component
│   │   ├── CarConfigurator.tsx  # Car customization UI
│   │   ├── HeroSection.tsx      # Landing page hero
│   │   └── ...                  # Other UI components
│   ├── context/                 # React context providers
│   │   ├── CarContext.tsx       # Car state management
│   │   └── ShowcaseUIContext.tsx # UI state management
│   ├── hooks/                   # Custom React hooks
│   │   └── useModelLoading.tsx  # Model loading logic
│   └── page.tsx                 # Main page component
├── components/                   # Shared UI components
│   └── ui/                      # shadcn/ui components
├── public/                      # Static assets
│   └── car/                     # 3D model and textures
├── styles/                      # Global styles
└── Documentation.md             # ThreeJS fundamentals guide
```

## 🎮 Usage

### **Basic Interaction**
1. **Rotate**: Click and drag to rotate the car
2. **Zoom**: Scroll to zoom in/out
3. **Pan**: Right-click and drag to pan
4. **Auto-rotate**: Car automatically rotates when configurator is closed

### **Car Customization**
1. **Open Configurator**: Click the settings button (⚙️)
2. **Change Color**: Select from the color palette
3. **Change Material**: Choose between Metallic, Matte, or Glossy
4. **Real-time Preview**: See changes instantly in 3D

## 🔧 Configuration

### **Performance Settings**
```typescript
// Canvas performance configuration
<Canvas
  dpr={[1, 2]}                    // Device pixel ratio
  performance={{ min: 0.5 }}      // Performance threshold
  gl={{
    antialias: true,              // Anti-aliasing
    powerPreference: "high-performance",
    precision: "highp"            // High precision rendering
  }}
>
```

### **Camera Settings**
```typescript
// Camera configuration
const cameraProps = {
  position: [5, 2.5, 6],          // Camera position
  fov: 40,                        // Field of view
  near: 0.1,                      // Near clipping plane
  far: 1000                       // Far clipping plane
}
```

### **Lighting Setup**
```typescript
// Comprehensive lighting
<ambientLight intensity={0.6} />
<directionalLight 
  position={[6, 8, 4]} 
  intensity={2.2} 
  castShadow 
/>
<Environment resolution={256}>
  <Lightformer intensity={2.5} />
</Environment>
```

## 📚 Documentation

### **ThreeJS & React Three Fiber Fundamentals**
📖 **[Complete Documentation](Documentation.md)** - Comprehensive guide covering:

- **Core Concepts**: Scene graph, materials, lighting
- **Performance Optimization**: Best practices and techniques
- **Asset Loading**: GLTF, textures, loading states
- **3D Math**: Vectors, matrices, transformations
- **WebGL Fundamentals**: Shaders, buffers, render pipeline
- **Interview Preparation**: Common questions and advanced topics

### **Key Topics Covered**
- ✅ Scene Management & Object Hierarchy
- ✅ PBR Materials & Texturing
- ✅ Lighting Systems & Shadows
- ✅ Camera Controls & User Interaction
- ✅ Performance Optimization Techniques
- ✅ Asset Loading & Caching Strategies
- ✅ 3D Math Essentials
- ✅ WebGL Fundamentals

## 🎯 Learning Resources

### **For Beginners**
- [ThreeJS Documentation](https://threejs.org/docs/)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber/)
- [ThreeJS Journey](https://threejs-journey.com/)

### **Advanced Topics**
- [WebGL Fundamentals](https://webglfundamentals.org/)
- [PBR Theory](https://pbr-book.org/)
- [GLTF Specification](https://www.khronos.org/gltf/)

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### **Development Guidelines**
- Follow TypeScript best practices
- Maintain performance optimization
- Add proper error handling
- Include loading states
- Test on multiple devices

## 📄 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

Licensed and maintained with authorization of Kyle Nguyen (kyle.nguyen304@gmail.com) — https://www.kylengn.com

## 🙏 Acknowledgments

- **ThreeJS Community** - Amazing 3D graphics library
- **React Three Fiber Team** - React integration
- **Next.js Team** - React framework
- **shadcn/ui** - Beautiful UI components

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/automotive-showcase/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/automotive-showcase/discussions)
- **Email**: your.email@example.com

---

<div align="center">

**Made with ❤️ using ThreeJS & React Three Fiber**

[![ThreeJS](https://img.shields.io/badge/ThreeJS-3D%20Graphics-000000?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![React Three Fiber](https://img.shields.io/badge/React%20Three%20Fiber-3D%20React-61DAFB?style=for-the-badge&logo=react)](https://docs.pmnd.rs/react-three-fiber/)

</div> 