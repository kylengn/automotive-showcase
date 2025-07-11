"use client"

import { useState } from "react"
import { useCarContext } from "../context/CarContext"
import { Palette, Sparkles, Settings } from "lucide-react"

const colors = [
  { name: "Arctic White", value: 0xffffff, gradient: "from-white to-gray" },
  { name: "Gilver", value: 0xcfc7b0, gradient: "from-gilver to-gilver" },
  { name: "Racing Red", value: 0xdc2626, gradient: "from-red-600 to-red-800" },
  { name: "Satin Teal", value: 0x1ecbe1, gradient: "from-cyan-400 to-teal-600" },
  { name: "Titanium Silver", value: 0x94a3b8, gradient: "from-slate-400 to-slate-600" },
  { name: "Emerald Green", value: 0x059669, gradient: "from-emerald-600 to-emerald-800" },
]

const materials = [
  { name: "Glossy", value: "glossy", description: "High-gloss finish with deep reflections" },
  { name: "Metallic", value: "metallic", description: "Premium metallic with sparkle effect" },
  { name: "Matte", value: "matte", description: "Sophisticated matte finish" },
]

const interiorOptions = [
  { name: "Carbon Fiber", color: "#1a1a1a" },
  { name: "Alcantara", color: "#2d2d2d" },
  { name: "Leather", color: "#8b4513" },
]

export default function CarConfigurator() {
  const { selectedColor, selectedMaterial, setSelectedColor, setSelectedMaterial } = useCarContext()
  const [activeSection, setActiveSection] = useState<string>("exterior")
  const [selectedInterior, setSelectedInterior] = useState("Carbon Fiber")

  const sections = [
    { id: "exterior", name: "Exterior", icon: Palette },
    { id: "interior", name: "Interior", icon: Settings },
    { id: "performance", name: "Performance", icon: Sparkles },
  ]

  return (
    <div className="h-full bg-white/50 backdrop-blur-sm border-l border-slate-200/50 overflow-y-auto shadow-lg">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-slate-200/50">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
          <h2 className="font-orbitron font-bold text-xl sm:text-2xl text-slate-800">CONFIGURATOR</h2>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm">Craft your perfect machine</p>
      </div>

      {/* Section Tabs */}
      <div className="flex border-b border-slate-200/50">
        {sections.map((section) => {
          const Icon = section.icon
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex-1 flex items-center justify-center space-x-1 sm:space-x-2 py-3 sm:py-4 transition-all duration-300 ${activeSection === section.id
                ? "bg-gradient-to-r from-red-500/10 to-orange-500/10 border-b-2 border-red-500 text-slate-800"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                }`}
            >
              <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm font-medium">{section.name}</span>
            </button>
          )
        })}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {activeSection === "exterior" && (
          <div className="space-y-6 sm:space-y-8">
            {/* Color Selection */}
            <div>
              <h3 className="font-orbitron font-semibold text-base sm:text-lg text-slate-800 mb-3 sm:mb-4 flex items-center space-x-2">
                <Palette className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                <span>Paint Color</span>
              </h3>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.value)}
                    className={`relative group p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 ${selectedColor === color.value
                      ? "border-red-500 bg-red-50 shadow-md"
                      : "border-slate-200 hover:border-slate-300 bg-white hover:shadow-sm"
                      }`}
                  >
                    <div className={`w-full h-8 sm:h-12 rounded-lg bg-gradient-to-br ${color.gradient} mb-2 sm:mb-3 shadow-lg`} />
                    <div className="text-slate-700 text-xs sm:text-sm font-medium">{color.name}</div>
                    {selectedColor === color.value && (
                      <div className="absolute top-1 right-1 sm:top-2 sm:right-2 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Material Selection */}
            <div>
              <h3 className="font-orbitron font-semibold text-base sm:text-lg text-slate-800 mb-3 sm:mb-4 flex items-center space-x-2">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                <span>Finish Type</span>
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {materials.map((material) => (
                  <button
                    key={material.name}
                    onClick={() => setSelectedMaterial(material.value)}
                    className={`w-full p-3 sm:p-4 rounded-xl text-left transition-all duration-300 border-2 ${selectedMaterial === material.value
                      ? "border-orange-500 bg-orange-50 text-slate-800 shadow-md"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-800 hover:shadow-sm"
                      }`}
                  >
                    <div className="font-semibold mb-1 text-sm sm:text-base">{material.name}</div>
                    <div className="text-xs sm:text-sm opacity-80">{material.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === "interior" && (
          <div className="space-y-4 sm:space-y-6">
            <h3 className="font-orbitron font-semibold text-base sm:text-lg text-slate-800 mb-3 sm:mb-4">Interior Materials</h3>
            <div className="space-y-2 sm:space-y-3">
              {interiorOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={() => setSelectedInterior(option.name)}
                  className={`w-full p-3 sm:p-4 rounded-xl text-left transition-all duration-300 border-2 flex items-center space-x-3 sm:space-x-4 ${selectedInterior === option.name
                    ? "border-blue-500 bg-blue-50 text-slate-800 shadow-md"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-800 hover:shadow-sm"
                    }`}
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg" style={{ backgroundColor: option.color }} />
                  <span className="font-medium text-sm sm:text-base">{option.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeSection === "performance" && (
          <div className="space-y-4 sm:space-y-6">
            <h3 className="font-orbitron font-semibold text-base sm:text-lg text-slate-800 mb-3 sm:mb-4">Performance Specs</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-slate-50 rounded-xl p-3 sm:p-4 border border-slate-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-600 text-xs sm:text-sm">Engine</span>
                  <span className="text-slate-800 font-semibold text-xs sm:text-sm">V12 Twin Turbo</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-600 text-xs sm:text-sm">Power</span>
                  <span className="text-slate-800 font-semibold text-xs sm:text-sm">850 HP</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-600 text-xs sm:text-sm">Torque</span>
                  <span className="text-slate-800 font-semibold text-xs sm:text-sm">900 Nm</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 text-xs sm:text-sm">Weight</span>
                  <span className="text-slate-800 font-semibold text-xs sm:text-sm">1,420 kg</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2 sm:space-y-3 pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-slate-200/50">
          <button className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-3 sm:py-4 rounded-xl font-orbitron font-semibold transition-all duration-300  shadow-lg text-sm sm:text-base">
            REQUEST QUOTE
          </button>
          <button className="w-full bg-transparent border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 py-3 sm:py-4 rounded-xl font-orbitron font-semibold transition-all duration-300 text-sm sm:text-base">
            SCHEDULE TEST DRIVE
          </button>
        </div>
      </div>
    </div>
  )
}
