"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface CarContextType {
  selectedColor: number
  selectedMaterial: string
  setSelectedColor: (color: number) => void
  setSelectedMaterial: (material: string) => void
}

const CarContext = createContext<CarContextType | undefined>(undefined)

export function CarProvider({ children }: { children: ReactNode }) {
  const [selectedColor, setSelectedColor] = useState<number>(0xdc2626)
  const [selectedMaterial, setSelectedMaterial] = useState<string>("glossy")

  return (
    <CarContext.Provider
      value={{
        selectedColor,
        selectedMaterial,
        setSelectedColor,
        setSelectedMaterial,
      }}
    >
      {children}
    </CarContext.Provider>
  )
}

export function useCarContext() {
  const context = useContext(CarContext)
  if (context === undefined) {
    throw new Error("useCarContext must be used within a CarProvider")
  }
  return context
}
