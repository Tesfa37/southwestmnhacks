import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ResourcesHero } from "@/components/resources-hero"
import { StarterKits } from "@/components/starter-kits"
import { FreeResources } from "@/components/free-resources"
import { Workshops } from "@/components/workshops"
import { DayOfChecklist } from "@/components/day-of-checklist"

export const metadata: Metadata = {
  title: { absolute: "Tools & Workshops | Southwest MN Hacks: Fall 2026" },
  description:
    "Free beginner-friendly tools, workshops, AI resources, coding guides, and project submission instructions for Southwest MN Hacks: Fall 2026.",
}

export default function ResourcesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ResourcesHero />
        <StarterKits />
        <FreeResources />
        <Workshops />
        <DayOfChecklist />
      </main>
      <Footer />
    </div>
  )
}
