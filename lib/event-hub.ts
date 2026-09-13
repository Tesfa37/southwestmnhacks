// Content for the Event Hub (components/home-record/event-hub.tsx), the
// participant-facing utility section shown on the homepage during the event.
//
// Kept out of JSX because the challenge prompts are long-form prose supplied by
// the sponsor. THE THREE SCHWAN'S PROMPTS ARE VERBATIM AS PROVIDED — do not
// paraphrase, trim, or "tighten" them; they are the brief students are judged
// against. The bonus challenge is likewise as written.
//
// The bonus was rewritten mid-event: the RFID/QR hardware hit technical and
// networking limits, so the challenge is now built around the LED display that
// does work, with the other hardware explicitly optional.

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
      { time: "8:00–9:00 AM", activity: "Judges review submitted projects" },
      { time: "9:00 AM", activity: "Participant presentations begin" },
      // Relative, not clocked: presentations start at 9:00, so promising a
      // fixed awards time would be a promise broken in front of the room.
      { time: "After presentations", activity: "Awards" },
      { time: "After awards", activity: "Event concludes" },
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
  id: "interactive-led-display",
  title: "Interactive LED Display",
  body: [
    "The LED display is live and available for teams to build with.",
    "Create a project where something happening in your application causes a meaningful message, status, alert, result, or other output to appear on the event LED display.",
    "Your project itself can be anything: a web application, game, check-in system, dashboard, notification system, competition, voting tool, AI application, or another creative idea. The LED should be a meaningful part of the experience rather than simply displaying static text.",
    // Do not trim this paragraph. It is the one that tells a team who has spent
    // the night fighting the reader that they are not being marked down for it.
    "RFID and QR integration are optional. We originally planned for the challenge to include RFID and QR hardware, but we experienced technical and networking limitations with parts of that setup during the event. You will not be penalized for not using them. If you are able to incorporate RFID, QR scanning, or another physical interaction successfully, that can be part of your solution.",
    "The goal is to demonstrate a creative connection between your software and the physical LED display.",
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
