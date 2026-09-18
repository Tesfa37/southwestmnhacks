import Image from "next/image"
import { EvidenceStamp } from "@/components/home-record/evidence-stamp"
import { ACTION_PILL, CARD_TITLE, MUTED } from "@/components/home-record/tokens"
import { BLUR_DATA_URL } from "@/lib/images"
import type { FallProject } from "@/lib/fall-2026"

/**
 * One project card shape shared by the homepage Fall results section and the
 * permanent /projects page, so a project looks identical everywhere it appears
 * apart from its award stamp.
 *
 * `photo` is optional throughout: winner photographs generally do not exist on
 * the day, and a missing image must render a neutral box rather than a broken
 * one or a collapsed card.
 */
export function ProjectCard({ project, award }: { project: FallProject; award?: string }) {
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
