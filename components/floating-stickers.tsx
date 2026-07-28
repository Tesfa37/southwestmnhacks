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

// One shared pointermove listener for all stickers: the latest pointer position
// is applied in a single rAF, and each sticker's rect is cached (recomputed on
// resize/scroll) instead of a forced layout read per pointer event per sticker.
type Subscriber = {
  el: HTMLSpanElement
  rect: DOMRect | null
  apply: (dx: number, dy: number) => void
}

const subscribers = new Set<Subscriber>()
let pointer: { x: number; y: number } | null = null
let frame = 0
let listening = false

function flush() {
  frame = 0
  if (!pointer) return
  for (const sub of subscribers) {
    sub.rect ??= sub.el.getBoundingClientRect()
    const dx = sub.rect.left + sub.rect.width / 2 - pointer.x
    const dy = sub.rect.top + sub.rect.height / 2 - pointer.y
    const dist = Math.hypot(dx, dy)
    if (dist < REPEL_RADIUS && dist > 0) {
      const force = (1 - dist / REPEL_RADIUS) * REPEL_FORCE
      sub.apply((dx / dist) * force, (dy / dist) * force)
    } else {
      sub.apply(0, 0)
    }
  }
}

function onMove(e: PointerEvent) {
  if (e.pointerType !== "mouse") return
  pointer = { x: e.clientX, y: e.clientY }
  if (!frame) frame = requestAnimationFrame(flush)
}

function invalidateRects() {
  for (const sub of subscribers) sub.rect = null
}

function subscribe(sub: Subscriber) {
  subscribers.add(sub)
  if (!listening) {
    listening = true
    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("resize", invalidateRects, { passive: true })
    window.addEventListener("scroll", invalidateRects, { passive: true })
  }
  return () => {
    subscribers.delete(sub)
    if (subscribers.size === 0 && listening) {
      listening = false
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("resize", invalidateRects)
      window.removeEventListener("scroll", invalidateRects)
      if (frame) {
        cancelAnimationFrame(frame)
        frame = 0
      }
    }
  }
}

function Sticker({ emoji, className, bobDuration }: (typeof STICKERS)[number]) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduceMotion = useReducedMotion()
  const x = useSpring(0, { stiffness: 150, damping: 14 })
  const y = useSpring(0, { stiffness: 150, damping: 14 })

  useEffect(() => {
    if (reduceMotion || !ref.current) return
    return subscribe({
      el: ref.current,
      rect: null,
      apply: (dx, dy) => {
        x.set(dx)
        y.set(dy)
      },
    })
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
