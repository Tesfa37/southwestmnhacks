import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RecordHero } from "@/components/home-record/record-hero"
import { FallStats } from "@/components/home-record/fall-stats"
import { EventHub } from "@/components/home-record/event-hub"
import { SponsorStrip } from "@/components/home/sponsor-strip"
import { RecordPress } from "@/components/home-record/record-press"
import { Receipts } from "@/components/home-record/receipts"
import { RecordDetails } from "@/components/home-record/record-details"
import { RecordPeople } from "@/components/home-record/record-people"
import { RecordJudges } from "@/components/home-record/record-judges"
import { FallResults } from "@/components/home-record/fall-results"
import { RecordWinners } from "@/components/home-record/record-winners"
import { RecordFaq } from "@/components/home-record/record-faq"
import { RecordSponsors } from "@/components/home-record/record-sponsors"
import { INK, PAPER } from "@/components/home-record/tokens"
import { areChallengesRevealed, type EventPhase } from "@/lib/event-phase"

// "The Record": the daylight, evidence-first homepage. Neutral paper stage,
// white bands for the format and results, dark footer unchanged. Sections
// alternate paper/white; the only color accents are brand blue (actions) and
// stamp orange (artifacts).
export function RecordHome({ phase }: { phase: EventPhase }) {
  // Server-side answer to "have the challenges been revealed?", handed down so
  // SSR and hydration agree; the hub re-checks against the clock after that.
  const challengesRevealed = areChallengesRevealed()

  return (
    <div className={`min-h-screen ${PAPER} ${INK}`}>
      <Header />

      <main id="main" className="flex-1">
        <RecordHero phase={phase} />
        <FallStats />
        <EventHub initialPhase={phase} initialRevealed={challengesRevealed} />
        <SponsorStrip tone="light" mode="marquee" />
        <RecordDetails phase={phase} />
        {/* Fall 2026 (the latest event) leads; the Spring 2026 archive
            (Press, Receipts, People, Winners) follows as previous-event
            history, never ahead of the current results. */}
        <RecordJudges />
        <FallResults />
        <RecordPress />
        <Receipts />
        <RecordPeople />
        <RecordWinners />
        <RecordFaq phase={phase} />

        <div className="bg-white border-t border-gray-200">
          <RecordSponsors />
        </div>
      </main>

      <Footer />
    </div>
  )
}
