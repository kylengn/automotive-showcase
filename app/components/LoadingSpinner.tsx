"use client"

import { Html } from "@react-three/drei"
import { LoaderCircle } from "lucide-react"

export default function LoadingSpinner() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-red-600 font-orbitron">
        <LoaderCircle className="w-10 h-10 animate-spin" />
        <p className="text-sm">Loading 3D Model...</p>
      </div>
    </Html>
  )
}
