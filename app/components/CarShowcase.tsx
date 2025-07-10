"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls, ContactShadows, Lightformer } from "@react-three/drei"
import CarModel from "./CarModel"
import CarModelFallback from "./CarModelFallback"
import CarConfigurator from "./CarConfigurator"
import LoadingSpinner from "./LoadingSpinner"
import Navbar from "./Navbar"
import HeroSection from "./HeroSection"
import ModelPreloader from "./ModelPreloader"
import { CarProvider } from "../context/CarContext"
import { ErrorBoundary } from "react-error-boundary"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, Settings } from "lucide-react"
import { ShowcaseUIProvider, useShowcaseUI } from "../context/ShowcaseUIContext"

function ModelErrorFallback() {
  return <CarModelFallback />
}

function CarShowcaseInner() {
  const { isConfiguratorOpen, toggleConfigurator } = useShowcaseUI()

  // Camera and OrbitControls settings
  const cameraProps = isConfiguratorOpen
    ? { position: [6, 1.5, 0] as [number, number, number], fov: 32 }
    : { position: [5, 2.5, 6] as [number, number, number], fov: 40 }
  const orbitProps = isConfiguratorOpen
    ? { autoRotate: false, minDistance: 2.5, maxDistance: 7, target: [0, 0.6, 0] as [number, number, number] }
    : { autoRotate: true, autoRotateSpeed: 6, minDistance: 3, maxDistance: 18, target: [0, 0, 0] as [number, number, number] }

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Navbar />

      {/* Show HeroSection immediately */}
      <div className="absolute inset-0 pointer-events-none pt-16 z-10">
        <AnimatePresence>
          {!isConfiguratorOpen && (
            <motion.div
              key="hero"
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
              className="absolute left-0 top-16 bottom-0 w-1/2 pointer-events-auto h-full flex flex-col justify-center"
            >
              <HeroSection />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right Panel - Configurator - Animated */}
        <AnimatePresence>
          {isConfiguratorOpen && (
            <motion.div
              key="configurator"
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute right-0 top-16 bottom-0 w-96 pointer-events-auto"
              style={{ zIndex: 20 }}
            >
              <button
                className={`absolute top-8 right-0 z-30 bg-gradient-to-r from-red-500 to-orange-500 text-white p-3 rounded-l-xl shadow-lg flex items-center transition-all duration-300 pointer-events-auto ${isConfiguratorOpen ? "" : "ring-2 ring-orange-400"}`}
                onClick={toggleConfigurator}
                aria-label={isConfiguratorOpen ? "Close Configurator" : "Open Configurator"}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <CarConfigurator />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Center area - Allows 3D interaction */}
        <div className="absolute left-1/2 top-16 bottom-0 w-1/2 -ml-1/2 pointer-events-none">
          {/* This area allows 3D model interaction */}
        </div>
      </div>

      {/* 3D Canvas with optimized settings */}
      <Canvas
        camera={cameraProps}
        shadows
        className="bg-transparent"
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
          logarithmicDepthBuffer: false, // Disable for better performance
          precision: "highp" // Use high precision for better quality
        }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}
        onCreated={({ gl }) => {
          // Optimize WebGL context
          gl.setClearColor(0x000000, 0)
          gl.shadowMap.enabled = true
          gl.shadowMap.type = 2 // PCFSoftShadowMap
          gl.toneMapping = 3 // ACESFilmicToneMapping
          gl.toneMappingExposure = 1.2
        }}
      >
        <Suspense fallback={<LoadingSpinner />}>
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
            color="#ffffff"
          />
          <directionalLight position={[-4, 6, 2]} intensity={0.8} color="#ffffff" />
          <directionalLight position={[0, 10, 0]} intensity={1.0} color="#ffffff" />
          <directionalLight position={[0, 2, 8]} intensity={0.6} color="#ffffff" />
          <Environment resolution={256}>
            <Lightformer intensity={2.5} color="white" position={[0, 6, -8]} scale={[12, 6, 1]} />
            <Lightformer intensity={1.2} color="white" position={[-6, 1, -1]} scale={[3, 0.5, 1]} />
            <Lightformer intensity={1.2} color="white" position={[6, 1, -1]} scale={[3, 0.5, 1]} />
          </Environment>
          <ErrorBoundary fallback={<ModelErrorFallback />}>
            <CarModel />
          </ErrorBoundary>
          <ContactShadows
            position={[0, -1.15, 0]}
            opacity={0.95}
            scale={32}
            blur={0.7}
            far={10}
            resolution={512}
            color="#222"
          />
          <mesh position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <circleGeometry args={[8, 64]} />
            <meshStandardMaterial color="#e5e7eb" roughness={0.8} metalness={0.1} transparent opacity={0.7} />
          </mesh>
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minPolarAngle={0.2}
            maxPolarAngle={Math.PI / 2.1}
            dampingFactor={0.05}
            enableDamping={true}
            panSpeed={1.0}
            rotateSpeed={1.0}
            zoomSpeed={1.0}
            {...orbitProps}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default function CarShowcase() {
  return (
    <>
      <ModelPreloader />
      <ShowcaseUIProvider>
        <CarProvider>
          <CarShowcaseInner />
        </CarProvider>
      </ShowcaseUIProvider>
    </>
  )
}
