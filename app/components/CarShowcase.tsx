"use client"

import { Suspense, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls, ContactShadows, Lightformer } from "@react-three/drei"
import CarModel from "./CarModel"
import CarModelFallback from "./CarModelFallback"
import CarConfigurator from "./CarConfigurator"
import LoadingSpinner from "./LoadingSpinner"
import Navbar from "./Navbar"
import HeroSection from "./HeroSection"
import { CarProvider } from "../context/CarContext"
import { ErrorBoundary } from "react-error-boundary"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, Settings } from "lucide-react"

function ModelErrorFallback() {
  return <CarModelFallback />
}

export default function CarShowcase() {
  const [configOpen, setConfigOpen] = useState(true)

  return (
    <CarProvider>
      <div className="relative w-full h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        {/* Navigation */}
        <Navbar />

        {/* 3D Canvas with Optimized Performance */}
        <Canvas
          camera={{ position: [5, 2.5, 6], fov: 40 }}
          shadows
          className="bg-transparent"
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: true
          }}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}
        >
          <Suspense fallback={<LoadingSpinner />}>
            {/* Optimized Lighting Setup - Better Color Accuracy */}
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
              minDistance={3}
              maxDistance={18}
              minPolarAngle={0.2}
              maxPolarAngle={Math.PI / 2.1}
              autoRotate={true}
              autoRotateSpeed={6}
              dampingFactor={0.05}
              enableDamping={true}
              panSpeed={1.0}
              rotateSpeed={1.0}
              zoomSpeed={1.0}
              target={[0, 0, 0]}
            />
          </Suspense>
        </Canvas>

        {/* UI Overlay - Fixed pointer events */}
        <div className="absolute inset-0 pointer-events-none pt-16 z-10">
          {/* Left Panel - Hero Section - Only takes up left portion */}
          <div className="absolute left-0 top-16 bottom-0 w-1/2 pointer-events-auto">
            <div className="h-full flex flex-col justify-center">
              <HeroSection />
            </div>
          </div>

          {/* Configurator Toggle Button */}
          <button
            className={`absolute top-24 right-0 z-30 bg-gradient-to-r from-red-500 to-orange-500 text-white p-3 rounded-l-xl shadow-lg flex items-center transition-all duration-300 pointer-events-auto ${configOpen ? "" : "ring-2 ring-orange-400"}`}
            onClick={() => setConfigOpen((v) => !v)}
            aria-label={configOpen ? "Close Configurator" : "Open Configurator"}
          >
            {configOpen ? <ChevronLeft className="w-5 h-5" /> : <Settings className="w-5 h-5" />}
          </button>

          {/* Right Panel - Configurator - Animated */}
          <AnimatePresence>
            {configOpen && (
              <motion.div
                key="configurator"
                initial={{ x: 400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 400, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute right-0 top-16 bottom-0 w-96 pointer-events-auto"
                style={{ zIndex: 20 }}
              >
                <CarConfigurator />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Center area - Allows 3D interaction */}
          <div className="absolute left-1/2 top-16 bottom-0 w-1/2 -ml-1/2 pointer-events-none">
            {/* This area allows 3D model interaction */}
          </div>
        </div>

        {/* Interactive Controls Instructions */}
        {/* <div className="absolute bottom-6 left-6 bg-white/80 backdrop-blur-lg rounded-xl p-6 text-slate-800 max-w-sm pointer-events-auto border border-slate-200/50 z-20 shadow-lg">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="font-orbitron font-semibold text-sm text-slate-800">INTERACTIVE CONTROLS</p>
          </div>
          <div className="space-y-2 text-xs text-slate-600">
            <p>
              🖱️ <span className="text-slate-800 font-medium">Left Click + Drag:</span> Rotate view
            </p>
            <p>
              🔍 <span className="text-slate-800 font-medium">Scroll:</span> Zoom in/out
            </p>
            <p>
              👆 <span className="text-slate-800 font-medium">Right Click + Drag:</span> Pan camera
            </p>
          </div>
        </div> */}
      </div>
    </CarProvider>
  )
}
