import { HomeStage } from "@/components/home/home-stage"
import { getEventPhase } from "@/lib/event-phase"
import { PreviewChip } from "../preview-chip"

// The pre-redesign hero (aurora blobs, shimmer wordmark, rotating word, floating
// stickers) in front of the new proof sections. ClassicHero resolves the event
// phase client-side rather than taking it as a prop; if this design wins, give it
// an initialPhase prop so the CTA server-renders like every other call site.
export default function ClassicPreview() {
  return (
    <>
      <HomeStage phase={getEventPhase()} tone="light" hero="classic" />
      <PreviewChip label="Preview · Classic + proof" />
    </>
  )
}
