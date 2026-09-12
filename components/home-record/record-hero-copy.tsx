"use client"

import { track } from "@vercel/analytics"
import { MagneticButton } from "@/components/magnetic-button"
import { WaitlistCta, WaitlistNote, useEventPhase } from "@/components/waitlist-cta"
import { ACTION_PILL, DISPLAY, MUTED } from "@/components/home-record/tokens"
import { DEVPOST_FALL_URL } from "@/lib/config"
import type { EventPhase } from "@/lib/event-phase"

/**
 * The phase-dependent top of the hero: headline, supporting line, and actions.
 *
 * Split out of record-hero.tsx as a client island purely so the copy can swap
 * the moment the event goes live. The hero itself stays a server component — it
 * owns the priority next/image group photo, and that shouldn't follow this into
 * the client bundle.
 */
export function RecordHeroCopy({ initialPhase }: { initialPhase: EventPhase }) {
  const phase = useEventPhase(initialPhase)

  const headline =
    phase === "live" ? "Southwest MN Hacks is live at SMSU." : "24 hours to build something real."

  return (
    <>
      <h1
        className={`${DISPLAY} text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] text-balance mb-6 max-w-4xl`}
      >
        {headline}
      </h1>

      <p className={`text-lg sm:text-xl ${MUTED} leading-relaxed max-w-2xl mb-8 text-pretty`}>
        {phase === "live" ? (
          <>Build, collaborate, ask mentors for help, and submit your project by 8:00 AM Sunday.</>
        ) : phase === "ended" ? (
          <>Fall 2026 is a wrap. Thanks to every student who showed up. See what they built.</>
        ) : (
          <>
            Southwest Minnesota&apos;s free overnight student hackathon returns to SMSU. Beginner friendly, ages 14
            and up, high school through college.
          </>
        )}
      </p>

      <div className={`flex flex-wrap items-center gap-x-6 gap-y-4 ${phase === "open" ? "mb-4" : "mb-12"}`}>
        {phase === "live" ? (
          <>
            <MagneticButton
              href="#event-hub"
              newTab={false}
              onClick={() => track("Event Hub Click", { location: "record-hero" })}
            >
              View Event Hub
            </MagneticButton>
            <a
              href={DEVPOST_FALL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("Devpost Click", { location: "record-hero" })}
              className={ACTION_PILL}
            >
              Open Devpost
            </a>
          </>
        ) : (
          <>
            <WaitlistCta variant="hero" location="record-hero" initialPhase={phase} />
            <a href="#receipts" className={ACTION_PILL}>
              See the proof from March
            </a>
          </>
        )}
      </div>
      {phase === "open" && <WaitlistNote initialPhase={phase} className="mb-12" />}
    </>
  )
}
