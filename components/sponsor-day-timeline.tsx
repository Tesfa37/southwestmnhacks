"use client"

import Link from "next/link"
import { Store, Utensils, HeartHandshake, Gavel, Shield } from "lucide-react"
import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react"

const STEPS = [
  {
    icon: Store,
    time: "Morning",
    title: "Set up your booth",
    copy: "Meet students as they arrive and talk about what you build and who you're looking for.",
    accent: "from-orange-400 to-pink-400",
  },
  {
    icon: Utensils,
    time: "Midday",
    title: "Lunch with students",
    copy: "A reserved table at the networking meal to talk projects, internships, and local careers.",
    accent: "from-pink-400 to-purple-400",
  },
  {
    icon: HeartHandshake,
    time: "Afternoon",
    title: "Mentor teams",
    copy: "Walk the floor and see how students think under pressure.",
    accent: "from-purple-400 to-blue-400",
  },
  {
    icon: Gavel,
    time: "Next morning",
    title: "Judge the projects",
    copy: "Watch the final presentations and award your sponsored prize.",
    accent: "from-blue-400 to-teal-400",
  },
]

// Compact "day as a sponsor": four cards in a 2x2 grid with a single entrance
// fade (no scroll-driven spine).
export function SponsorDayTimeline() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="py-16 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">A day as a sponsor</h2>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            What your team actually does at the event, as hands-on or hands-off as you like.
          </p>
        </div>

        <LazyMotion features={domAnimation}>
          <m.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
          >
            {STEPS.map((step) => (
              <div key={step.title} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className={`flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-sm ${step.accent}`}
                  >
                    <step.icon className="size-5" />
                  </div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">{step.time}</p>
                </div>
                <h3 className="mb-1 text-lg font-bold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.copy}</p>
              </div>
            ))}
          </m.div>
        </LazyMotion>

        <div className="mt-8 flex items-start gap-3 rounded-3xl border border-border bg-card p-5">
          <Shield className="size-5 shrink-0 text-blue-600 mt-0.5" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">Student safety.</span> Information sharing and any
            follow-up involving participants under 18 requires explicit parent or guardian permission and follows our{" "}
            <Link href="/safety" className="font-medium text-foreground underline underline-offset-2 hover:text-blue-600">
              event safety guidelines
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
