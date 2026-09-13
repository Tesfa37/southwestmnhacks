import { describe, it, expect } from "vitest"
import {
  FALL_JUDGES,
  FALL_PROJECTS,
  FALL_AWARDS,
  AWARD_ORDER,
  DEVPOST_PROJECT_BASE,
  EXPECTED_FALL_PROJECT_COUNT,
  getFallWinners,
  type FallAward,
} from "../lib/fall-2026"
import { DEVPOST_FALL_URL, DEVPOST_SPRING_URL } from "../lib/config"

describe("judges", () => {
  it("lists the three Fall judges in the supplied order", () => {
    expect(FALL_JUDGES.map((judge) => judge.name)).toEqual([
      "Alex Polfliet",
      "Prof. Oluleye Babatunde",
      "Mandar Chaudhari",
    ])
  })

  it("matches the title already published for Babatunde elsewhere on the site", () => {
    // record-people.tsx and appreciation.tsx both say this. One person showing
    // two different titles across the site reads as an error, so it is pinned.
    const babatunde = FALL_JUDGES.find((judge) => judge.name.includes("Babatunde"))

    expect(babatunde?.role).toBe("Assistant Professor of Computer Science, SMSU")
  })

  it("gives every judge a name and a role", () => {
    for (const judge of FALL_JUDGES) {
      expect(judge.name.trim().length).toBeGreaterThan(0)
      expect(judge.role.trim().length).toBeGreaterThan(0)
    }
  })

  it("gives every judge either a photo or two-letter initials", () => {
    // Otherwise a card renders an empty media box.
    for (const judge of FALL_JUDGES) {
      if (judge.photo) {
        expect(judge.photo.startsWith("/images/")).toBe(true)
      } else {
        expect(judge.initials).toMatch(/^[A-Z]{2}$/)
      }
    }
  })
})

describe("projects", () => {
  it("has all twelve submissions", () => {
    expect(FALL_PROJECTS).toHaveLength(EXPECTED_FALL_PROJECT_COUNT)
  })

  it("uses unique ids", () => {
    const ids = FALL_PROJECTS.map((project) => project.id)

    expect(new Set(ids).size).toBe(ids.length)
  })

  it("has no duplicate Devpost URLs", () => {
    const urls = FALL_PROJECTS.map((project) => project.devpost)

    expect(new Set(urls).size).toBe(urls.length)
  })

  it("gives every project a title, at least one member, and a link", () => {
    for (const project of FALL_PROJECTS) {
      expect(project.project.trim().length).toBeGreaterThan(0)
      expect(project.members.length).toBeGreaterThan(0)
      expect(project.devpost.trim().length).toBeGreaterThan(0)
    }
  })

  it("never carries a blank member name", () => {
    for (const project of FALL_PROJECTS) {
      for (const member of project.members) {
        expect(member.trim().length).toBeGreaterThan(0)
      }
    }
  })

  it("builds every project URL from the bare devpost.com domain plus its own id", () => {
    // Individual submissions are on devpost.com/software/<slug>; only the
    // gallery lives on the event subdomain. Tying the URL to the id also stops
    // the two drifting apart in a later edit.
    for (const project of FALL_PROJECTS) {
      expect(project.devpost).toBe(`${DEVPOST_PROJECT_BASE}${project.id}`)
      expect(project.devpost.startsWith("https://devpost.com/software/")).toBe(true)
    }
  })

  it("preserves Devpost display names rather than normalizing them", () => {
    // These look like typos and are not: normalizing them renames real people.
    const members = FALL_PROJECTS.flatMap((project) => project.members)

    for (const name of ["Harsh Jejaria UMC", "Bucky2OP Patil", "sanikhan17 sani", "kat bik"]) {
      expect(members).toContain(name)
    }
  })

  it("keeps the Little Bloom title exactly as submitted", () => {
    const project = FALL_PROJECTS.find((entry) => entry.project.startsWith("Little Bloom"))

    expect(project?.project).toBe("Little Bloom (Project 3)")
  })
})

describe("the gallery link", () => {
  it("uses the Fall event subdomain, not March's", () => {
    // southwest-mn-hacks vs southwestmn-hacks — one hyphen apart, and the
    // March section sits directly below this one on the homepage.
    expect(DEVPOST_FALL_URL).toContain("southwest-mn-hacks")
    expect(DEVPOST_FALL_URL).not.toContain("//southwestmn-hacks")
    expect(DEVPOST_FALL_URL).not.toBe(DEVPOST_SPRING_URL)
  })
})

describe("awards", () => {
  it("is empty until judging is final", () => {
    expect(Object.keys(FALL_AWARDS)).toHaveLength(0)
    expect(getFallWinners()).toEqual([])
  })

  it("only ever references a project that exists", () => {
    // A typo here would silently drop a winner's card from the homepage.
    const ids = new Set(FALL_PROJECTS.map((project) => project.id))

    for (const id of Object.values(FALL_AWARDS)) {
      expect(ids.has(id)).toBe(true)
    }
  })

  it("never gives one project two awards", () => {
    const assigned = Object.values(FALL_AWARDS)

    expect(new Set(assigned).size).toBe(assigned.length)
  })

  it("orders resolved winners by AWARD_ORDER, not object key order", () => {
    // Built deliberately out of order to prove the ordering is not incidental.
    const scrambled: Partial<Record<FallAward, string>> = {
      "Creative Award": FALL_PROJECTS[4].id,
      "2nd Place": FALL_PROJECTS[1].id,
      "1st Place": FALL_PROJECTS[0].id,
    }
    const resolved = AWARD_ORDER.flatMap((award) => {
      const id = scrambled[award]
      if (!id) return []
      const project = FALL_PROJECTS.find((entry) => entry.id === id)
      return project ? [{ award, project }] : []
    })

    expect(resolved.map((entry) => entry.award)).toEqual(["1st Place", "2nd Place", "Creative Award"])
  })

  it("covers the six awards in placing order", () => {
    expect(AWARD_ORDER).toEqual([
      "1st Place",
      "2nd Place",
      "3rd Place",
      "4th Place",
      "5th Place",
      "Creative Award",
    ])
  })
})
