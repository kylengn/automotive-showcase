"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Box, Cylinder } from "@react-three/drei"
import { Group } from "three"
import { useCarContext } from "../context/CarContext"

export default function CarModelFallback() {
  const groupRef = useRef<Group>(null)
  const { selectedColor, selectedMaterial } = useCarContext()

  // Optimized rotation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.2
    }
  })

  // Memoize material properties
  const materialProps = useMemo(() => ({
    color: `#${selectedColor.toString(16).padStart(6, "0")}`,
    metalness: selectedMaterial === "metallic" ? 0.9 : selectedMaterial === "matte" ? 0.1 : 0.3,
    roughness: selectedMaterial === "matte" ? 0.9 : selectedMaterial === "metallic" ? 0.1 : 0.2,
  }), [selectedColor, selectedMaterial])

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Simple car-like shape as fallback */}
      {/* Main body */}
      <Box args={[4, 0.8, 1.8]} position={[0, 0, 0]}>
        <meshStandardMaterial {...materialProps} />
      </Box>

      {/* Cabin */}
      <Box args={[2.5, 1, 1.6]} position={[0, 0.9, 0]}>
        <meshStandardMaterial {...materialProps} />
      </Box>

      {/* Wheels */}
      <Cylinder args={[0.4, 0.4, 0.3]} position={[1.3, -0.6, 0.8]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#333" />
      </Cylinder>
      <Cylinder args={[0.4, 0.4, 0.3]} position={[-1.3, -0.6, 0.8]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#333" />
      </Cylinder>
      <Cylinder args={[0.4, 0.4, 0.3]} position={[1.3, -0.6, -0.8]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#333" />
      </Cylinder>
      <Cylinder args={[0.4, 0.4, 0.3]} position={[-1.3, -0.6, -0.8]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#333" />
      </Cylinder>
    </group>
  )
}
