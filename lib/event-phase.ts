import {
  WAITLIST_CLOSE_AT,
  EVENT_START_AT,
  EVENT_END_AT,
  CHALLENGES_REVEAL_AT,
  SUBMISSION_DEADLINE_AT,
} from "./config"

export type EventPhase = "open" | "closed" | "live" | "ended"

export const CLOSE_MS = new Date(WAITLIST_CLOSE_AT).getTime()
export const START_MS = new Date(EVENT_START_AT).getTime()
export const END_MS = new Date(EVENT_END_AT).getTime()
export const CHALLENGES_MS = new Date(CHALLENGES_REVEAL_AT).getTime()
export const SUBMISSION_MS = new Date(SUBMISSION_DEADLINE_AT).getTime()

// QA-only override: set NEXT_PUBLIC_EVENT_PHASE=closed|live|ended in .env.local
// to preview a phase. NEVER set this in the Vercel project environment — it
// hard-locks the deployed site to that phase.
const OVERRIDE = process.env.NEXT_PUBLIC_EVENT_PHASE as EventPhase | undefined

export function getEventPhase(now: number = Date.now()): EventPhase {
  if (OVERRIDE) return OVERRIDE
  if (now >= END_MS) return "ended"
  if (now >= START_MS) return "live"
  if (now >= CLOSE_MS) return "closed"
  return "open"
}

/**
 * Have the challenge prompts been revealed? Same shape as getEventPhase, and
 * override-aware for the same reason: NEXT_PUBLIC_EVENT_PHASE=live should show
 * QA the event in full, prompts included, whatever the wall clock says.
 */
export function areChallengesRevealed(now: number = Date.now()): boolean {
  if (OVERRIDE) return OVERRIDE === "live" || OVERRIDE === "ended"
  return now >= CHALLENGES_MS
}

/**
 * Every instant at which clock-driven UI changes, ascending. The challenge
 * reveal and the submission deadline don't move the phase, but they do move the
 * Event Hub, so they share one timer with the phase boundaries.
 */
const BOUNDARIES = [CLOSE_MS, START_MS, CHALLENGES_MS, SUBMISSION_MS, END_MS] as const

/** The next boundary strictly after `now`, or null once the last one has passed. */
export function nextBoundary(now: number): number | null {
  for (const boundary of BOUNDARIES) {
    if (now < boundary) return boundary
  }
  return null
}

// setTimeout stores its delay in a 32-bit int; anything larger fires immediately.
const MAX_TIMEOUT = 2_147_483_647

/**
 * Calls `onChange` as each boundary passes, so an already-open tab picks up the
 * transition without a refresh — the page is ISR'd, so without this a student
 * who opened the site before doors would sit on pre-event copy indefinitely.
 *
 * Built for useSyncExternalStore: pair it with getEventPhase (or any snapshot
 * derived from the clock). React bails out when the snapshot is unchanged, so a
 * boundary that doesn't affect a given subscriber costs nothing.
 *
 * No-ops under NEXT_PUBLIC_EVENT_PHASE: a pinned QA preview must stay pinned.
 */
export function subscribeToBoundaries(onChange: () => void): () => void {
  if (OVERRIDE) return () => {}

  let timer: ReturnType<typeof setTimeout> | undefined

  const arm = () => {
    const target = nextBoundary(Date.now())
    if (target === null) return

    // Re-arm rather than fire when the wait overflows setTimeout's range; the
    // clamped wake just re-checks and schedules the remainder.
    const delay = Math.min(target - Date.now(), MAX_TIMEOUT)
    timer = setTimeout(() => {
      onChange()
      arm()
    }, delay)
  }

  arm()

  return () => {
    if (timer !== undefined) clearTimeout(timer)
  }
}

export type SubmissionState = "counting" | "closed"

/**
 * Are Devpost submissions still open? Unlike getEventPhase and
 * areChallengesRevealed, this is deliberately NOT override-aware: under
 * NEXT_PUBLIC_EVENT_PHASE the real clock still yields a sensible countdown,
 * and the only consumer already sits inside the phase-gated Event Hub.
 */
export function getSubmissionState(now: number = Date.now()): SubmissionState {
  return now >= SUBMISSION_MS ? "closed" : "counting"
}

// Urgency thresholds for the submission countdown, measured back from the
// deadline: the sticky bar appears at the first, the red treatment at the second.
export const SUBMISSION_STICKY_MS = 3 * 60 * 60 * 1000
export const SUBMISSION_URGENT_MS = 60 * 60 * 1000

/**
 * Split a remaining duration into display parts, clamped at zero.
 *
 * `hours` is WHOLE hours, not hours-within-a-day: doors to deadline is exactly
 * 24h, so a days field would read 00 for the entire event. One format covers
 * "26:14:03" before doors and "07:22:09" overnight.
 */
export function splitCountdown(ms: number): { hours: number; minutes: number; seconds: number } {
  const total = Math.max(0, ms)
  return {
    hours: Math.floor(total / 3_600_000),
    minutes: Math.floor((total % 3_600_000) / 60_000),
    seconds: Math.floor((total % 60_000) / 1_000),
  }
}
