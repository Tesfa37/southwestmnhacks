"use client"

import { useSyncExternalStore } from "react"
import Link from "next/link"
import { track } from "@vercel/analytics"
import { MagneticButton } from "@/components/magnetic-button"
import { getEventPhase, type EventPhase } from "@/lib/event-phase"
import { REGISTRATION_FORM_URL, DEVPOST_FALL_URL } from "@/lib/config"

type Variant = "header-desktop" | "header-mobile" | "hero" | "section" | "footer-link"

interface RegisterCtaProps {
  variant: Variant
  location: string
  /** Server call sites pass their render-time phase so SSR HTML and hydration agree. */
  initialPhase?: EventPhase
  /** Renders the closed/live helper text in light-on-dark colors. Pills are unaffected. */
  onDark?: boolean
  /** header-mobile: close the menu on tap. */
  onNavigate?: () => void
}

const subscribeNever = () => () => {}

/**
 * Server render and hydration use initialPhase (so SSR HTML always matches);
 * after hydration the client re-evaluates against the real clock.
 */
export function useEventPhase(initialPhase: EventPhase = "open"): EventPhase {
  return useSyncExternalStore(subscribeNever, getEventPhase, () => initialPhase)
}

const PILL_CLASSES = {
  "header-desktop":
    "bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all font-semibold",
  "header-mobile":
    "block bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all font-semibold text-center",
  section:
    "inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:scale-105 transition-all",
} as const

const CLOSED_PILL_CLASSES = {
  "header-desktop": "bg-gray-200 text-gray-600 px-6 py-2 rounded-full font-semibold cursor-default",
  "header-mobile": "block bg-gray-200 text-gray-600 px-6 py-3 rounded-full font-semibold text-center cursor-default",
  section: "inline-block bg-gray-200 text-gray-600 px-8 py-4 rounded-full font-semibold text-lg cursor-default",
} as const

export function RegisterCta({ variant, location, initialPhase = "open", onNavigate, onDark = false }: RegisterCtaProps) {
  const phase = useEventPhase(initialPhase)

  if (phase === "open") {
    if (variant === "hero") {
      return (
        <MagneticButton href={REGISTRATION_FORM_URL} onClick={() => track("Register Click", { location })}>
          Register
        </MagneticButton>
      )
    }
    if (variant === "footer-link") {
      return (
        <a
          href={REGISTRATION_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("Register Click", { location })}
          className="block text-gray-400 hover:text-white transition-colors"
        >
          Register
        </a>
      )
    }
    return (
      <a
        href={REGISTRATION_FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          track("Register Click", { location })
          onNavigate?.()
        }}
        className={PILL_CLASSES[variant]}
      >
        Register
      </a>
    )
  }

  if (phase === "ended") {
    const label = variant === "hero" || variant === "section" ? "See what students built" : "See the projects"
    if (variant === "hero") {
      return (
        <MagneticButton href={DEVPOST_FALL_URL} onClick={() => track("Devpost Click", { location })}>
          {label}
        </MagneticButton>
      )
    }
    if (variant === "footer-link") {
      return (
        <a
          href={DEVPOST_FALL_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("Devpost Click", { location })}
          className="block text-gray-400 hover:text-white transition-colors"
        >
          {label}
        </a>
      )
    }
    return (
      <a
        href={DEVPOST_FALL_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          track("Devpost Click", { location })
          onNavigate?.()
        }}
        className={PILL_CLASSES[variant]}
      >
        {label}
      </a>
    )
  }

  // closed / live: registration is over but the event hasn't ended.
  if (variant === "footer-link") {
    return <span className="block text-gray-500">Registration closed</span>
  }
  if (variant === "hero" || variant === "section") {
    const helperText = onDark ? "text-sm text-white/60" : "text-sm text-gray-500"
    const helperLink = onDark
      ? "underline underline-offset-2 hover:text-white/80"
      : "underline underline-offset-2 hover:text-gray-700"
    return (
      <span className="inline-flex flex-col items-center gap-3">
        <span className={CLOSED_PILL_CLASSES.section}>Registration closed</span>
        <span className={helperText}>
          <a
            href={DEVPOST_FALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={helperLink}
          >
            Follow the event on Devpost
          </a>{" "}
          ·{" "}
          <Link href="/contact" className={helperLink}>
            Questions? Contact us
          </Link>
        </span>
      </span>
    )
  }
  return <span className={CLOSED_PILL_CLASSES[variant]}>Registration closed</span>
}
