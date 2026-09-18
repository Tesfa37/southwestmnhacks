import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProjectListRow } from "@/components/home-record/project-list-row"
import { DEVPOST_FALL_URL, DEVPOST_SPRING_URL } from "@/lib/config"
import { getAllProjects, EVENT_LABELS, type EventSlug } from "@/lib/projects"

export const metadata: Metadata = {
  alternates: { canonical: "/projects" },
  title: "Projects",
  description:
    "Every project submitted across Southwest MN Hacks events — Fall 2026 and Spring 2026. Browse the archive or open any project on Devpost.",
}

// Newest first. Add an entry here (plus a new lib/<event>.ts data module and
// an EVENT_LABELS entry) after each future event.
const EVENT_SECTIONS: { event: EventSlug; date: string; galleryUrl: string; intro: string }[] = [
  {
    event: "fall-2026",
    date: "September 12–13, 2026",
    galleryUrl: `${DEVPOST_FALL_URL}project-gallery`,
    intro:
      "Twelve teams shipped a project in 24 hours. Every one of them is real, working software with a public Devpost page.",
  },
  {
    event: "spring-2026",
    date: "March 21, 2026",
    galleryUrl: `${DEVPOST_SPRING_URL}project-gallery`,
    intro: "Ten teams built in 12 hours at Southwest MN Hacks' first-ever event.",
  },
]

export default function ProjectsPage() {
  const allProjects = getAllProjects()

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF8]">
      <Header />
      <main id="main" className="flex-1">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-10">
          <p className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] text-[#5B6472] mb-3">
            All events &middot; SMSU
          </p>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl font-black tracking-tight mb-4 max-w-3xl">
            Everything built at Southwest MN Hacks.
          </h1>
          <p className="text-lg text-[#5B6472] max-w-2xl">
            Every project our teams have submitted, across every event, in one place.
          </p>
        </section>

        {EVENT_SECTIONS.map((section) => {
          const projects = allProjects.filter((p) => p.event === section.event)
          if (projects.length === 0) return null
          const label = EVENT_LABELS[section.event]

          return (
            <section
              key={section.event}
              aria-label={`${label} project directory`}
              className="max-w-6xl mx-auto px-4 sm:px-6 pb-16"
            >
              <div className="mb-8 max-w-2xl border-t border-gray-200 pt-10">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#5B6472] mb-2">
                  {label} &middot; {section.date}
                </p>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">{label} projects</h2>
                <p className="text-base text-[#5B6472]">
                  {section.intro}{" "}
                  <a
                    href={section.galleryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2"
                  >
                    See the {label} Devpost gallery
                  </a>
                  .
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12">
                {projects.map((project) => (
                  <ProjectListRow key={project.id} project={project} award={project.placement} eventLabel={label} />
                ))}
              </div>
            </section>
          )
        })}
      </main>
      <Footer />
    </div>
  )
}
