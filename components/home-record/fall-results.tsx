import Link from "next/link"
import { Reveal } from "@/components/reveal"
import { ProjectCard } from "@/components/home-record/project-card"
import { ACTION_PILL, DISPLAY, MUTED } from "@/components/home-record/tokens"
import { DEVPOST_FALL_URL } from "@/lib/config"
import { FALL_PROJECTS, getFallWinners } from "@/lib/fall-2026"

const GALLERY_URL = `${DEVPOST_FALL_URL}project-gallery`

function GalleryLink({ className = "" }: { className?: string }) {
  return (
    <p className={`text-sm ${MUTED} ${className}`}>
      Every submission is on the{" "}
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
  )
}

/**
 * Fall 2026 results, above the March section.
 *
 * Announced state is derived from getFallWinners() — there is no flag to
 * forget and no parallel winners array to drift out of sync. Assigning ids
 * in FALL_AWARDS is the whole announcement.
 *
 * This section only previews the winners; the full 12-project directory lives
 * on the permanent /projects page rather than being dumped here in full.
 */
export function FallResults() {
  const winners = getFallWinners()
  const announced = winners.length > 0

  return (
    <section aria-label="Fall 2026 projects and results" className="bg-white border-y border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <Reveal>
          <div className="mb-10 max-w-2xl">
            <p className={`font-mono text-xs font-semibold uppercase tracking-[0.14em] ${MUTED} mb-3`}>
              Fall 2026
            </p>
            <h2 className={`${DISPLAY} text-3xl sm:text-4xl font-black mb-3`}>
              {announced ? "Fall 2026 winners." : "Projects from this weekend."}
            </h2>
            <p className={`text-lg ${MUTED}`}>
              {announced
                ? "Judged by the panel above. Every project links to its public Devpost page."
                : "Every team that shipped this weekend, with their public Devpost page."}
            </p>
          </div>
        </Reveal>

        {/* Defensive only: not a state that ships while FALL_PROJECTS is populated. */}
        {FALL_PROJECTS.length === 0 ? (
          <Reveal delay={0.1}>
            <a href={GALLERY_URL} target="_blank" rel="noopener noreferrer" className={ACTION_PILL}>
              View all submissions on Devpost
            </a>
          </Reveal>
        ) : (
          <>
            {announced ? (
              <Reveal delay={0.05}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {winners.map(({ award, project }) => (
                    <ProjectCard key={`${award}-${project.id}`} project={project} award={award} />
                  ))}
                </div>
              </Reveal>
            ) : (
              <Reveal delay={0.05}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {FALL_PROJECTS.slice(0, 3).map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </Reveal>
            )}

            <Reveal delay={0.1}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link href="/projects" className={ACTION_PILL}>
                  Browse all {FALL_PROJECTS.length} projects
                </Link>
                <GalleryLink />
              </div>
            </Reveal>
          </>
        )}
      </div>
    </section>
  )
}
