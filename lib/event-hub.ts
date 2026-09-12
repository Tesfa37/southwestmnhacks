// Content for the Event Hub (components/home-record/event-hub.tsx), the
// participant-facing utility section shown on the homepage during the event.
//
// Kept out of JSX because the challenge prompts are long-form prose supplied by
// the sponsor. THE THREE SCHWAN'S PROMPTS ARE VERBATIM AS PROVIDED — do not
// paraphrase, trim, or "tighten" them; they are the brief students are judged
// against. The bonus challenge is likewise as written.

import { DEVPOST_FALL_URL, SUPPORT_EMAIL } from "./config"

export interface ScheduleRow {
  time: string
  activity: string
  /** Marks the submission cutoff so the timeline can accent it. */
  deadline?: boolean
}

export interface ScheduleDay {
  day: string
  date: string
  rows: ScheduleRow[]
}

// Dave, Tanya, Brad, and the organizer remarks all sit inside the 9:00 AM
// opening ceremony — deliberately not broken out into their own rows.
export const SCHEDULE: ScheduleDay[] = [
  {
    day: "Saturday",
    date: "September 12",
    rows: [
      { time: "8:00 AM", activity: "Check-in and breakfast" },
      { time: "9:00 AM", activity: "Opening ceremony" },
      { time: "10:00 AM", activity: "Challenge reveal and hacking begins" },
      { time: "12:00 PM", activity: "Lunch" },
      { time: "6:00 PM", activity: "Dinner" },
      {
        time: "Overnight",
        activity: "Hacking continues, mentor support and designated rest areas",
      },
    ],
  },
  {
    day: "Sunday",
    date: "September 13",
    rows: [
      { time: "8:00 AM", activity: "Devpost submissions due", deadline: true },
      { time: "8:30 AM", activity: "Project demos and judging" },
      { time: "9:30 AM", activity: "Awards ceremony" },
      { time: "10:00 AM", activity: "Event ends" },
    ],
  },
]

export interface Challenge {
  id: string
  title: string
  /** Paragraphs in order. Rendered as separate <p> elements. */
  body: string[]
  /** Optional lead-in sentence for `questions`. */
  questionsIntro?: string
  questions?: string[]
  /** Trailing paragraph after the question list. */
  closing?: string
}

/** The three prompts provided directly by Schwan's. */
export const CHALLENGES: Challenge[] = [
  {
    id: "talent-readiness",
    title: "Talent Readiness & Skills Intelligence Platform",
    body: [
      "Organizations are facing rapid changes in technology, automation, AI, and workforce expectations. Yet many leaders lack visibility into the skills that exist within their workforce, the capabilities they will need in the future, and the risks created by knowledge concentration, skill shortages, and succession gaps.",
      "Build a solution that helps organizations understand current workforce capabilities, identify critical skill and knowledge gaps, assess future talent needs, and accelerate workforce readiness through targeted development recommendations.",
    ],
    questionsIntro: "The platform should help answer questions such as:",
    questions: [
      "What skills and competencies exist across our workforce today?",
      "What skills will be needed to support future business and technology strategies?",
      "Which critical skills are concentrated in only a few individuals?",
      "Where are our greatest capability gaps and succession risks?",
      "How can employees close skill gaps through training, mentoring, certifications, job rotations, or project experiences?",
    ],
    closing:
      "Solutions may include skills inventories, talent heat maps, AI-powered career development advisors, workforce readiness dashboards, personalized learning plans, knowledge transfer tools, or predictive analytics that help leaders build a workforce prepared for tomorrow's challenges.",
  },
  {
    id: "ai-use-case-generator",
    title: "AI Use Case Generator",
    body: [
      "Many organizations want to use AI but struggle to identify where it can create value. Build a tool that interviews business users, understands their processes and challenges, then recommends specific AI use cases with estimated benefits, risks, and implementation complexity.",
    ],
  },
  {
    id: "childcare-availability-finder",
    title: "Childcare Availability Finder",
    body: [
      "Many families struggle to locate available childcare providers in the community. Build a solution that aggregates childcare availability, age openings, waitlist information, and provider details into a simple, searchable experience.",
    ],
  },
]

/**
 * Optional extra, not a fourth requirement and not an add-on to another
 * challenge. Rendered apart from CHALLENGES so that reads visually.
 */
export const BONUS_CHALLENGE: Challenge = {
  id: "rfid-qr-led",
  title: "RFID + QR + LED Interactive System",
  body: [
    "Using RFID, a QR code scanner, and LEDs, create an interactive system where scanning or identifying something triggers a meaningful physical response.",
    "Your solution could explore identification, access control, tracking, status indicators, check-ins, games, alerts, or another creative use. The LEDs should communicate useful information or react meaningfully to what is scanned or detected.",
    "There is no single correct solution. Use the hardware creatively and build something that demonstrates a clear interaction between the digital and physical world.",
  ],
}

export const BONUS_NOTE = "Bonus Challenge: An opportunity to compete for the Creative Award."

/** What a Devpost submission should contain. */
export const SUBMISSION_CHECKLIST = [
  "Project name and description",
  "Challenge selection",
  "Project link, such as GitHub, live demo, or video walkthrough",
  "Screenshots or demo video",
  "Team members",
]

export interface QuickLink {
  label: string
  href: string
  /** Set for off-site destinations so the link opens in a new tab. */
  external?: boolean
}

// Every target is a page that already exists — the hub routes onward rather
// than restating /resources, /rules, or the Code of Conduct.
export const QUICK_LINKS: QuickLink[] = [
  { label: "Devpost", href: DEVPOST_FALL_URL, external: true },
  { label: "Participant resources", href: "/resources" },
  { label: "Code of conduct", href: "/code-of-conduct" },
  { label: "Event rules", href: "/rules" },
  { label: "Safety & overnight", href: "/safety" },
  { label: "Contact organizers", href: `mailto:${SUPPORT_EMAIL}`, external: true },
]
