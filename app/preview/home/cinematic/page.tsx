import { HomeStage } from "@/components/home/home-stage"
import { getEventPhase } from "@/lib/event-phase"
import { PreviewChip } from "../preview-chip"

export default function CinematicPreview() {
  return (
    <>
      <HomeStage phase={getEventPhase()} tone="dark" />
      <PreviewChip label="Preview · Cinematic (dark stage)" />
    </>
  )
}
