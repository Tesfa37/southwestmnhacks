import Image from "next/image"
import Link from "next/link"
import { Reveal } from "@/components/reveal"
import { RecordHeroCopy } from "@/components/home-record/record-hero-copy"
import { EvidenceStamp } from "@/components/home-record/evidence-stamp"
import { MUTED } from "@/components/home-record/tokens"
import { BLUR_DATA_URL } from "@/lib/images"
import type { EventPhase } from "@/lib/event-phase"

// Daylight hero: the headline states the thesis in plain type, and the group
// photo sits directly below it as Exhibit A, carrying the first evidence
// stamp on a translucent paper panel.
export function RecordHero({ phase }: { phase: EventPhase }) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-10">
      <Reveal>
        <p className={`font-mono text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] ${MUTED} mb-3`}>
          Southwest MN Hacks
        </p>
        <p className={`text-base sm:text-lg font-semibold ${MUTED} mb-5 max-w-2xl`}>
          Building southwest Minnesota&apos;s student technology community through hackathons, mentorship,
          collaboration, and real-world problem solving.
        </p>

        {/* Headline, supporting line, and actions live in a client island so
            they swap the instant the event goes live, without a refresh. */}
        <RecordHeroCopy initialPhase={phase} />
      </Reveal>

      {/* Exhibit A: the Fall 2026 group photo, the newest event on record. */}
      <Reveal delay={0.1}>
        <figure className="relative overflow-hidden rounded-xl">
          <div className="relative aspect-[3/2] sm:aspect-[2/1] lg:aspect-[21/9]">
            <Image
              src="/images/fall-2026/Group_photo_1.jpg"
              alt="All participants of Southwest MN Hacks: Fall 2026 gathered at SMSU"
              fill
              priority
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              sizes="(max-width: 1152px) 100vw, 1104px"
              className="object-cover object-[50%_40%]"
            />
          </div>
          <figcaption className="sm:absolute sm:bottom-4 sm:left-4 sm:max-w-md bg-white/85 backdrop-blur-sm ring-1 ring-black/5 sm:rounded-lg p-4">
            <EvidenceStamp>Sept 12–13, 2026 · Upper Conference Center, SMSU</EvidenceStamp>
            <p className={`mt-1.5 text-sm ${MUTED} leading-relaxed`}>
              All of us at the latest Southwest MN Hacks.{" "}
              <Link
                href="/events/fall-2026"
                className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2"
              >
                Read the Fall 2026 recap
              </Link>
            </p>
          </figcaption>
        </figure>
      </Reveal>
    </section>
  )
}
