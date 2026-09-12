import { describe, it, expect } from "vitest"
import {
  START_MS,
  SUBMISSION_MS,
  END_MS,
  SUBMISSION_STICKY_MS,
  SUBMISSION_URGENT_MS,
  getSubmissionState,
  splitCountdown,
  nextBoundary,
} from "../lib/event-phase"

describe("getSubmissionState", () => {
  it("counts while the deadline is ahead", () => {
    expect(getSubmissionState(SUBMISSION_MS - 1)).toBe("counting")
    expect(getSubmissionState(START_MS)).toBe("counting")
  })

  it("closes from the deadline instant onward", () => {
    expect(getSubmissionState(SUBMISSION_MS)).toBe("closed")
    expect(getSubmissionState(SUBMISSION_MS + 1)).toBe("closed")
    expect(getSubmissionState(END_MS)).toBe("closed")
  })
})

describe("splitCountdown", () => {
  // The reason there is no days field: doors to deadline is exactly 24h, so a
  // days column would read 00 for the whole event.
  it("reports whole hours rather than rolling into days", () => {
    expect(splitCountdown(24 * 3_600_000)).toEqual({ hours: 24, minutes: 0, seconds: 0 })
    expect(splitCountdown(26 * 3_600_000 + 14 * 60_000 + 3_000)).toEqual({
      hours: 26,
      minutes: 14,
      seconds: 3,
    })
  })

  it("splits the urgency thresholds exactly", () => {
    expect(splitCountdown(SUBMISSION_STICKY_MS)).toEqual({ hours: 3, minutes: 0, seconds: 0 })
    expect(splitCountdown(SUBMISSION_URGENT_MS)).toEqual({ hours: 1, minutes: 0, seconds: 0 })
  })

  it("handles the last minute and zero", () => {
    expect(splitCountdown(59_000)).toEqual({ hours: 0, minutes: 0, seconds: 59 })
    expect(splitCountdown(0)).toEqual({ hours: 0, minutes: 0, seconds: 0 })
  })

  it("clamps a passed deadline to zero rather than going negative", () => {
    expect(splitCountdown(-5_000)).toEqual({ hours: 0, minutes: 0, seconds: 0 })
  })
})

describe("urgency thresholds", () => {
  it("escalates from sticky to urgent", () => {
    expect(SUBMISSION_URGENT_MS).toBeLessThan(SUBMISSION_STICKY_MS)
  })

  it("opens the sticky window after the event has started", () => {
    // Otherwise the bar would be live before anyone could build anything.
    expect(SUBMISSION_MS - SUBMISSION_STICKY_MS).toBeGreaterThan(START_MS)
  })

  it("keeps both windows inside the event", () => {
    expect(SUBMISSION_MS).toBeLessThan(END_MS)
  })
})

describe("the deadline stays a wake boundary", () => {
  // If SUBMISSION_MS ever leaves BOUNDARIES, an already-open tab would stop
  // being notified and the at-zero swap would silently need a refresh.
  it("is the next boundary from just before it", () => {
    expect(nextBoundary(SUBMISSION_MS - 1)).toBe(SUBMISSION_MS)
  })
})
