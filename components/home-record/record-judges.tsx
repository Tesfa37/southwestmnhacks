import Image from "next/image"
import { Reveal } from "@/components/reveal"
import { CARD_TITLE, DISPLAY, MUTED } from "@/components/home-record/tokens"
import { BLUR_DATA_URL } from "@/lib/images"
import { FALL_JUDGES } from "@/lib/fall-2026"

/**
 * The Fall 2026 judging panel.
 *
 * Card chrome matches record-people.tsx, but with no EvidenceStamp: per
 * CLAUDE.md that mark belongs on genuine artifacts, and record-people earns it
 * with dated March photographs. A roster of names is not an artifact — and
 * Babatunde's only photo is from March, so stamping it here would date a Fall
 * section March 2026.
 */
export function RecordJudges() {
  return (
    <section aria-label="Fall 2026 judging panel" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <Reveal>
        <div className="mb-10 max-w-2xl">
          <p className={`font-mono text-xs font-semibold uppercase tracking-[0.14em] ${MUTED} mb-3`}>
            The panel
          </p>
          <h2 className={`${DISPLAY} text-3xl sm:text-4xl font-black mb-3`}>Who judged Fall 2026.</h2>
          <p className={`text-lg ${MUTED}`}>
            Industry engineers and faculty reviewed every submission and picked the winners — including Babatunde,
            back on the panel since mentoring and judging the very first event in March.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FALL_JUDGES.map((judge) => (
            <figure key={judge.name} className="rounded-xl bg-white ring-1 ring-gray-200 overflow-hidden">
              {/* Same aspect box whichever way it is filled, so a photo card and
                  a monogram card are exactly the same height side by side.
                  4:3, not 16:9: Alex and Mandar's photos are square headshots,
                  and a 16:9 crop of a square image only keeps its center 56% —
                  a visibly tight, zoomed-in crop. 4:3 keeps 75%, a normal-looking
                  headshot crop, while still cropping Babatunde's wide event
                  photo (2400x1119) reasonably on the sides. */}
              <div className="relative aspect-[4/3]">
                {judge.photo ? (
                  <Image
                    src={judge.photo}
                    alt={`${judge.name}, Fall 2026 judge`}
                    fill
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  // Decoration: the name is already the heading below, so the
                  // initials must not be announced a second time.
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center bg-[#FAFAF8]"
                  >
                    <span className={`${DISPLAY} text-4xl font-black ${MUTED}`}>{judge.initials}</span>
                  </div>
                )}
              </div>
              <figcaption className="p-6">
                <h3 className={`${CARD_TITLE} text-xl font-extrabold`}>{judge.name}</h3>
                <p className={`text-sm ${MUTED} mt-1`}>{judge.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
