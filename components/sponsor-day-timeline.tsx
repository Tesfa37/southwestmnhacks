"use client"

import { useRef } from "react"
import { Store, Utensils, HeartHandshake, Gavel, Shield } from "lucide-react"
import { LazyMotion, domAnimation, m, useScroll, useSpring } from "motion/react"
import { cn } from "@/lib/utils"

const STEPS = [
  {
    icon: Store,
    time: "Morning",
    title: "Set up your booth",
    copy: "Your team sets up a booth or table and meets students as they arrive — talk about your organization, what you build, and who you're looking for.",
    accent: "from-orange-400 to-pink-400",
  },
  {
    icon: Utensils,
    time: "Midday",
    title: "Lunch with students",
    copy: "A reserved table at the structured networking meal, where students are seated or rotated by interest so you can talk projects, internships, and local careers.",
    accent: "from-pink-400 to-purple-400",
  },
  {
    icon: HeartHandshake,
    time: "Afternoon",
    title: "Mentor teams",
    copy: "Walk the floor and mentor teams as they build — answer questions, share how you'd approach the problem, and see how students think under pressure.",
    accent: "from-purple-400 to-blue-400",
  },
  {
    icon: Gavel,
    time: "Evening",
    title: "Judge the projects",
    copy: "Serve on the judging panel, watch the final presentations, and award your sponsored prize category to the team that earns it.",
    accent: "from-blue-400 to-teal-400",
  },
]

// Scroll-driven "day as a sponsor" timeline: the spine draws as you scroll,
// steps fade in alternating left/right on desktop, stacked on mobile.
export function SponsorDayTimeline() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <section className="py-16 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">A day as a sponsor</h2>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            What your team actually does at the event — as hands-on or hands-off as you like.
          </p>
        </div>

        <LazyMotion features={domAnimation}>
          <div ref={ref} className="relative">
            {/* Spine */}
            <div className="absolute left-6 top-0 h-full w-0.5 bg-border md:left-1/2 md:-translate-x-1/2" />
            <m.div
              style={{ scaleY }}
              className="absolute left-6 top-0 h-full w-0.5 origin-top bg-gradient-to-b from-orange-500 via-pink-500 to-blue-500 md:left-1/2 md:-translate-x-1/2"
            />

            <div className="space-y-12">
              {STEPS.map((step, i) => {
                const left = i % 2 === 0
                return (
                  <m.div
                    key={step.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-15% 0px" }}
                    transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className={cn(
                      "relative flex items-start gap-6 pl-16 md:w-1/2 md:pl-0",
                      left ? "md:mr-auto md:pr-12 md:text-right md:flex-row-reverse" : "md:ml-auto md:pl-12",
                    )}
                  >
                    {/* Node */}
                    <div
                      className={cn(
                        "absolute left-6 -translate-x-1/2 md:translate-x-0",
                        left ? "md:left-auto md:-right-7 md:translate-x-1/2" : "md:-left-7 md:-translate-x-1/2",
                      )}
                    >
                      <div
                        className={cn(
                          "flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg",
                          step.accent,
                        )}
                      >
                        <step.icon className="size-6" />
                      </div>
                    </div>

                    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                      <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-orange-600">{step.time}</p>
                      <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                      <p className="leading-relaxed text-muted-foreground">{step.copy}</p>
                    </div>
                  </m.div>
                )
              })}
            </div>
          </div>
        </LazyMotion>

        <div className="mt-14 flex items-start gap-4 rounded-3xl border border-border bg-card p-6">
          <div className="inline-flex items-center justify-center size-10 shrink-0 rounded-2xl bg-blue-100 text-blue-600">
            <Shield className="size-5" />
          </div>
          <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">Student safety.</span> Information sharing and any follow-up
            involving participants under 18 requires explicit parent or guardian permission and follows our event safety
            guidelines.
          </p>
        </div>
      </div>
    </section>
  )
}
