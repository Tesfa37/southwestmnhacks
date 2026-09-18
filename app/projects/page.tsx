import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProjectCard } from "@/components/home-record/project-card"
import { DEVPOST_FALL_URL } from "@/lib/config"
import { FALL_PROJECTS, FALL_AWARDS, type FallAward } from "@/lib/fall-2026"

export const metadata: Metadata = {
  alternates: { canonical: "/projects" },
  title: "Projects",
  description:
    "Every project submitted to Southwest MN Hacks: Fall 2026 — 12 teams, 24 hours, real code. Browse the archive or open any project on Devpost.",
}

const GALLERY_URL = `${DEVPOST_FALL_URL}project-gallery`

// Reverse lookup: project id -> the award it holds, if any. A project can only
// ever key one entry here even though FALL_AWARDS can point two award keys at
// the same id (Skillbridge) — the card only needs its "best" stamp.
function awardForProject(id: string): FallAward | undefined {
  return (Object.entries(FALL_AWARDS) as [FallAward, string][]).find(([, projectId]) => projectId === id)?.[0]
}

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF8]">
      <Header />
      <main id="main" className="flex-1">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-10">
          <p className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] text-[#5B6472] mb-3">
            Fall 2026 &middot; SMSU
          </p>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl font-black tracking-tight mb-4 max-w-3xl">
            Everything built at Southwest MN Hacks.
          </h1>
          <p className="text-lg text-[#5B6472] max-w-2xl">
            Twelve teams shipped a project in 24 hours. Every one of them is real, working software with a public
            Devpost page — browse them here, or see the full{" "}
            <a
              href={GALLERY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2"
            >
              Fall 2026 Devpost gallery
            </a>
            .
          </p>
        </section>

        <section aria-label="Fall 2026 project directory" className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FALL_PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} award={awardForProject(project.id)} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
