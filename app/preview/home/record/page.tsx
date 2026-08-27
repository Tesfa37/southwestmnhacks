import { RecordHome } from "@/components/home-record/record-home"
import { getEventPhase } from "@/lib/event-phase"
import { PreviewChip } from "../preview-chip"

// This design won: app/page.tsx renders RecordHome, and the Archivo loader has
// moved to app/layout.tsx. Kept here only so the variants stay comparable.
export default function RecordPreview() {
  return (
    <>
      <RecordHome phase={getEventPhase()} />
      <PreviewChip label="Preview · The Record (current production)" />
    </>
  )
}
