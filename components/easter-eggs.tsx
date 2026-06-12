"use client"

import { useEffect, useRef } from "react"
import { confettiRain } from "@/lib/confetti"

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
]

// Invisible listener: typing the Konami code anywhere on the page rains confetti.
export function KonamiListener({ onTrigger }: { onTrigger?: () => void }) {
  const progress = useRef(0)

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const expected = KONAMI[progress.current]
      if (e.key === expected || e.key.toLowerCase() === expected) {
        progress.current += 1
        if (progress.current === KONAMI.length) {
          progress.current = 0
          confettiRain()
          onTrigger?.()
        }
      } else {
        progress.current = e.key === KONAMI[0] ? 1 : 0
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [onTrigger])

  return null
}
