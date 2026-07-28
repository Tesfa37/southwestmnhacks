import { REGISTRATION_CLOSE_AT, EVENT_START_AT, EVENT_END_AT } from "./config"

export type EventPhase = "open" | "closed" | "live" | "ended"

export const CLOSE_MS = new Date(REGISTRATION_CLOSE_AT).getTime()
export const START_MS = new Date(EVENT_START_AT).getTime()
export const END_MS = new Date(EVENT_END_AT).getTime()

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
