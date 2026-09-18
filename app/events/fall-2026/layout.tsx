import { Metadata } from "next"

export const metadata: Metadata = {
  alternates: { canonical: "/events/fall-2026" },
  title: "Fall 2026 Recap",
  description:
    "The full recap of Southwest MN Hacks: Fall 2026 — September 12-13, 2026 at SMSU in Marshall, MN. Winners, judges, challenge prompts, sponsors, and every project teams shipped.",
  openGraph: {
    title: "Southwest MN Hacks: Fall 2026 Recap",
    description:
      "24 hours, 13 teams, 12 shipped projects. The full recap of Southwest MN Hacks: Fall 2026 at SMSU in Marshall, MN.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
}

export default function FallRecapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
