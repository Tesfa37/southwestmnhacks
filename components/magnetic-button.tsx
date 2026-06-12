"use client"

import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import { LazyMotion, domAnimation, m, useReducedMotion, useSpring } from "motion/react"

const MAX_PULL = 8

// Register CTA that springs a few pixels toward the pointer on hover.
// Pointer-events only, so it stays inert on touch and under reduced motion.
export function MagneticButton({
  href,
  children,
  onClick,
}: {
  href: string
  children: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduceMotion = useReducedMotion()
  const x = useSpring(0, { stiffness: 300, damping: 20 })
  const y = useSpring(0, { stiffness: 300, damping: 20 })

  function handlePointerMove(e: React.PointerEvent) {
    if (reduceMotion || e.pointerType !== "mouse" || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
    const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
    x.set(dx * MAX_PULL)
    y.set(dy * MAX_PULL)
  }

  function handlePointerLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ x, y }}
        onClick={onClick}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="group inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white px-8 py-4 rounded-full hover:shadow-lg hover:shadow-pink-500/25 transition-shadow font-semibold text-lg"
      >
        {children}
        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
      </m.a>
    </LazyMotion>
  )
}
