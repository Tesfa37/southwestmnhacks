import { notFound } from "next/navigation"
import { HomeStage } from "@/components/home/home-stage"
import { getEventPhase } from "@/lib/event-phase"
import { PreviewChip } from "../../preview-chip"

const MODES: Record<string, { mode: "static" | "marquee"; label: string }> = {
  static: { mode: "static", label: "Static · all nine logos at once" },
  marquee: { mode: "marquee", label: "Marquee · slowly circulating" },
}

export function generateStaticParams() {
  return Object.keys(MODES).map((mode) => ({ mode }))
}

export default async function StripPreview({ params }: { params: Promise<{ mode: string }> }) {
  const { mode } = await params
  const treatment = MODES[mode]
  if (!treatment) notFound()

  return (
    <>
      <HomeStage phase={getEventPhase()} tone="light" sponsorStrip={treatment.mode} />
      <PreviewChip label={`Preview · Sponsor strip ${treatment.label}`} />
    </>
  )
}
