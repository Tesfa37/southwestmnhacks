import Image from "next/image"
import { Reveal } from "@/components/reveal"
import { CountdownTimer } from "@/components/countdown-timer"
import { KonamiListener } from "@/components/easter-eggs"
import { RegisterCta } from "@/components/register-cta"
import { HeroVideo } from "@/components/home/hero-video"
import { BLUR_DATA_URL } from "@/lib/images"
import type { EventPhase } from "@/lib/event-phase"
import { EVENT_NAME, EVENT_DATES, REGISTRATION_DEADLINE, VENUE_MAP_URL } from "@/lib/config"

const DEFAULT_CAPTION = "Pictured: our March 2026 event at SMSU. Real students, real judges, real sponsors."

// Cinematic hero: the March 2026 group photo (or a video treatment layered over
// it) behind the headline. The photo is the proof; the scrim keeps white text
// at WCAG AA over the brightest regions.
export function PhotoHero({
  phase,
  videoSrc,
  caption = DEFAULT_CAPTION,
}: {
  phase: EventPhase
  videoSrc?: string
  caption?: string
}) {
  return (
    <section className="relative overflow-hidden">
      <KonamiListener />
      <Image
        src="/images/group-photo.jpg"
        alt="All participants of the March 2026 Southwest MN Hacks gathered at SMSU"
        fill
        priority
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        sizes="100vw"
        className="object-cover object-[50%_40%]"
      />
      {videoSrc && <HeroVideo src={videoSrc} />}
      <div aria-hidden="true" className="absolute inset-0 bg-black/40" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20"
      />

      <div className="relative flex min-h-[70svh] md:min-h-[80svh] flex-col items-center justify-center text-center max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <Reveal className="flex flex-col items-center">
          <div className="inline-block bg-black/55 backdrop-blur-sm ring-1 ring-white/15 px-4 py-2 rounded-full text-sm font-semibold text-white mb-6">
            {EVENT_DATES} &bull;{" "}
            <a
              href={VENUE_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-blue-300 transition-colors"
            >
              SMSU, Marshall, MN
            </a>
          </div>

          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight text-balance px-2 text-white">
            {EVENT_NAME}
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-4 max-w-3xl mx-auto leading-relaxed text-pretty px-4">
            {phase === "ended" ? (
              <>Southwest Minnesota&apos;s student hackathon is a wrap. Thanks to every builder who showed up. See what they made.</>
            ) : (
              <>
                Southwest Minnesota&apos;s student hackathon returns. 24 hours to build something real, and all skill
                levels are welcome.
              </>
            )}
          </p>

          <p className="text-sm text-white/80 mb-8 px-4">{caption}</p>

          <div className="flex flex-wrap gap-4 justify-center mb-6 px-4">
            <RegisterCta variant="hero" location="home-hero" initialPhase={phase} onDark />
          </div>

          <div className="rounded-3xl bg-black/45 backdrop-blur-md ring-1 ring-white/15 px-5 py-4 mb-4">
            <CountdownTimer tone="dark" />
          </div>

          {phase === "open" && (
            <p className="text-sm text-white/80">Registration closes {REGISTRATION_DEADLINE}.</p>
          )}
        </Reveal>
      </div>
    </section>
  )
}
