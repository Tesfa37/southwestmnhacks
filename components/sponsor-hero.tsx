"use client"

import { Sparkles, Calendar, MapPin } from "lucide-react"
import { LazyMotion, domAnimation, m, useReducedMotion, type Variants } from "motion/react"
import { AuroraBackground } from "@/components/aurora-background"
import { EVENT_DATES, VENUE, VENUE_MAP_URL, PARTNERSHIP_LINE, SPONSOR_EMAIL, SPONSOR_DEADLINE } from "@/lib/config"

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] } },
}

export function SponsorHero() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden py-20 px-4 md:py-28">
      <AuroraBackground intensity="subtle" />
      <LazyMotion features={domAnimation}>
        <m.div
          className="container max-w-4xl mx-auto text-center"
          variants={container}
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
        >
          <m.div
            variants={item}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-pink-600 font-medium text-sm mb-6"
          >
            <Sparkles className="size-4" />
            Southwest MN Hacks &middot; Fall 2026
          </m.div>
          <m.h1 variants={item} className="text-4xl md:text-6xl font-bold text-balance mb-6 leading-tight">
            More than{" "}
            <span className="animate-text-shimmer bg-gradient-to-r from-orange-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              logo placement
            </span>
          </m.h1>
          <m.p
            variants={item}
            className="text-lg md:text-xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed"
          >
            Southwest MN Hacks connects your organization directly with motivated students from across the region. This
            is more than an advertising buy. Sponsors meet students in person, over a networking meal, at a booth, while
            mentoring teams, and while judging projects.
          </m.p>
          <m.div variants={item} className="mt-8 flex flex-col items-center justify-center gap-3">
            <a
              href="#tiers"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-8 py-4 text-lg font-semibold text-white transition-shadow hover:shadow-lg hover:shadow-pink-500/25"
            >
              See sponsorship levels
            </a>
            <a
              href={`mailto:${SPONSOR_EMAIL}`}
              className="text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
            >
              or email {SPONSOR_EMAIL}
            </a>
          </m.div>
          <m.div variants={item} className="mt-10 pt-8 border-t border-border max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm font-medium text-foreground">
              <span className="inline-flex items-center gap-2">
                <Calendar className="size-4 text-orange-600" />
                {EVENT_DATES}
              </span>
              <a
                href={VENUE_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-orange-600 underline-offset-2 hover:underline transition-colors"
              >
                <MapPin className="size-4 text-orange-600" />
                {VENUE}
              </a>
            </div>
            <p className="mt-3 text-sm font-medium text-foreground">
              Commit by {SPONSOR_DEADLINE} to lock in full benefits, including your logo on the event t-shirt and the
              option to present a challenge prompt. Later sponsors still receive all digital and day-of benefits.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">{PARTNERSHIP_LINE}</p>
          </m.div>
        </m.div>
      </LazyMotion>
    </section>
  )
}
