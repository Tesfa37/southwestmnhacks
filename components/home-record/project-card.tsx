import Image from "next/image"
import { EvidenceStamp } from "@/components/home-record/evidence-stamp"
import { ACTION_PILL, CARD_TITLE, MUTED } from "@/components/home-record/tokens"
import { BLUR_DATA_URL } from "@/lib/images"

/** The only fields this card actually reads — any event's project data works. */
export interface ProjectCardData {
  project: string
  members: string[]
  devpost: string
  photo?: string
}

/**
 * One project card shape shared across every project listing (the homepage
 * Fall results preview and the permanent, multi-event /projects page), so a
 * project looks identical everywhere it appears apart from its award stamp.
 *
 * `eventLabel` defaults to "Fall 2026" so existing call sites that don't pass
 * it (the homepage) keep behaving exactly as before; /projects passes the
 * correct label per event section.
 *
 * `photo` is optional throughout: winner photographs generally do not exist on
 * the day, and a missing image must render a neutral box rather than a broken
 * one or a collapsed card.
 *
 * `showPhoto` (default true) lets a listing suppress photos uniformly even for
 * projects that have one — /projects does this, so all 22 cards share one
 * shape instead of the 5 with photos looking different from the 17 without.
 */
export function ProjectCard({
  project,
  award,
  eventLabel = "Fall 2026",
  showPhoto = true,
}: {
  project: ProjectCardData
  award?: string
  eventLabel?: string
  showPhoto?: boolean
}) {
  return (
    <figure className="flex flex-col rounded-xl bg-[#FAFAF8] ring-1 ring-gray-200 overflow-hidden">
      {showPhoto && project.photo ? (
        <div className="relative aspect-video">
          <Image
            src={project.photo}
            alt={`${project.project} at Southwest MN Hacks ${eventLabel}`}
            fill
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <figcaption className="flex flex-col flex-1 p-6">
        <EvidenceStamp>{award ? `${award} · ${eventLabel}` : `${eventLabel} · SMSU`}</EvidenceStamp>
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
