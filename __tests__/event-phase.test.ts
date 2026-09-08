import { describe, it, expect } from "vitest"
import { getEventPhase, CLOSE_MS, START_MS, END_MS } from "../lib/event-phase"

const ct = (iso: string) => new Date(iso).getTime()

describe("getEventPhase", () => {
  it("is open before the waitlist closes", () => {
    expect(getEventPhase(CLOSE_MS - 1)).toBe("open")
  })

  // The bug this suite exists to prevent: the waitlist must OUTLIVE the Sept 8
  // registration deadline. If someone ever points WAITLIST_CLOSE_AT back at the
  // registration deadline, this is the assertion that fails.
  it("keeps the waitlist open past the Sept 8 registration deadline", () => {
    expect(getEventPhase(ct("2026-09-09T00:00:00-05:00"))).toBe("open")
    expect(getEventPhase(ct("2026-09-10T12:00:00-05:00"))).toBe("open")
    expect(getEventPhase(ct("2026-09-11T23:59:00-05:00"))).toBe("open")
  })

  it("keeps the waitlist open right up to the doors-open instant", () => {
    expect(getEventPhase(ct("2026-09-12T07:59:59-05:00"))).toBe("open")
  })

  it("is live from doors-open until the event ends", () => {
    expect(getEventPhase(START_MS)).toBe("live")
    expect(getEventPhase(END_MS - 1)).toBe("live")
  })

  it("is ended from the event end instant", () => {
    expect(getEventPhase(END_MS)).toBe("ended")
    expect(getEventPhase(END_MS + 86_400_000)).toBe("ended")
  })

  // While WAITLIST_CLOSE_AT aliases EVENT_START_AT the two are equal, so "closed"
  // is deliberately unreachable ("live" is tested first). Asserting <= rather than
  // < keeps this suite honest either way: it passes today, and still passes if the
  // waitlist is later moved earlier and "closed" comes back.
  it("orders the boundary instants sanely", () => {
    expect(CLOSE_MS).toBeLessThanOrEqual(START_MS)
    expect(START_MS).toBeLessThan(END_MS)
  })

  it("never reports closed while the waitlist runs to doors-open", () => {
    expect(CLOSE_MS).toBe(START_MS)
    for (const t of [CLOSE_MS - 1, CLOSE_MS, START_MS, END_MS - 1, END_MS]) {
      expect(getEventPhase(t)).not.toBe("closed")
    }
  })
})
