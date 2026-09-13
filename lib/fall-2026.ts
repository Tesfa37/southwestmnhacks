// Fall 2026 judging panel and submissions.
//
// Projects are canonical; awards only point at them by id. Nothing about a
// project is ever duplicated into an award, so announcing winners cannot leave
// a team's members or link disagreeing with the same team's card further down
// the page.
//
// Member names are DEVPOST DISPLAY NAMES, transcribed exactly as submitted —
// not registration names. Do not "tidy" them: normalising a display name
// quietly renames a real participant.

export interface Judge {
  name: string
  role: string
  /** Absent → the card renders `initials` as a monogram instead. */
  photo?: string
  initials?: string
}

// Hand-picked order, like PARTNERS in lib/sponsors/partners.ts. Do not sort.
export const FALL_JUDGES: Judge[] = [
  {
    name: "Alex Polfliet",
    role: "Senior Software Engineer, Amazon",
    initials: "AP",
  },
  {
    // "Prof." prefix and the exact role string match how he is already
    // published in record-people.tsx and appreciation.tsx. One person must not
    // carry two different titles across the site; a test pins this.
    name: "Prof. Oluleye Babatunde",
    role: "Assistant Professor of Computer Science, SMSU",
    photo: "/images/babatunde.jpg",
  },
  {
    name: "Mandar Chaudhari",
    role: "Full-Stack and Machine Learning Engineer",
    initials: "MC",
  },
]

export interface FallProject {
  /** The Devpost slug: already stable and unique, so it needs no second id. */
  id: string
  project: string
  members: string[]
  /** Always https://devpost.com/software/<id> — see DEVPOST_PROJECT_BASE. */
  devpost: string
  photo?: string
}

/**
 * Individual submissions live on the bare devpost.com domain. Only the event
 * GALLERY is on southwest-mn-hacks.devpost.com — mixing the two up is the
 * easiest mistake on this page, so the base is a constant and a test asserts
 * every project URL is this base plus that project's own id.
 */
export const DEVPOST_PROJECT_BASE = "https://devpost.com/software/"

export const EXPECTED_FALL_PROJECT_COUNT = 12

/** All 12 submissions. Canonical — awards resolve against this array. */
export const FALL_PROJECTS: FallProject[] = [
  {
    id: "alignt",
    project: "Alignt",
    members: ["Ranjan Khadka", "Alina Ivashchenko", "Ayush Singh", "Asli Oktay"],
    devpost: `${DEVPOST_PROJECT_BASE}alignt`,
  },
  {
    id: "askbusi",
    project: "AskBusi",
    members: ["Erin Gullickson", "Harsh Jejaria UMC", "Aaron Kraska", "Ava Edwards"],
    devpost: `${DEVPOST_PROJECT_BASE}askbusi`,
  },
  {
    // Title kept exactly as submitted, parenthetical included. Trimming it
    // would be reinterpreting a team's own project title on a guess.
    id: "test-15ymhl",
    project: "Little Bloom (Project 3)",
    members: ["Stephen Schutte", "Sabina Gurung", "Tamima Rashid", "Gustavo La Cruz"],
    devpost: `${DEVPOST_PROJECT_BASE}test-15ymhl`,
  },
  {
    id: "will-name-it-later-n7daxl",
    project: "Bridgeline",
    members: ["Ali Muhammad Nathani", "Bucky2OP Patil", "sanikhan17 sani", "Lexi Weems"],
    devpost: `${DEVPOST_PROJECT_BASE}will-name-it-later-n7daxl`,
  },
  {
    id: "skillscope-ai",
    project: "Skillscope",
    members: [
      "Diushen Cabrera Perez",
      "Josephine Rosario",
      "Jose E Garcia",
      "Luis Miguel Heyaime Bayonet",
    ],
    devpost: `${DEVPOST_PROJECT_BASE}skillscope-ai`,
  },
  {
    id: "sunny-days-childcare",
    project: "Sunny Days Childcare",
    members: ["Nawaf A", "Brady Cronen", "Ambar Pichardo"],
    devpost: `${DEVPOST_PROJECT_BASE}sunny-days-childcare`,
  },
  {
    id: "skillbridge-1if6sq",
    project: "Skillbridge",
    members: ["Henok Asfaw", "Shenal Peries", "Esrom Mulugeta", "Abenezer Legesse"],
    devpost: `${DEVPOST_PROJECT_BASE}skillbridge-1if6sq`,
  },
  {
    id: "talentreadiness",
    project: "TalentReadiness",
    members: ["Sujal Rao"],
    devpost: `${DEVPOST_PROJECT_BASE}talentreadiness`,
  },
  {
    id: "skillsight",
    project: "SkillSight",
    members: ["Ajay A"],
    devpost: `${DEVPOST_PROJECT_BASE}skillsight`,
  },
  {
    id: "talent-radar-tceosh",
    project: "Talent Radar",
    members: ["Alex Miller", "Raman Dahal", "kat bik", "Kiran Giri"],
    devpost: `${DEVPOST_PROJECT_BASE}talent-radar-tceosh`,
  },
  {
    id: "keystone-39f7dp",
    project: "Keystone",
    members: ["Marco Perozo", "Matias Birbuet", "Abdul Mughees", "Saishal Shrestha"],
    devpost: `${DEVPOST_PROJECT_BASE}keystone-39f7dp`,
  },
  {
    id: "foresight-4dwhsb",
    project: "Foresight",
    members: ["Anirudra J Rayamajhi", "Aashish Gaire", "Ayush Gaire", "Bibek Subedi"],
    devpost: `${DEVPOST_PROJECT_BASE}foresight-4dwhsb`,
  },
]

export type FallAward =
  | "1st Place"
  | "2nd Place"
  | "3rd Place"
  | "4th Place"
  | "5th Place"
  | "Creative Award"

/**
 * Display order. A module constant rather than object key order, which is not
 * something a public results list should depend on.
 */
export const AWARD_ORDER: FallAward[] = [
  "1st Place",
  "2nd Place",
  "3rd Place",
  "4th Place",
  "5th Place",
  "Creative Award",
]

/**
 * Award → FallProject["id"]. EMPTY until judging is final; assigning ids here
 * is the entire announcement. There is no separate "announced" flag and no
 * second winners array: the site derives both from getFallWinners().
 */
export const FALL_AWARDS: Partial<Record<FallAward, string>> = {}

/**
 * Awards resolved against FALL_PROJECTS, in AWARD_ORDER.
 *
 * An id that matches no project is dropped rather than thrown — a typo should
 * cost one card, not the homepage. The test suite catches the typo first.
 */
export function getFallWinners(): { award: FallAward; project: FallProject }[] {
  return AWARD_ORDER.flatMap((award) => {
    const id = FALL_AWARDS[award]
    if (!id) return []
    const project = FALL_PROJECTS.find((entry) => entry.id === id)
    return project ? [{ award, project }] : []
  })
}
