"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { track } from "@vercel/analytics"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2">
          <Link
            href="/"
            className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-bold leading-tight whitespace-nowrap flex-shrink-0"
          >
            <span className="text-orange-600">Southwest</span>
            <span className="text-blue-600">MN</span> Hacks
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/#recap" className="text-gray-700 hover:text-gray-900">
              Recap
            </Link>
            <Link href="/#winners" className="text-gray-700 hover:text-gray-900">
              Winners
            </Link>
            <Link href="/#schedule" className="text-gray-700 hover:text-gray-900">
              Schedule
            </Link>
            <Link href="/resources" className="text-gray-700 hover:text-gray-900">
              Resources
            </Link>
            <Link href="/#faq" className="text-gray-700 hover:text-gray-900">
              FAQ
            </Link>
            <Link href="/rules" className="text-gray-700 hover:text-gray-900">
              Rules
            </Link>
            <Link
              href="/sponsor"
              onClick={() => track('Sponsor Click', { location: 'header-desktop' })}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all font-semibold"
            >
              Sponsor
            </Link>
            <a
              href="https://southwestmn-hacks.devpost.com/project-gallery"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all font-semibold"
            >
              View Projects
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
            <Link
              href="/#recap"
              className="block text-gray-700 hover:text-gray-900 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Recap
            </Link>
            <Link
              href="/#winners"
              className="block text-gray-700 hover:text-gray-900 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Winners
            </Link>
            <Link
              href="/#schedule"
              className="block text-gray-700 hover:text-gray-900 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Schedule
            </Link>
            <Link
              href="/resources"
              className="block text-gray-700 hover:text-gray-900 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Resources
            </Link>
            <Link
              href="/#faq"
              className="block text-gray-700 hover:text-gray-900 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link
              href="/rules"
              className="block text-gray-700 hover:text-gray-900 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Rules
            </Link>
            <Link
              href="/sponsor"
              onClick={() => { track('Sponsor Click', { location: 'header-mobile' }); setMobileMenuOpen(false) }}
              className="block bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all font-semibold text-center"
            >
              Sponsor
            </Link>
            <a
              href="https://southwestmn-hacks.devpost.com/project-gallery"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="block bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all font-semibold text-center"
            >
              View Projects
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
