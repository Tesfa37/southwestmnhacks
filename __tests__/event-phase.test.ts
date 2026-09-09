import { describe, it, expect } from "vitest"
import { getEventPhase, CLOSE_MS, START_MS, END_MS } from "../lib/event-phase"

const ct = (iso: string) => new Date(iso).getTime()

describe("getEventPhase", () => {
  it("is open before the waitlist closes", () => {
    expect(getEventPhase(CLOSE_MS - 1)).toBe("open")
  })

  // The waitlist is shut. WAITLIST_CLOSE_AT no longer aliases EVENT_START_AT, so
  // "closed" is reachable again and is the phase the site is in today.
  it("is closed from the waitlist close instant until doors open", () => {
    expect(getEventPhase(CLOSE_MS)).toBe("closed")
    expect(getEventPhase(ct("2026-09-10T12:00:00-05:00"))).toBe("closed")
    expect(getEventPhase(ct("2026-09-11T23:59:00-05:00"))).toBe("closed")
    expect(getEventPhase(START_MS - 1)).toBe("closed")
  })

  // Durable form of "closed right now": asserting getEventPhase() against the real
  // clock would be a time bomb (it becomes "live" on Sept 12), but the close instant
  // being in the past stays true forever.
  it("has the waitlist deadline in the past, so sign-ups are closed", () => {
    expect(CLOSE_MS).toBeLessThan(Date.now())
  })

  it("is live from doors-open until the event ends", () => {
    expect(getEventPhase(START_MS)).toBe("live")
    expect(getEventPhase(END_MS - 1)).toBe("live")
  })

  it("is ended from the event end instant", () => {
    expect(getEventPhase(END_MS)).toBe("ended")
    expect(getEventPhase(END_MS + 86_400_000)).toBe("ended")
  })

  it("orders the boundary instants sanely", () => {
    expect(CLOSE_MS).toBeLessThanOrEqual(START_MS)
    expect(START_MS).toBeLessThan(END_MS)
  })
})
