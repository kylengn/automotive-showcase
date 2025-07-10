"use client"

import { useRef, useEffect, useMemo, useCallback } from "react"
import { useGLTF } from "@react-three/drei"
import { type Group, Mesh, MeshStandardMaterial, Object3D } from "three"
import { useCarContext } from "../context/CarContext"

// Use the local car model
const CAR_MODEL_URL = "/car/scene.gltf"

export default function CarModel() {
  const groupRef = useRef<Group>(null)
  const { scene } = useGLTF(CAR_MODEL_URL)
  const { selectedColor, selectedMaterial } = useCarContext()

  // Memoize material properties to reduce calculations
  const materialProps = useMemo(() => {
    switch (selectedMaterial) {
      case "metallic":
        return { metalness: 0.9, roughness: 0.1 }
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

  // Update materials when dependencies change
  useEffect(() => {
    updateMaterials()
  }, [updateMaterials])

  return (
    <group ref={groupRef} position={[0, -1.0, 0]} scale={[1.2, 1.2, 1.2]}>
      <primitive object={scene} />
    </group>
  )
}

// Preload the model
useGLTF.preload(CAR_MODEL_URL)
