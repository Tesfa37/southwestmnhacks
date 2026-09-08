"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { track } from "@vercel/analytics"
import { WaitlistCta } from "@/components/waitlist-cta"
import type { EventPhase } from "@/lib/event-phase"

// Light is the default everywhere; the homepage's cinematic stage passes "dark".
const HEADER_CLASSES = {
  light: {
    nav: "bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50",
    link: "text-gray-700 hover:text-gray-900",
    mobileLink: "block text-gray-700 hover:text-gray-900 py-2",
    logoOrange: "text-orange-600",
    logoBlue: "text-blue-600",
    menuButton: "lg:hidden p-2 text-gray-700 hover:text-gray-900 flex-shrink-0",
    mobileDivider: "lg:hidden mt-4 pb-4 space-y-3 border-t border-gray-200 pt-4",
  },
  dark: {
    nav: "bg-[#0a0a12]/80 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50",
    link: "text-white/80 hover:text-white",
    mobileLink: "block text-white/80 hover:text-white py-2",
    logoOrange: "text-orange-400",
    logoBlue: "text-blue-400",
    menuButton: "lg:hidden p-2 text-white/80 hover:text-white flex-shrink-0",
    mobileDivider: "lg:hidden mt-4 pb-4 space-y-3 border-t border-white/10 pt-4",
  },
} as const

export function HeaderClient({
  variant = "light",
  initialPhase,
}: {
  variant?: "light" | "dark"
  initialPhase: EventPhase
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const c = HEADER_CLASSES[variant]

  return (
    <nav className={c.nav}>
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/"
              className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-bold leading-tight whitespace-nowrap"
            >
              <span className={c.logoOrange}>Southwest</span>{" "}
              <span className={c.logoBlue}>MN</span> Hacks
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/resources" className={c.link}>
              Resources
            </Link>
            <Link href="/#faq" className={c.link}>
              FAQ
            </Link>
            <Link href="/rules" className={c.link}>
              Rules
            </Link>
            <Link href="/safety" className={c.link}>
              Safety
            </Link>
            <Link href="/recap" className={c.link}>
              Past Events
            </Link>
            <Link
              href="/sponsor"
              onClick={() => track('Sponsor Click', { location: 'header-desktop' })}
              className={c.link}
            >
              Sponsor
            </Link>
            <WaitlistCta variant="header-desktop" location="header-desktop" initialPhase={initialPhase} />
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={c.menuButton}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div id="mobile-nav" className={c.mobileDivider}>
            <Link
              href="/resources"
              className={c.mobileLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Resources
            </Link>
            <Link
              href="/#faq"
              className={c.mobileLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link
              href="/rules"
              className={c.mobileLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Rules
            </Link>
            <Link
              href="/safety"
              className={c.mobileLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Safety
            </Link>
            <Link
              href="/recap"
              className={c.mobileLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Past Events
            </Link>
            <Link
              href="/sponsor"
              onClick={() => { track('Sponsor Click', { location: 'header-mobile' }); setMobileMenuOpen(false) }}
              className={c.mobileLink}
            >
              Sponsor
            </Link>
            <WaitlistCta
              variant="header-mobile"
              location="header-mobile"
              initialPhase={initialPhase}
              onNavigate={() => setMobileMenuOpen(false)}
            />
          </div>
        )}
      </div>
    </nav>
  )
}
