"use client"

import { useState, useEffect, useCallback } from "react"
import { useGLTF } from "@react-three/drei"

const CAR_MODEL_URL = "/car/scene.gltf"

export function useModelLoading() {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const startLoading = useCallback(async () => {
    try {
      setLoadingProgress(10)

      // Preload the model with high priority
      await useGLTF.preload(CAR_MODEL_URL, true)
      setLoadingProgress(50)

      // Preload critical textures
      const textures = [
        "/car/textures/carpaint_base_baseColor.png",
        "/car/textures/brakedisk_metallicRoughness.png"
      ]

      await Promise.all(
        textures.map((url, index) => {
          return new Promise<void>((resolve) => {
            const img = new Image()
            img.onload = () => {
              setLoadingProgress(50 + ((index + 1) / textures.length) * 40)
              resolve()
            }
            img.onerror = () => resolve() // Continue even if texture fails
            img.src = url
          })
        })
      )

      setLoadingProgress(100)
      setIsLoaded(true)
    } catch (err) {
      console.warn("Model preloading failed:", err)
      setError(err instanceof Error ? err.message : "Failed to load model")
      setIsLoaded(true) // Continue anyway, will load on demand
    }
  }, [])

  useEffect(() => {
    startLoading()
  }, [startLoading])

  return {
    loadingProgress,
    isLoaded,
    error,
    startLoading
  }
} 