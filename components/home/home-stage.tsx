import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PhotoHero } from "@/components/home/photo-hero"
import { ClassicHero } from "@/components/home/classic-hero"
import { SponsorStrip } from "@/components/home/sponsor-strip"
import { HighlightCards } from "@/components/home/highlight-cards"
import { PressOutcome } from "@/components/home/press-outcome"
import { WhatIsHackathon } from "@/components/home/what-is-hackathon"
import { EventDetails } from "@/components/home/event-details"
import { PeopleProof } from "@/components/home/people-proof"
import { Participate } from "@/components/home/participate"
import { HomeFaqSection } from "@/components/home/home-faq"
import { SponsorsSection } from "@/components/home/sponsors-section"
import { STAGE, type Tone } from "@/components/home/tone"
import type { EventPhase } from "@/lib/event-phase"

/**
 * The full homepage body, shared verbatim by app/page.tsx and the hidden preview
 * pages so what gets approved is exactly what ships.
 *
 * One component tree, two skins:
 *  - tone="light"  matches the rest of the site (recap, sponsor, resources).
 *  - tone="dark"   is the cinematic stage; the sponsors block still needs a
 *                  light sheet under it because logos want a white background.
 * The photo hero is dark in both tones by design: it is a photograph with a
 * scrim, and white type over it is the only combination that holds WCAG AA.
 */
export function HomeStage({
  phase,
  tone,
  hero = "photo",
  heroVideoSrc,
  heroCaption,
  sponsorStrip = "none",
}: {
  phase: EventPhase
  tone: Tone
  /** "classic" swaps in the pre-redesign aurora + shimmer-wordmark hero. */
  hero?: "photo" | "classic"
  heroVideoSrc?: string
  heroCaption?: string
  sponsorStrip?: "none" | "static" | "marquee"
}) {
  return (
    <div className={`min-h-screen ${STAGE[tone]}`}>
      <Header variant={tone} />

      <main id="main" className="flex-1">
        {hero === "classic" ? (
          <ClassicHero />
        ) : (
          <PhotoHero phase={phase} videoSrc={heroVideoSrc} caption={heroCaption} />
        )}
        {sponsorStrip !== "none" && <SponsorStrip tone={tone} mode={sponsorStrip} />}
        <HighlightCards tone={tone} />
        <PressOutcome tone={tone} />
        <WhatIsHackathon tone={tone} />
        <EventDetails phase={phase} tone={tone} />
        <PeopleProof tone={tone} />
        <Participate tone={tone} />
        <HomeFaqSection phase={phase} tone={tone} />

        {tone === "dark" ? (
          /* Light "sheet" interlude: sponsor logos need a white stage. */
          <div className="rounded-t-[3rem] bg-gradient-to-br from-orange-50 via-white to-blue-50 text-gray-900">
            <SponsorsSection />
          </div>
        ) : (
          <SponsorsSection />
        )}
      </main>

      <Footer />
    </div>
  )
}
