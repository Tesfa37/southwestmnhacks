import { describe, it, expect, vi, afterEach } from "vitest"
import {
  CLOSE_MS,
  START_MS,
  CHALLENGES_MS,
  SUBMISSION_MS,
  END_MS,
  nextBoundary,
  subscribeToBoundaries,
  areChallengesRevealed,
} from "../lib/event-phase"
import { SCHEDULE, CHALLENGES, BONUS_CHALLENGE, SUBMISSION_CHECKLIST, QUICK_LINKS } from "../lib/event-hub"

describe("event-day boundaries", () => {
  it("orders the instants so the reveal and the deadline sit inside the event", () => {
    expect(CLOSE_MS).toBeLessThanOrEqual(START_MS)
    expect(START_MS).toBeLessThan(CHALLENGES_MS)
    expect(CHALLENGES_MS).toBeLessThan(SUBMISSION_MS)
    expect(SUBMISSION_MS).toBeLessThan(END_MS)
  })

  it("reveals the challenges after doors open, not before", () => {
    // The homepage must not scoop the opening ceremony.
    expect(CHALLENGES_MS).toBeGreaterThan(START_MS)
  })

  it("leaves time between the submission deadline and the end of the event", () => {
    // Demos and judging happen in this window.
    expect(END_MS - SUBMISSION_MS).toBeGreaterThanOrEqual(60 * 60 * 1000)
  })
})

describe("areChallengesRevealed", () => {
  it("hides the prompts until the reveal instant", () => {
    expect(areChallengesRevealed(START_MS)).toBe(false)
    expect(areChallengesRevealed(CHALLENGES_MS - 1)).toBe(false)
  })

  it("shows them from the reveal instant onward", () => {
    expect(areChallengesRevealed(CHALLENGES_MS)).toBe(true)
    expect(areChallengesRevealed(END_MS)).toBe(true)
  })
})

describe("nextBoundary", () => {
  it("returns each boundary in turn", () => {
    expect(nextBoundary(CLOSE_MS - 1)).toBe(CLOSE_MS)
    expect(nextBoundary(CLOSE_MS)).toBe(START_MS)
    expect(nextBoundary(START_MS - 1)).toBe(START_MS)
    expect(nextBoundary(START_MS)).toBe(CHALLENGES_MS)
    expect(nextBoundary(CHALLENGES_MS)).toBe(SUBMISSION_MS)
    expect(nextBoundary(SUBMISSION_MS)).toBe(END_MS)
  })

  it("returns null once the event has ended", () => {
    expect(nextBoundary(END_MS)).toBeNull()
    expect(nextBoundary(END_MS + 86_400_000)).toBeNull()
  })
})

describe("subscribeToBoundaries", () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it("notifies when a boundary passes and re-arms for the next one", () => {
    vi.useFakeTimers()
    vi.setSystemTime(START_MS - 1000)

    const onChange = vi.fn()
    const unsubscribe = subscribeToBoundaries(onChange)

    expect(onChange).not.toHaveBeenCalled()

    // Cross doors-open.
    vi.advanceTimersByTime(1000)
    expect(onChange).toHaveBeenCalledTimes(1)

    // Re-armed: crossing the reveal fires again off the same subscription.
    vi.advanceTimersByTime(CHALLENGES_MS - START_MS)
    expect(onChange).toHaveBeenCalledTimes(2)

    unsubscribe()
  })

  it("stops firing after unsubscribe", () => {
    vi.useFakeTimers()
    vi.setSystemTime(START_MS - 1000)

    const onChange = vi.fn()
    subscribeToBoundaries(onChange)()

    vi.advanceTimersByTime(END_MS - START_MS + 1000)
    expect(onChange).not.toHaveBeenCalled()
  })

  it("never schedules a timer once every boundary has passed", () => {
    vi.useFakeTimers()
    vi.setSystemTime(END_MS + 1000)

    const onChange = vi.fn()
    const unsubscribe = subscribeToBoundaries(onChange)

    expect(vi.getTimerCount()).toBe(0)
    unsubscribe()
  })
})

describe("schedule", () => {
  it("covers both days of the event", () => {
    expect(SCHEDULE.map((day) => day.day)).toEqual(["Saturday", "Sunday"])
  })

  it("puts the challenge reveal at 10:00 AM Saturday, after the 9:00 AM ceremony", () => {
    const saturday = SCHEDULE[0].rows
    const ceremony = saturday.findIndex((row) => row.activity === "Opening ceremony")
    const reveal = saturday.findIndex((row) => row.activity.startsWith("Challenge reveal"))

    expect(saturday[ceremony].time).toBe("9:00 AM")
    expect(saturday[reveal].time).toBe("10:00 AM")
    expect(reveal).toBeGreaterThan(ceremony)
  })

  it("marks the Sunday 8:00 AM submission row as the deadline", () => {
    const deadlineRows = SCHEDULE.flatMap((day) => day.rows).filter((row) => row.deadline)

    expect(deadlineRows).toHaveLength(1)
    expect(deadlineRows[0].time).toBe("8:00 AM")
    expect(deadlineRows[0].activity).toBe("Devpost submissions due")
  })

  it("no longer promises a clock time for awards or the close", () => {
    const sunday = SCHEDULE[1].rows
    const times = sunday.map((row) => row.time)

    // The 8:30 demos and 9:30 awards slots were dropped: presentations begin at
    // 9:00, so a 9:30 awards time would be a promise the morning can't keep.
    expect(times).not.toContain("8:30 AM")
    expect(times).not.toContain("9:30 AM")

    expect(times).toContain("After presentations")
    expect(times).toContain("After awards")
    expect(sunday.find((row) => row.time === "After presentations")?.activity).toBe("Awards")
    expect(sunday.find((row) => row.time === "After awards")?.activity).toBe("Event concludes")
  })

  it("keeps the Sunday morning running order", () => {
    const sunday = SCHEDULE[1].rows
    const order = ["8:00 AM", "8:00–9:00 AM", "9:00 AM", "After presentations", "After awards"]

    expect(sunday.map((row) => row.time)).toEqual(order)
    expect(sunday.find((row) => row.time === "8:00–9:00 AM")?.activity).toBe(
      "Judges review submitted projects",
    )
    expect(sunday.find((row) => row.time === "9:00 AM")?.activity).toBe(
      "Participant presentations begin",
    )
  })

  it("never leaks the 11:00 AM end buffer into public copy", () => {
    // EVENT_END_AT is slack for a late-running ceremony, not an advertised time.
    const text = SCHEDULE.flatMap((day) => day.rows.map((row) => `${row.time} ${row.activity}`)).join(" ")

    expect(text).not.toContain("11:00")
  })

  it("does not break the opening ceremony into per-speaker rows", () => {
    const activities = SCHEDULE.flatMap((day) => day.rows.map((row) => row.activity)).join(" ")

    for (const name of ["Dave", "Tanya", "Brad"]) {
      expect(activities).not.toContain(name)
    }
  })
})

describe("challenges", () => {
  it("has exactly the three sponsor prompts", () => {
    expect(CHALLENGES).toHaveLength(3)
    expect(CHALLENGES.map((challenge) => challenge.title)).toEqual([
      "Talent Readiness & Skills Intelligence Platform",
      "AI Use Case Generator",
      "Childcare Availability Finder",
    ])
  })

  it("keeps the bonus challenge separate from the sponsor prompts", () => {
    expect(CHALLENGES.map((challenge) => challenge.id)).not.toContain(BONUS_CHALLENGE.id)
    expect(BONUS_CHALLENGE.title).toBe("Interactive LED Display")
  })

  it("keeps the bonus challenge's no-penalty reassurance", () => {
    // The RFID/QR hardware failed mid-event; this sentence is why the prompt was
    // rewritten and is the easiest thing to lose in a later trim.
    const body = BONUS_CHALLENGE.body.join(" ")

    expect(body).toContain("RFID and QR integration are optional")
    expect(body).toContain("You will not be penalized for not using them")
    expect(body).toContain("The LED display is live")
    expect(BONUS_CHALLENGE.body).toHaveLength(5)
  })

  it("carries the five capability questions on the first prompt", () => {
    expect(CHALLENGES[0].questions).toHaveLength(5)
    expect(CHALLENGES[0].closing).toBeTruthy()
  })

  it("gives every prompt a body", () => {
    for (const challenge of [...CHALLENGES, BONUS_CHALLENGE]) {
      expect(challenge.body.length).toBeGreaterThan(0)
      expect(challenge.title.length).toBeGreaterThan(0)
    }
  })
})

describe("submission and links", () => {
  it("lists the five Devpost submission items", () => {
    expect(SUBMISSION_CHECKLIST).toHaveLength(5)
  })

  it("points at the Fall Devpost, not the March one", () => {
    const devpost = QUICK_LINKS.find((link) => link.label === "Devpost")

    expect(devpost?.href).toContain("southwest-mn-hacks.devpost.com")
    expect(devpost?.href).not.toContain("southwestmn-hacks.devpost.com")
  })

  it("routes to existing pages rather than duplicating them", () => {
    const internal = QUICK_LINKS.filter((link) => !link.external).map((link) => link.href)

    expect(internal).toEqual(["/resources", "/code-of-conduct", "/rules", "/safety"])
  })
})

describe("nextBoundary does not depend on declaration order", () => {
  it("returns the soonest upcoming instant, not the first one listed", () => {
    // Regression guard: BOUNDARIES is sorted at module init. Without that, a
    // config where a later-declared constant falls earlier than an
    // earlier-declared one would arm the timer for the wrong instant and skip
    // a wake — the phase would then only update for components that happen to
    // run their own interval.
    const all = [CLOSE_MS, START_MS, CHALLENGES_MS, SUBMISSION_MS, END_MS]

    for (const probe of all) {
      const soonest = all.filter((b) => b > probe).sort((a, b) => a - b)[0] ?? null
      expect(nextBoundary(probe)).toBe(soonest)
    }
  })
})
