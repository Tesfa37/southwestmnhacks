import { HomeStage } from "@/components/home/home-stage"
import { getEventPhase } from "@/lib/event-phase"
import { PreviewChip } from "../preview-chip"

// Same page body as production, pinned here so it stays side-by-side comparable
// with the other candidates while a direction is being picked.
export default function DaylightPreview() {
  return (
    <>
      <HomeStage phase={getEventPhase()} tone="light" />
      <PreviewChip label="Preview · Daylight (current production)" />
    </>
  )
}
