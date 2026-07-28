import { describe, it, expect } from "vitest"
import { getEventPhase, CLOSE_MS, START_MS, END_MS } from "../lib/event-phase"

describe("getEventPhase", () => {
  it("is open before registration closes", () => {
    expect(getEventPhase(CLOSE_MS - 1)).toBe("open")
  })

  it("is closed at and after the registration close instant", () => {
    expect(getEventPhase(CLOSE_MS)).toBe("closed")
    expect(getEventPhase(START_MS - 1)).toBe("closed")
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
    expect(CLOSE_MS).toBeLessThan(START_MS)
    expect(START_MS).toBeLessThan(END_MS)
  })
})
