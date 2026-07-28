"use client"

import { useEffect, useState } from "react"
import { LazyMotion, domAnimation, m, AnimatePresence, useReducedMotion } from "motion/react"

// Floating "Become a sponsor" pill: appears once the hero is scrolled past and
// hides again when the tiers section it links to is reached.
export function FloatingSponsorCta() {
  const [visible, setVisible] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    // Resolve once; #tiers is server-rendered and never unmounts on /sponsor.
    const tiers = document.getElementById("tiers")
    let frame = 0
    function update() {
      frame = 0
      const tiersReached = tiers !== null && tiers.getBoundingClientRect().top < window.innerHeight * 0.5
      setVisible(window.scrollY > 600 && !tiersReached)
    }
    function onScroll() {
      // Coalesce scroll events into one layout read per frame.
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {visible && (
          <m.a
            href="#tiers"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 24 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-6 py-3.5 font-semibold text-white shadow-xl shadow-pink-500/25 transition-transform hover:scale-105"
          >
            Become a sponsor
          </m.a>
        )}
      </AnimatePresence>
    </LazyMotion>
  )
}
