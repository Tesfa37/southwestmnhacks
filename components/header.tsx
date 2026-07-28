"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { track } from "@vercel/analytics"
import { RegisterCta } from "@/components/register-cta"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/"
              className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-bold leading-tight whitespace-nowrap"
            >
              <span className="text-orange-600">Southwest</span>{" "}
              <span className="text-blue-600">MN</span> Hacks
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/resources" className="text-gray-700 hover:text-gray-900">
              Resources
            </Link>
            <Link href="/#faq" className="text-gray-700 hover:text-gray-900">
              FAQ
            </Link>
            <Link href="/rules" className="text-gray-700 hover:text-gray-900">
              Rules
            </Link>
            <Link href="/safety" className="text-gray-700 hover:text-gray-900">
              Safety
            </Link>
            <Link href="/recap" className="text-gray-700 hover:text-gray-900">
              Past Events
            </Link>
            <Link
              href="/sponsor"
              onClick={() => track('Sponsor Click', { location: 'header-desktop' })}
              className="text-gray-700 hover:text-gray-900"
            >
              Sponsor
            </Link>
            <RegisterCta variant="header-desktop" location="header-desktop" />
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-gray-900 flex-shrink-0"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div id="mobile-nav" className="lg:hidden mt-4 pb-4 space-y-3 border-t border-gray-200 pt-4">
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
              href="/safety"
              className="block text-gray-700 hover:text-gray-900 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Safety
            </Link>
            <Link
              href="/recap"
              className="block text-gray-700 hover:text-gray-900 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Past Events
            </Link>
            <Link
              href="/sponsor"
              onClick={() => { track('Sponsor Click', { location: 'header-mobile' }); setMobileMenuOpen(false) }}
              className="block text-gray-700 hover:text-gray-900 py-2"
            >
              Sponsor
            </Link>
            <RegisterCta
              variant="header-mobile"
              location="header-mobile"
              onNavigate={() => setMobileMenuOpen(false)}
            />
          </div>
        )}
      </div>
    </nav>
  )
}
