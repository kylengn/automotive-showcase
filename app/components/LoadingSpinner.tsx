"use client"

import { Html } from "@react-three/drei"
import { Zap } from "lucide-react"
import { motion } from "framer-motion"
import { useModelLoading } from "../hooks/useModelLoading"

// Constants
const ANIMATION_DELAYS = {
  ICON: 0.2,
  TITLE: 0.3,
  PROGRESS_TEXT: 0.4,
  PROGRESS_BAR: 0.6,
  STATUS_TEXT: 0.8,
} as const

const PROGRESS_THRESHOLDS = {
  MODEL_LOADING: 50,
  TEXTURE_OPTIMIZATION: 90,
} as const

const STATUS_MESSAGES = {
  LOADING_MODEL: "Loading model...",
  OPTIMIZING_TEXTURES: "Optimizing textures...",
  PREPARING_LAUNCH: "Preparing for launch...",
} as const

// Types
interface LoadingStatusProps {
  progress: number
}

// Helper functions
const getStatusMessage = (progress: number): string => {
  if (progress < PROGRESS_THRESHOLDS.MODEL_LOADING) {
    return STATUS_MESSAGES.LOADING_MODEL
  }
  if (progress < PROGRESS_THRESHOLDS.TEXTURE_OPTIMIZATION) {
    return STATUS_MESSAGES.OPTIMIZING_TEXTURES
  }
  return STATUS_MESSAGES.PREPARING_LAUNCH
}

// Sub-components
const LoadingIcon = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: ANIMATION_DELAYS.ICON }}
  >
    <Zap className="w-12 h-12 text-red-500 mb-4 animate-pulse" />
  </motion.div>
)

const LoadingTitle = () => (
  <motion.div
    className="text-lg font-bold mb-2"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: ANIMATION_DELAYS.TITLE }}
  >
    LOADING VELOCITY
  </motion.div>
)

const ProgressText = ({ progress }: { progress: number }) => (
  <motion.div
    className="text-sm text-slate-600 mb-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: ANIMATION_DELAYS.PROGRESS_TEXT }}
  >
    Optimizing 3D Model... {Math.round(progress)}%
  </motion.div>
)

const ProgressBar = ({ progress }: { progress: number }) => (
  <motion.div
    className="w-48 h-2 bg-slate-200 rounded-full overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: ANIMATION_DELAYS.PROGRESS_BAR }}
  >
    <motion.div
      className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
      initial={{ width: "0%" }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    />
  </motion.div>
)

const StatusText = ({ progress }: { progress: number }) => (
  <motion.div
    className="text-xs text-slate-500 mt-2"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: ANIMATION_DELAYS.STATUS_TEXT }}
  >
    {getStatusMessage(progress)}
  </motion.div>
)

// Main component
export default function LoadingSpinner() {
  const { loadingProgress } = useModelLoading()

  return (
    <Html center>
      <motion.div
        className="flex flex-col items-center justify-center text-red-600 font-orbitron bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-red-200/50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <LoadingIcon />
        <LoadingTitle />
        <ProgressText progress={loadingProgress} />
        <ProgressBar progress={loadingProgress} />
        <StatusText progress={loadingProgress} />
      </motion.div>
    </Html>
  )
}
