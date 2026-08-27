import Image from "next/image"
import Link from "next/link"
import { Reveal } from "@/components/reveal"
import { RegisterCta } from "@/components/register-cta"
import { EvidenceStamp } from "@/components/home-record/evidence-stamp"
import { ACTION_PILL, DISPLAY, MUTED } from "@/components/home-record/tokens"
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

        <h1
          className={`${DISPLAY} text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] text-balance mb-6 max-w-4xl`}
        >
          24 hours to build something real.
        </h1>

        <p className={`text-lg sm:text-xl ${MUTED} leading-relaxed max-w-2xl mb-8 text-pretty`}>
          {phase === "ended" ? (
            <>Fall 2026 is a wrap. Thanks to every student who showed up. See what they built.</>
          ) : (
            <>
              Southwest Minnesota&apos;s free overnight student hackathon returns to SMSU. Beginner friendly, ages 14
              and up, high school through college.
            </>
          )}
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mb-12">
          <RegisterCta variant="hero" location="record-hero" initialPhase={phase} />
          <a href="#receipts" className={ACTION_PILL}>
            See the proof from March
          </a>
        </div>
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
