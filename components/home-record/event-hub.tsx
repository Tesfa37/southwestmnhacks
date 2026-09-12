"use client"

import Link from "next/link"
import { track } from "@vercel/analytics"
import { Reveal } from "@/components/reveal"
import { HubSchedule } from "@/components/home-record/hub-schedule"
import { HubChallenges } from "@/components/home-record/hub-challenges"
import { SubmissionCountdown } from "@/components/home-record/submission-countdown"
import { SubmissionStickyBar } from "@/components/home-record/submission-sticky-bar"
import { useSubmissionCountdown } from "@/components/home-record/use-submission-countdown"
import { useEventPhase } from "@/components/waitlist-cta"
import { ACTION_PILL, CARD_TITLE, DISPLAY, MUTED } from "@/components/home-record/tokens"
import { QUICK_LINKS, SUBMISSION_CHECKLIST } from "@/lib/event-hub"
import { DEVPOST_FALL_URL, SUBMISSION_DEADLINE } from "@/lib/config"
import type { EventPhase } from "@/lib/event-phase"

/**
 * The participant utility area, shown from the waitlist closing through to the
 * end of the event. Everything a student at SMSU needs on a phone: when things
 * happen, what to build, when to submit, and where to go for the rest.
 *
 * Client component so it can appear and disappear on the real clock rather than
 * waiting on the homepage's 5-minute ISR window.
 */
export function EventHub({
  initialPhase,
  initialRevealed,
}: {
  initialPhase: EventPhase
  initialRevealed: boolean
}) {
  const phase = useEventPhase(initialPhase)
  // One clock for the card, the button, and the sticky bar: read once here so
  // the 8:00 AM swap is atomic across all three.
  const countdown = useSubmissionCountdown()

  // Present from the waitlist closing (so students arriving can plan) until the
  // event ends, when the wrap-up homepage takes over.
  if (phase !== "closed" && phase !== "live") return null

  return (
    // scroll-mt clears the sticky header when the hero's "View Event Hub" lands here.
    <section
      id="event-hub"
      aria-label="Event Hub"
      className="scroll-mt-24 bg-white border-y border-gray-200"
    >
      <SubmissionStickyBar countdown={countdown} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <Reveal>
          <div className="mb-10 max-w-2xl">
            <p className={`font-mono text-xs font-semibold uppercase tracking-[0.14em] ${MUTED} mb-3`}>
              This weekend
            </p>
            <h2 className={`${DISPLAY} text-3xl sm:text-4xl font-black`}>Event Hub</h2>
            <p className={`mt-3 text-lg ${MUTED} text-pretty`}>
              Everything you need for Southwest MN Hacks this weekend.
            </p>
          </div>
        </Reveal>

        {/* Deadline first: the one thing that must not sit below four long
            prompts on a phone. */}
        <Reveal delay={0.05}>
          <div className="rounded-xl bg-orange-50/60 ring-1 ring-orange-200 p-6 sm:p-8 mb-12">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-orange-800 mb-2">
                  Project submission
                </p>
                <p className="text-2xl sm:text-3xl font-black tracking-tight text-orange-900">
                  {SUBMISSION_DEADLINE}
                </p>
                <SubmissionCountdown countdown={countdown} />
                <p className={`text-sm ${MUTED}`}>
                  {countdown.state === "closed"
                    ? "The deadline has passed. Judging is underway."
                    : "Submit your project on Devpost before the deadline."}
                </p>
              </div>

              <a
                href={DEVPOST_FALL_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  track("Devpost Click", {
                    location: countdown.state === "closed" ? "event-hub-view" : "event-hub-submit",
                  })
                }
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-600 to-pink-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:shadow-lg hover:from-orange-700 hover:to-pink-700"
              >
                {countdown.state === "closed" ? "View submissions on Devpost" : "Submit on Devpost"}
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-orange-200">
              <p className={`text-sm font-semibold mb-3`}>Your submission should include</p>
              <ul className={`grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm ${MUTED}`}>
                {SUBMISSION_CHECKLIST.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true" className="text-orange-600">
                      &bull;
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mb-12">
            <h3 className={`${CARD_TITLE} text-xl font-extrabold mb-6`}>Schedule</h3>
            <HubSchedule />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mb-12">
            <h3 className={`${CARD_TITLE} text-xl font-extrabold mb-6`}>Challenges</h3>
            <HubChallenges initialRevealed={initialRevealed} />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div>
            <h3 className={`${CARD_TITLE} text-xl font-extrabold mb-4`}>Quick links</h3>
            <ul className="flex flex-wrap gap-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    // mailto: stays in the same tab — _blank there just leaves
                    // an empty tab behind once the mail client opens.
                    <a
                      href={link.href}
                      target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                      className={ACTION_PILL}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className={ACTION_PILL}>
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
