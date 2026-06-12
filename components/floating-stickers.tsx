"use client"

import { useEffect, useRef } from "react"
import { LazyMotion, domAnimation, m, useReducedMotion, useSpring } from "motion/react"
import { cn } from "@/lib/utils"

const STICKERS = [
  { emoji: "💻", className: "left-[6%] top-[22%] text-3xl sm:text-4xl", bobDuration: 3.2 },
  { emoji: "🍕", className: "right-[8%] top-[18%] text-3xl sm:text-4xl", bobDuration: 3.8 },
  { emoji: "⚡", className: "left-[14%] top-[58%] text-2xl sm:text-3xl hidden sm:block", bobDuration: 2.8 },
  { emoji: "🎨", className: "right-[14%] top-[55%] text-2xl sm:text-3xl hidden sm:block", bobDuration: 3.5 },
  { emoji: "🤖", className: "left-[26%] top-[8%] text-2xl sm:text-3xl hidden md:block", bobDuration: 4.1 },
  { emoji: "✨", className: "right-[26%] top-[6%] text-2xl sm:text-3xl hidden md:block", bobDuration: 3.0 },
]

const REPEL_RADIUS = 140
const REPEL_FORCE = 44

function Sticker({ emoji, className, bobDuration }: (typeof STICKERS)[number]) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduceMotion = useReducedMotion()
  const x = useSpring(0, { stiffness: 150, damping: 14 })
  const y = useSpring(0, { stiffness: 150, damping: 14 })

  useEffect(() => {
    if (reduceMotion) return
    function onMove(e: PointerEvent) {
      if (e.pointerType !== "mouse" || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const dx = rect.left + rect.width / 2 - e.clientX
      const dy = rect.top + rect.height / 2 - e.clientY
      const dist = Math.hypot(dx, dy)
      if (dist < REPEL_RADIUS && dist > 0) {
        const force = (1 - dist / REPEL_RADIUS) * REPEL_FORCE
        x.set((dx / dist) * force)
        y.set((dy / dist) * force)
      } else {
        x.set(0)
        y.set(0)
      }
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [reduceMotion, x, y])

  return (
    <m.span ref={ref} style={{ x, y }} className={cn("pointer-events-none absolute select-none", className)}>
      <m.span
        className="inline-block drop-shadow-sm"
        animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: bobDuration, ease: "easeInOut" }}
      >
        {emoji}
      </m.span>
    </m.span>
  )
}

// Decorative emoji stickers bobbing around the hero headline; they scatter
// slightly when a mouse cursor approaches. Inert on touch and reduced motion.
export function FloatingStickers() {
  return (
    <div aria-hidden="true" className="absolute inset-0 z-0">
      <LazyMotion features={domAnimation}>
        {STICKERS.map((sticker) => (
          <Sticker key={sticker.emoji} {...sticker} />
        ))}
      </LazyMotion>
    </div>
  )
}
