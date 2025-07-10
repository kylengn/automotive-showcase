"use client"

import { useEffect, useState } from "react"
import { useGLTF } from "@react-three/drei"

// Preload the car model and textures
const CAR_MODEL_URL = "/car/scene.gltf"

export default function ModelPreloader() {
  const [isPreloaded, setIsPreloaded] = useState(false)

  useEffect(() => {
    // Start preloading immediately
    const preloadModel = async () => {
      try {
        // Preload the GLTF model
        await useGLTF.preload(CAR_MODEL_URL, true)

        // Preload critical textures
        const textureLoader = new Image()
        const textures = [
          "/car/textures/carpaint_base_baseColor.png",
          "/car/textures/brakedisk_metallicRoughness.png"
        ]

        await Promise.all(
          textures.map(url => {
            return new Promise((resolve, reject) => {
              const img = new Image()
              img.onload = resolve
              img.onerror = reject
              img.src = url
            })
          })
        )

        setIsPreloaded(true)
      } catch (error) {
        console.warn("Preloading failed, will load on demand:", error)
        setIsPreloaded(true) // Continue anyway
      }
    }

    preloadModel()
  }, [])

  // This component doesn't render anything visible
  return null
}

// Export the preload function for manual use
export const preloadCarModel = () => {
  useGLTF.preload(CAR_MODEL_URL, true)
} 