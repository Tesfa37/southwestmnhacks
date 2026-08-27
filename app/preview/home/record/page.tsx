import { Archivo } from "next/font/google"
import { RecordHome } from "@/components/home-record/record-home"
import { getEventPhase } from "@/lib/event-phase"
import { PreviewChip } from "../preview-chip"

// Display face for The Record, scoped to this preview. If this design wins,
// the font moves to the root layout alongside Geist.
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo" })

export default function RecordPreview() {
  return (
    <div className={archivo.variable}>
      <RecordHome phase={getEventPhase()} />
      <PreviewChip label="Preview · The Record" />
    </div>
  )
}
