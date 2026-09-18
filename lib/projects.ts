// Shared cross-event project directory for /projects. Adapts each event's own
// data module (lib/fall-2026.ts, lib/spring-2026.ts) into one list without
// altering either module's existing shape or tests — adding a future event
// means a new lib/<event>.ts file, one EVENT_LABELS entry, and one line here.

import { FALL_PROJECTS, FALL_AWARDS, AWARD_ORDER } from "./fall-2026"
import { SPRING_PROJECTS } from "./spring-2026"

export type EventSlug = "fall-2026" | "spring-2026"

export const EVENT_LABELS: Record<EventSlug, string> = {
  "fall-2026": "Fall 2026",
  "spring-2026": "Spring 2026",
}

export interface UnifiedProject {
  id: string
  event: EventSlug
  project: string
  members: string[]
  devpost: string
  photo?: string
  /** Display stamp text, e.g. "1st Place" or "Creative Award". */
  placement?: string
}

/**
 * Fall's awards are keyed award -> project id (a project can hold two awards,
 * e.g. Skillbridge holds both 4th Place and the Creative Award). This resolves
 * the reverse direction for display: id -> its first award in AWARD_ORDER.
 */
function fallPlacementFor(id: string): string | undefined {
  return AWARD_ORDER.find((award) => FALL_AWARDS[award] === id)
}

/** Every submitted project across every event. Newest event first. */
export function getAllProjects(): UnifiedProject[] {
  const fall: UnifiedProject[] = FALL_PROJECTS.map((p) => ({
    id: p.id,
    event: "fall-2026",
    project: p.project,
    members: p.members,
    devpost: p.devpost,
    photo: p.photo,
    placement: fallPlacementFor(p.id),
  }))

  const spring: UnifiedProject[] = SPRING_PROJECTS.map((p) => ({
    id: p.id,
    event: "spring-2026",
    project: p.project,
    members: p.members,
    devpost: p.devpost,
    photo: p.photo,
    placement: p.placement,
  }))

  return [...fall, ...spring]
}
