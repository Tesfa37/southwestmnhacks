"use client"

import { useEffect, useState } from "react"
import { LazyMotion, domAnimation, m, AnimatePresence, useReducedMotion } from "motion/react"

// Cycles through words with a vertical flip. Width is held by the longest word
// so surrounding text doesn't reflow.
export function RotatingWord({ words, intervalMs = 2200 }: { words: string[]; intervalMs?: number }) {
  const [index, setIndex] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), intervalMs)
    return () => clearInterval(id)
  }, [words.length, intervalMs, reduceMotion])

  if (reduceMotion) {
    return <span className="font-semibold text-foreground">{words[0]}</span>
  }

  return (
    <LazyMotion features={domAnimation}>
      <span className="relative inline-grid overflow-hidden align-bottom">
        {/* Invisible longest word reserves width to avoid reflow */}
        <span aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-nowrap font-semibold">
          {words.reduce((a, b) => (a.length >= b.length ? a : b))}
        </span>
        <AnimatePresence mode="popLayout" initial={false}>
          <m.span
            key={index}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="col-start-1 row-start-1 whitespace-nowrap bg-gradient-to-r from-orange-600 via-pink-600 to-blue-600 bg-clip-text font-semibold text-transparent"
          >
            {words[index]}
          </m.span>
        </AnimatePresence>
      </span>
    </LazyMotion>
  )
}
