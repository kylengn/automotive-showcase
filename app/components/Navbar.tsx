"use client"

import { useState } from "react"
import { Menu, X, Zap } from "lucide-react"
import { motion } from "framer-motion"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { name: "Models", href: "#models" },
    { name: "Configurator", href: "#configurator" },
    { name: "Experience", href: "#experience" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <nav className="font-orbitron absolute top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm" role="navigation" aria-label="Main navigation">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <a href="/" className="flex items-center space-x-2" aria-label="VELOCITY Automotive - Home">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 p-2 rounded-[8px]">
                <Zap className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <span className="font-orbitron font-bold text-2xl text-slate-800 tracking-wider">VELOCITY</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-8" role="list">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-slate-600 hover:text-slate-800 px-3 py-2 text-sm font-medium transition-colors duration-300 hover:bg-slate-100 rounded-lg"
                  role="listitem"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden xl:block">
            <button
              className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-6 py-2 rounded-[8px] font-semibold transition-all duration-300 shadow-lg"
              aria-label="Book a test drive"
            >
              Book Test Drive
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-600 hover:text-slate-800 p-2 rounded-lg hover:bg-slate-100 transition-colors duration-300"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div
          id="mobile-menu"
          className="lg:hidden"
          initial={false}
          animate={isMenuOpen ? "open" : "closed"}
          variants={{
            open: { opacity: 1, height: "auto" },
            closed: { opacity: 0, height: 0 }
          }}
          transition={{ duration: 0.3 }}
          style={{ overflow: "hidden" }}
        >
          <div className="bg-white/95 backdrop-blur-md border-t border-slate-200/50 shadow-lg" role="menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-slate-600 hover:text-slate-800 block px-3 py-2 text-base font-medium transition-colors duration-300 hover:bg-slate-100 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                  role="menuitem"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 pb-2">
                <button
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-6 py-3 rounded-[8px] font-semibold transition-all duration-300 shadow-lg"
                  aria-label="Book a test drive"
                >
                  Book Test Drive
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  )
}
