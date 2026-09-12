"use client"

import { useEffect, useState } from "react"
import {
  SUBMISSION_MS,
  SUBMISSION_STICKY_MS,
  SUBMISSION_URGENT_MS,
  getSubmissionState,
  splitCountdown,
  type SubmissionState,
} from "@/lib/event-phase"

/** How close the deadline is: drives the sticky bar and the red treatment. */
export type SubmissionTier = "normal" | "sticky" | "urgent"

export interface SubmissionCountdown {
  /** false until the first client tick, so callers can reserve height. */
  mounted: boolean
  msLeft: number
  state: SubmissionState
  tier: SubmissionTier
  parts: { hours: number; minutes: number; seconds: number }
}

function tierFor(msLeft: number): SubmissionTier {
  if (msLeft <= SUBMISSION_URGENT_MS) return "urgent"
  if (msLeft <= SUBMISSION_STICKY_MS) return "sticky"
  return "normal"
}

/**
 * The one clock behind the submission deadline UI.
 *
 * Call this EXACTLY ONCE (in event-hub.tsx) and pass the result down. Four
 * things depend on it — the card timer, the sticky bar, the Submit/View
 * button, and the urgency colour — and if each ran its own interval their
 * ticks would land on different frames, so the 8:00 AM boundary could render
 * a card reading "closed" above a button still reading "Submit". Sharing one
 * value from one render pass makes that disagreement impossible rather than
 * merely unlikely.
 */
export function useSubmissionCountdown(): SubmissionCountdown {
  // null until mounted so the server and first client render match.
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    const update = () => setNow(Date.now())
    const timeout = setTimeout(update, 0)
    const interval = setInterval(update, 1000)
    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [])

  if (now === null) {
    return {
      mounted: false,
      msLeft: 0,
      state: "counting",
      tier: "normal",
      parts: { hours: 0, minutes: 0, seconds: 0 },
    }
  }

  const msLeft = Math.max(0, SUBMISSION_MS - now)

  return {
    mounted: true,
    msLeft,
    state: getSubmissionState(now),
    tier: tierFor(msLeft),
    parts: splitCountdown(msLeft),
  }
}
