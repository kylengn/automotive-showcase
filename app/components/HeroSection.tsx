"use client"

import { ArrowRight, Play, Zap, Award, Shield } from "lucide-react"
import { useShowcaseUI } from "../context/ShowcaseUIContext"
import VideoModal, { useVideoModal } from "./VideoModal"

export default function HeroSection() {
  const { openConfigurator } = useShowcaseUI()
  const { isVideoModalOpen, openVideoModal, closeVideoModal } = useVideoModal()

  // Extract video ID from YouTube URL
  const videoId = "Fm-kAoagXfM"
  return (
    <div className="px-8 lg:px-12 max-w-2xl">
      {/* Premium Badge */}
      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-full px-4 py-2 mb-6">
        <Award className="h-4 w-4 text-red-500" />
        <span className="text-red-600 text-sm font-medium">LUXURY COLLECTION 2026</span>
      </div>

      {/* Main Heading */}
      <h1 className="font-orbitron font-black text-6xl lg:text-7xl text-slate-800 mb-6 leading-tight tracking-tight">
        UNLEASH
        <br />
        <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
          VELOCITY
        </span>
      </h1>

      {/* Subheading */}
      <p className="text-xl lg:text-2xl text-slate-600 mb-4 leading-relaxed font-light">
        Where engineering excellence meets artistic perfection
      </p>

      {/* Description */}
      <p className="text-slate-500 text-lg mb-8 leading-relaxed max-w-lg">
        Experience the pinnacle of automotive innovation. Every curve sculpted by wind, every detail crafted for those
        who demand nothing less than extraordinary.
      </p>

      {/* Feature Pills */}
      <div className="flex flex-wrap gap-3 mb-8">
        <div className="flex items-center space-x-2 bg-slate-100/80 backdrop-blur-sm rounded-full px-4 py-2 border border-slate-200/50">
          <Zap className="h-4 w-4 text-yellow-500" />
          <span className="text-slate-700 text-sm font-medium">0-60 in 2.8s</span>
        </div>
        <div className="flex items-center space-x-2 bg-slate-100/80 backdrop-blur-sm rounded-full px-4 py-2 border border-slate-200/50">
          <Shield className="h-4 w-4 text-blue-500" />
          <span className="text-slate-700 text-sm font-medium">Carbon Fiber Body</span>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          className="group bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-orbitron font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 flex items-center justify-center space-x-2"
          onClick={openConfigurator}
        >
          <span>CONFIGURE NOW</span>
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          className="group border-2 border-slate-300 hover:border-slate-400 text-slate-700 px-8 py-4 rounded-xl font-orbitron font-semibold transition-all duration-300 hover:bg-slate-50 backdrop-blur-sm flex items-center justify-center space-x-2"
          onClick={openVideoModal}
        >
          <Play className="h-5 w-5 text-orange-600" />
          <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">WATCH FILM</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-slate-200/50">
        <div>
          <div className="font-orbitron font-bold text-2xl text-slate-800">850</div>
          <div className="text-slate-500 text-sm">HORSEPOWER</div>
        </div>
        <div>
          <div className="font-orbitron font-bold text-2xl text-slate-800">217</div>
          <div className="text-slate-500 text-sm">TOP SPEED MPH</div>
        </div>
        <div>
          <div className="font-orbitron font-bold text-2xl text-slate-800">2.8</div>
          <div className="text-slate-500 text-sm">0-60 SECONDS</div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={closeVideoModal}
        videoId={videoId}
        title="Luxury Automotive Showcase"
      />
    </div>
  )
}
