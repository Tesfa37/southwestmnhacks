import Image from "next/image"
import { Reveal } from "@/components/reveal"
import { EvidenceStamp } from "@/components/home-record/evidence-stamp"
import { ACTION_PILL, CARD_TITLE, DISPLAY, MUTED } from "@/components/home-record/tokens"
import { BLUR_DATA_URL } from "@/lib/images"
import { DEVPOST_FALL_URL } from "@/lib/config"
import { FALL_PROJECTS, getFallWinners, type FallProject } from "@/lib/fall-2026"

const GALLERY_URL = `${DEVPOST_FALL_URL}project-gallery`

/**
 * One card shape for every case, so a project looks identical in the winners
 * list and the full list apart from its stamp.
 *
 * `photo` is optional throughout: winner photographs generally do not exist on
 * the day, and a missing image must render a neutral box rather than a broken
 * one or a collapsed card.
 */
function ProjectCard({ project, award }: { project: FallProject; award?: string }) {
  return (
    <figure className="flex flex-col rounded-xl bg-[#FAFAF8] ring-1 ring-gray-200 overflow-hidden">
      {project.photo ? (
        <div className="relative aspect-video">
          <Image
            src={project.photo}
            alt={`${project.project} at Southwest MN Hacks Fall 2026`}
            fill
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <figcaption className="flex flex-col flex-1 p-6">
        <EvidenceStamp>{award ? `${award} · Fall 2026` : "Fall 2026 · SMSU"}</EvidenceStamp>
        <h3 className={`${CARD_TITLE} text-xl font-extrabold mt-2`}>{project.project}</h3>
        <p className={`text-sm ${MUTED} mb-4 mt-1 flex-1`}>{project.members.join(", ")}</p>
        <a
          href={project.devpost}
          target="_blank"
          rel="noopener noreferrer"
          className={`${ACTION_PILL} w-fit`}
        >
          Project on Devpost
        </a>
      </figcaption>
    </figure>
  )
}

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
 * forget and no parallel winners array to drift out of sync. Assigning six ids
 * in FALL_AWARDS is the whole announcement.
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
            {announced && (
              <Reveal delay={0.05}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
                  {winners.map(({ award, project }) => (
                    <ProjectCard key={`${award}-${project.id}`} project={project} award={award} />
                  ))}
                </div>
              </Reveal>
            )}

            <Reveal delay={0.1}>
              {announced && (
                <h3 className={`${CARD_TITLE} text-xl font-extrabold mb-6`}>All Fall 2026 projects</h3>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {FALL_PROJECTS.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>

              <GalleryLink className="mt-6" />
            </Reveal>
          </>
        )}
      </div>
    </section>
  )
}
