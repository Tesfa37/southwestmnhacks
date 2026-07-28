import { describe, it, expect } from "vitest"
import { SPONSOR_DEADLINE, SPONSOR_DEADLINE_SHORT } from "../lib/config"

describe("sponsor deadline formats", () => {
  it("derives both display formats from the ISO date", () => {
    expect(SPONSOR_DEADLINE).toBe("August 28, 2026")
    expect(SPONSOR_DEADLINE_SHORT).toBe("Aug 28")
  })
})
