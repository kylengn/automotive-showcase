"use client"

import { ArrowRight, Play, Zap, Award, Shield } from "lucide-react"
import { useShowcaseUI } from "../context/ShowcaseUIContext"
import VideoModal, { useVideoModal } from "./VideoModal"

export default function HeroSection({ hidden = false }: { hidden?: boolean }) {
  const { openConfigurator } = useShowcaseUI()
  const { isVideoModalOpen, openVideoModal, closeVideoModal } = useVideoModal()

  // Extract video ID from YouTube URL
  const videoId = "Fm-kAoagXfM"
  if (hidden) return null
  return (
    <section className="relative h-full" role="banner" aria-labelledby="hero-heading">
      {/* Mobile-only background overlay for readability */}
      <div className="block lg:hidden absolute inset-0 bg-white/50 backdrop-blur-sm rounded-xl z-0" />
      <div className="relative z-10 mt-4 lg:mt-16 px-4 sm:px-6 md:px-8 lg:px-12 max-w-2xl mx-auto lg:mx-0">
        {/* Premium Badge */}
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6" role="status" aria-label="Luxury collection badge">
          <Award className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" aria-hidden="true" />
          <span className="text-red-600 text-xs sm:text-sm font-medium">LUXURY COLLECTION 2026</span>
        </div>

        {/* Main Heading */}
        <h1 id="hero-heading" className="font-orbitron font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-slate-800 mb-4 sm:mb-6 leading-tight tracking-tight">
          UNLEASH
          <br />
          <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
            VELOCITY
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 mb-3 sm:mb-4 leading-relaxed font-light">
          Where engineering excellence meets artistic perfection
        </p>

        {/* Description */}
        <p className="text-slate-500 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed max-w-lg">
          Experience the pinnacle of automotive innovation. Every curve sculpted by wind, every detail crafted for those
          who demand nothing less than extraordinary.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8" role="list" aria-label="Vehicle specifications">
          <div className="flex items-center space-x-1.5 sm:space-x-2 bg-slate-100/80 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-slate-200/50" role="listitem">
            <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" aria-hidden="true" />
            <span className="text-slate-700 text-xs sm:text-sm font-medium">0-60 in 2.8s</span>
          </div>
          <div className="flex items-center space-x-1.5 sm:space-x-2 bg-slate-100/80 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-slate-200/50" role="listitem">
            <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" aria-hidden="true" />
            <span className="text-slate-700 text-xs sm:text-sm font-medium">Carbon Fiber Body</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-3 sm:gap-4 w-full" role="group" aria-label="Call to action buttons">
          <button
            className="group bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-orbitron font-semibold transition-all duration-300  hover:shadow-2xl hover:shadow-red-500/25 flex items-center justify-center space-x-2 text-sm sm:text-base"
            onClick={openConfigurator}
            aria-label="Open car configurator to customize your vehicle"
          >
            <span className="hidden lg:block">CONFIGURE NOW</span>
            <span className="block lg:hidden">CONFIGURE</span>
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </button>

          <button
            className="group border-2 border-red-600 hover:border-orange-600 text-slate-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-orbitron font-semibold transition-all duration-300 hover:bg-slate-50 backdrop-blur-sm flex items-center justify-center space-x-2 text-sm sm:text-base"
            onClick={openVideoModal}
            aria-label="Watch luxury automotive showcase video"
          >
            <Play className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" aria-hidden="true" />
            <span className="hidden lg:block bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">WATCH FILM</span>
            <span className="block lg:hidden bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">WATCH</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-200/50" role="list" aria-label="Vehicle performance statistics">
          <div role="listitem">
            <div className="font-orbitron font-bold text-xl sm:text-2xl text-slate-800">850</div>
            <div className="text-slate-500 text-xs sm:text-sm">HORSEPOWER</div>
          </div>
          <div role="listitem">
            <div className="font-orbitron font-bold text-xl sm:text-2xl text-slate-800">217</div>
            <div className="text-slate-500 text-xs sm:text-sm">TOP SPEED MPH</div>
          </div>
          <div role="listitem">
            <div className="font-orbitron font-bold text-xl sm:text-2xl text-slate-800">2.8</div>
            <div className="text-slate-500 text-xs sm:text-sm">0-60 SECONDS</div>
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
    </section>
  )
}
