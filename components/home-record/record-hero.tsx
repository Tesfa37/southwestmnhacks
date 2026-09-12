import Image from "next/image"
import Link from "next/link"
import { Reveal } from "@/components/reveal"
import { RecordHeroCopy } from "@/components/home-record/record-hero-copy"
import { EvidenceStamp } from "@/components/home-record/evidence-stamp"
import { MUTED } from "@/components/home-record/tokens"
import { BLUR_DATA_URL } from "@/lib/images"
import { VENUE_MAP_URL } from "@/lib/config"
import type { EventPhase } from "@/lib/event-phase"

// Daylight hero: the headline states the thesis in plain type, and the group
// photo sits directly below it as Exhibit A, carrying the first evidence
// stamp on a translucent paper panel.
export function RecordHero({ phase }: { phase: EventPhase }) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-10">
      <Reveal>
        <p className={`font-mono text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] ${MUTED} mb-5`}>
          Sept 12 to 13, 2026 ·{" "}
          <a
            href={VENUE_MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-[#14181F] transition-colors"
          >
            SMSU, Marshall, MN
          </a>
        </p>

        {/* Headline, supporting line, and actions live in a client island so
            they swap the instant the event goes live, without a refresh. */}
        <RecordHeroCopy initialPhase={phase} />
      </Reveal>

      {/* Exhibit A: the March group photo with the first stamp. */}
      <Reveal delay={0.1}>
        <figure className="relative overflow-hidden rounded-xl">
          <div className="relative aspect-[3/2] sm:aspect-[2/1] lg:aspect-[21/9]">
            <Image
              src="/images/group-photo.jpg"
              alt="All participants of the March 2026 Southwest MN Hacks gathered at SMSU"
              fill
              priority
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              sizes="(max-width: 1152px) 100vw, 1104px"
              className="object-cover object-[50%_40%]"
            />
          </div>
          <figcaption className="sm:absolute sm:bottom-4 sm:left-4 sm:max-w-md bg-white/85 backdrop-blur-sm ring-1 ring-black/5 sm:rounded-lg p-4">
            <EvidenceStamp>Mar 21, 2026 · Upper Conference Center, SMSU</EvidenceStamp>
            <p className={`mt-1.5 text-sm ${MUTED} leading-relaxed`}>
              All of us at the first Southwest MN Hacks. Every photo on this page is from that night.{" "}
              <Link
                href="/recap"
                className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2"
              >
                Read the recap
              </Link>
            </p>
          </figcaption>
        </figure>
      </Reveal>
    </section>
  )
}
