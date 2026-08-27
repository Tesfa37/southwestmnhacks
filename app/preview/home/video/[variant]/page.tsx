import { notFound } from "next/navigation"
import { HomeStage } from "@/components/home/home-stage"
import { getEventPhase } from "@/lib/event-phase"
import { PreviewChip } from "../../preview-chip"

interface Treatment {
  src?: string
  label: string
  caption?: string
}

const TREATMENTS: Record<string, Treatment> = {
  a: { src: "/videos/hero-real.mp4", label: "A · Animated real photo" },
  b: { src: "/videos/hero-hybrid.mp4", label: "B · Hybrid brand motion" },
  c: {
    src: "/videos/hero-broll.mp4",
    label: "C · AI b-roll",
    // Honest caption: this footage is generated, so no "Pictured:" claim.
    caption: "Real students, real judges, real sponsors. See March 2026 in the recap.",
  },
  still: { label: "Still · No video baseline" },
}

export function generateStaticParams() {
  return Object.keys(TREATMENTS).map((variant) => ({ variant }))
}

export default async function VideoPreview({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params
  const treatment = TREATMENTS[variant]
  if (!treatment) notFound()

  return (
    <>
      <HomeStage phase={getEventPhase()} tone="dark" heroVideoSrc={treatment.src} heroCaption={treatment.caption} />
      <PreviewChip label={`Preview ${treatment.label}`} />
    </>
  )
}
