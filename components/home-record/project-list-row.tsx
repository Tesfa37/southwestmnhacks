import { EvidenceStamp } from "@/components/home-record/evidence-stamp"
import { CARD_TITLE, MUTED } from "@/components/home-record/tokens"
import type { ProjectCardData } from "@/components/home-record/project-card"

/**
 * A photo-free row treatment for the /projects archive, where 22+ entries as
 * photo cards would mean mostly empty gray boxes (only 5 of 22 submissions
 * have a photo at all) or a generic repeated-card grid. Reads as an index
 * entry in the site's existing "Record" archival language (EvidenceStamp,
 * the same title/body tokens as every other card) rather than a new look.
 */
export function ProjectListRow({
  project,
  award,
  eventLabel = "Fall 2026",
}: {
  project: ProjectCardData
  award?: string
  eventLabel?: string
}) {
  return (
    <article className="py-5 border-b border-gray-200">
      <EvidenceStamp>{award ? `${award} · ${eventLabel}` : `${eventLabel} · SMSU`}</EvidenceStamp>
      <h3 className={`${CARD_TITLE} text-lg sm:text-xl font-extrabold mt-1.5`}>{project.project}</h3>
      <p className={`text-sm ${MUTED} mt-1`}>{project.members.join(", ")}</p>
      <a
        href={project.devpost}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2"
      >
        Project on Devpost
      </a>
    </article>
  )
}
