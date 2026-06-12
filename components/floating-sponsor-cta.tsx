"use client"

import { useEffect, useState } from "react"
import { LazyMotion, domAnimation, m, AnimatePresence } from "motion/react"

// Floating "Become a sponsor" pill: appears once the hero is scrolled past and
// hides again when the tiers section it links to is reached.
export function FloatingSponsorCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      const tiers = document.getElementById("tiers")
      const tiersReached = tiers !== null && tiers.getBoundingClientRect().top < window.innerHeight * 0.5
      setVisible(window.scrollY > 600 && !tiersReached)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {visible && (
          <m.a
            href="#tiers"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
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
