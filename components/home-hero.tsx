"use client"

import { useRef, useState } from "react"
import { LazyMotion, domAnimation, m, AnimatePresence, useReducedMotion, type Variants } from "motion/react"
import { AuroraBackground } from "@/components/aurora-background"
import { CountdownTimer } from "@/components/countdown-timer"
import { MagneticButton } from "@/components/magnetic-button"
import { RotatingWord } from "@/components/rotating-word"
import { FloatingStickers } from "@/components/floating-stickers"
import { KonamiListener } from "@/components/easter-eggs"
import { burstConfetti } from "@/lib/confetti"
import {
  EVENT_NAME,
  EVENT_DATES,
  REGISTRATION_DEADLINE,
  REGISTRATION_FORM_URL,
  VENUE_MAP_URL,
  DISCORD_INVITE_URL,
  DISCORD_ENABLED,
} from "@/lib/config"

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] } },
}

export function HomeHero() {
  const reduceMotion = useReducedMotion()
  const clickCount = useRef(0)
  const [secret, setSecret] = useState(false)

  function handleHeadlineClick() {
    clickCount.current += 1
    if (clickCount.current >= 5) {
      clickCount.current = 0
      burstConfetti()
      setSecret(true)
      setTimeout(() => setSecret(false), 4500)
    }
  }

  return (
    <section className="relative overflow-hidden">
      <AuroraBackground intensity="bold" />
      <KonamiListener />

      <LazyMotion features={domAnimation}>
        <div className="relative">
          <FloatingStickers />

          <m.div
            className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-16 sm:pt-16 sm:pb-20 md:pt-20 text-center"
            variants={container}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
          >
            <m.div
              variants={item}
              className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full text-sm font-semibold text-blue-900 mb-6"
            >
              {EVENT_DATES} •{" "}
              <a
                href={VENUE_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-blue-700 transition-colors"
              >
                SMSU, Marshall, MN
              </a>
            </m.div>

            <m.h1
              variants={item}
              onClick={handleHeadlineClick}
              className="cursor-default text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight text-balance px-2"
            >
              <span className="animate-text-shimmer bg-gradient-to-r from-orange-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                {EVENT_NAME}
              </span>
            </m.h1>

            <m.p
              variants={item}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed text-pretty px-4"
            >
              Southwest Minnesota&apos;s student hackathon returns. Two days to build{" "}
              <RotatingWord words={["your first app", "a game", "an AI tool", "a robot", "new friendships", "your future"]} />{" "}
              — all skill levels welcome.
            </m.p>

            <m.div variants={item} className="flex flex-wrap gap-4 justify-center mb-3 px-4">
              <MagneticButton href={REGISTRATION_FORM_URL}>Register</MagneticButton>
            {DISCORD_ENABLED && (
              <a
                href={DISCORD_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all font-semibold text-lg inline-flex items-center gap-2"
              >
                Join the Discord
              </a>
            )}
          </m.div>

          <m.div variants={item} className="mb-6 px-4">
            <CountdownTimer />
          </m.div>

          <m.p variants={item} className="text-sm text-gray-500">
            Registration closes {REGISTRATION_DEADLINE}.
          </m.p>
          </m.div>
        </div>

        <AnimatePresence>
          {secret && (
            <m.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-xl"
            >
              🎉 You found a secret! See you September 12–13.
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </section>
  )
}
