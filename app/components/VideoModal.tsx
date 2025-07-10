"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Play } from "lucide-react"

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoId: string
  title?: string
}

export default function VideoModal({ isOpen, onClose, videoId, title = "Watch Film" }: VideoModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[90vw] h-[80vh] p-0 bg-black">
        <DialogHeader className="p-4 pb-0 !h-fit">
          <DialogTitle className="text-white font-orbitron text-xl">{title}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center w-full h-full p-4 pt-0">
          <div className="w-full max-w-3xl aspect-video bg-black rounded-lg overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              title={title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Hook for managing video modal state
export function useVideoModal() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  const openVideoModal = () => setIsVideoModalOpen(true)
  const closeVideoModal = () => setIsVideoModalOpen(false)

  return {
    isVideoModalOpen,
    openVideoModal,
    closeVideoModal,
  }
} 