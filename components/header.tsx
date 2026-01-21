"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2">
          <a
            href="/"
            className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-bold leading-tight whitespace-nowrap flex-shrink-0"
          >
            <span className="text-orange-600">Southwest</span>
            <span className="text-blue-600">MN</span> Hacks
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <a href="/#about" className="text-gray-700 hover:text-gray-900">
              About
            </a>
            <a href="/#tracks" className="text-gray-700 hover:text-gray-900">
              Tracks
            </a>
            <a href="/#schedule" className="text-gray-700 hover:text-gray-900">
              Schedule
            </a>
            <a href="/resources" className="text-gray-700 hover:text-gray-900">
              Resources
            </a>
            <a href="/#faq" className="text-gray-700 hover:text-gray-900">
              FAQ
            </a>
            <a href="/rules" className="text-gray-700 hover:text-gray-900">
              Rules
            </a>
            <a
              href="/sponsor"
              onClick={() => window.plausible?.('Sponsor Click', { props: { location: 'header-desktop' } })}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all font-semibold"
            >
              Sponsor
            </a>
            <a
              href="/register"
              onClick={() => window.plausible?.('Register Click', { props: { location: 'header-desktop' } })}
              className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all font-semibold"
            >
              Register Free
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-gray-900 flex-shrink-0"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-3 border-t border-gray-200 pt-4">
            <a
              href="/#about"
              className="block text-gray-700 hover:text-gray-900 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
            <a
              href="/#tracks"
              className="block text-gray-700 hover:text-gray-900 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tracks
            </a>
            <a
              href="/#schedule"
              className="block text-gray-700 hover:text-gray-900 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Schedule
            </a>
            <a
              href="/resources"
              className="block text-gray-700 hover:text-gray-900 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Resources
            </a>
            <a
              href="/#faq"
              className="block text-gray-700 hover:text-gray-900 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <a
              href="/rules"
              className="block text-gray-700 hover:text-gray-900 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Rules
            </a>
            <a
              href="/sponsor"
              onClick={() => window.plausible?.('Sponsor Click', { props: { location: 'header-mobile' } })}
              className="block bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all font-semibold text-center"
            >
              Sponsor
            </a>
            <a
              href="/register"
              onClick={() => window.plausible?.('Register Click', { props: { location: 'header-mobile' } })}
              className="block bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all font-semibold text-center"
            >
              Register Free
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
