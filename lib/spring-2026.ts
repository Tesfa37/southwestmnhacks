// Spring 2026 (March 21, 2026) submissions — Southwest MN Hacks' first event.
//
// Member names are DEVPOST DISPLAY NAMES, transcribed exactly as submitted —
// not registration names, same convention as lib/fall-2026.ts. The five
// placing teams' data (id/project/members/devpost/photo/placement) matches
// components/winners.tsx (the /events/spring-2026 recap) exactly, on purpose.
// The other five teams (no placement) were sourced from their individual
// Devpost pages, since the site never carried their data anywhere before.

import { DEVPOST_PROJECT_BASE } from "./fall-2026"

export interface SpringProject {
  /** The Devpost slug: already stable and unique, so it needs no second id. */
  id: string
  project: string
  members: string[]
  /** Always https://devpost.com/software/<id> — see DEVPOST_PROJECT_BASE. */
  devpost: string
  photo?: string
  placement?: "1st Place" | "2nd Place" | "3rd Place" | "4th Place" | "5th Place"
}

export const EXPECTED_SPRING_PROJECT_COUNT = 10

/** All 10 submissions, placing teams first in placement order. */
export const SPRING_PROJECTS: SpringProject[] = [
  {
    id: "it-budgeting-and-forecasting",
    project: "IT Budget Strategist",
    members: ["Pradunna Pudasaini", "Sarthak Adhikari", "Luis Miguel Heyaime Bayonet"],
    devpost: `${DEVPOST_PROJECT_BASE}it-budgeting-and-forecasting`,
    photo: "/images/1st-place.jpg",
    placement: "1st Place",
  },
  {
    id: "horizon-8i3u2h",
    project: "Horizon",
    members: ["Sebastian Batista Ferrera", "Noel Hernandez", "Aidan Pereyra", "Diego Vicente Bello Polanco"],
    devpost: `${DEVPOST_PROJECT_BASE}horizon-8i3u2h`,
    photo: "/images/2nd-place.jpg",
    placement: "2nd Place",
  },
  {
    id: "knowledgeflow",
    project: "KnowledgeFlow",
    members: ["Biruk Ayalew", "Ebunoluwa Shokefun", "Kaleab Debela"],
    devpost: `${DEVPOST_PROJECT_BASE}knowledgeflow`,
    photo: "/images/3rd-place.jpg",
    placement: "3rd Place",
  },
  {
    id: "it-budgeting-and-forecasting-software-6qvnm8",
    project: "IT Budgeting and Forecasting Software",
    members: ["Abenezer Legesse", "Esrom Tadesse"],
    devpost: `${DEVPOST_PROJECT_BASE}it-budgeting-and-forecasting-software-6qvnm8`,
    photo: "/images/4th-place.jpg",
    placement: "4th Place",
  },
  {
    id: "splendit",
    project: "SplendIT",
    members: ["Hemi Woertink", "Noah Blodgett", "Seeton Erickson"],
    devpost: `${DEVPOST_PROJECT_BASE}splendit`,
    photo: "/images/5th-place.jpg",
    placement: "5th Place",
  },
  {
    id: "it-budgeting-software",
    project: "IT Budgeting Software",
    members: ["Austin Coudron", "Kamoren Bomgaars", "Liam Beyer"],
    devpost: `${DEVPOST_PROJECT_BASE}it-budgeting-software`,
  },
  {
    id: "tangerine-dream",
    project: "Tangerine Dream",
    members: ["Nilesh Saumyadasa", "Mohammed Omar", "Samweli Yoweli", "Ian Riley"],
    devpost: `${DEVPOST_PROJECT_BASE}tangerine-dream`,
  },
  {
    id: "it-budgeting-calculator",
    project: "IT Budgeting Calculator",
    members: ["Brady Cronen", "Nawaf A"],
    devpost: `${DEVPOST_PROJECT_BASE}it-budgeting-calculator`,
  },
  {
    // Devpost's "Created by" section lists only this one name. The actual team
    // may have had more members who simply weren't added as Devpost
    // collaborators — using the public record as-is rather than guessing.
    id: "schwan-s-strategic-it-procurement-dashboard",
    project: "Schwan's Strategic IT Procurement Dashboard",
    members: ["Shenal Peries"],
    devpost: `${DEVPOST_PROJECT_BASE}schwan-s-strategic-it-procurement-dashboard`,
  },
  {
    id: "synapse-rsbklx",
    project: "Synapze",
    members: ["Henok Asfaw", "Franklin Roa Guerrero", "Wachamuli Richiez Rijo"],
    devpost: `${DEVPOST_PROJECT_BASE}synapse-rsbklx`,
  },
]

// The March event ran 12 hours, not 24 (that's Fall's format) — see
// components/event-recap.tsx.
export const SPRING_STATS = {
  hours: 12,
  teams: EXPECTED_SPRING_PROJECT_COUNT,
  projects: EXPECTED_SPRING_PROJECT_COUNT,
}
