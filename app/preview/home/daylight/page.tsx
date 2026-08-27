import { HomeStage } from "@/components/home/home-stage"
import { getEventPhase } from "@/lib/event-phase"
import { PreviewChip } from "../preview-chip"

// Runner-up to The Record. Kept comparable in case the direction changes.
export default function DaylightPreview() {
  return (
    <>
      <HomeStage phase={getEventPhase()} tone="light" />
      <PreviewChip label="Preview · Daylight" />
    </>
  )
}
