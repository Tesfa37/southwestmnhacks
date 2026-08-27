// Verifiable facts from the March 2026 event, used by the homepage stats strip.
// Only publish numbers that are backed by the recap or Devpost. value: null
// entries are hidden until the real number is confirmed, so a future attendee
// count can drop in without touching the component.

export interface EventStat {
  value: string | null
  label: string
}

export const MARCH_2026_STATS: EventStat[] = [
  { value: "10", label: "teams competed" },
  { value: "10", label: "projects shipped to Devpost" },
  { value: "1", label: "team hired by Schwan's after the event" },
  { value: null, label: "student hackers" },
]

// Shown as text, not a count: the recap lists these schools plus "other
// institutions", so a hard number would be a guess.
export const MARCH_2026_SCHOOLS_LINE =
  "Students came from SMSU, SDSU, Marshall High School, and other schools across the region."
