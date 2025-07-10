"use client"

import { createContext, useContext, useState, useCallback } from "react"
import type { ReactNode } from "react"

interface ShowcaseUIContextType {
  isConfiguratorOpen: boolean
  openConfigurator: () => void
  closeConfigurator: () => void
  toggleConfigurator: () => void
}

const ShowcaseUIContext = createContext<ShowcaseUIContextType | undefined>(undefined)

export function ShowcaseUIProvider({ children }: { children: ReactNode }) {
  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false)

  const openConfigurator = useCallback(() => setIsConfiguratorOpen(true), [])
  const closeConfigurator = useCallback(() => setIsConfiguratorOpen(false), [])
  const toggleConfigurator = useCallback(() => setIsConfiguratorOpen((v) => !v), [])

  return (
    <ShowcaseUIContext.Provider value={{ isConfiguratorOpen, openConfigurator, closeConfigurator, toggleConfigurator }}>
      {children}
    </ShowcaseUIContext.Provider>
  )
}

export function useShowcaseUI() {
  const ctx = useContext(ShowcaseUIContext)
  if (!ctx) throw new Error("useShowcaseUI must be used within ShowcaseUIProvider")
  return ctx
} 