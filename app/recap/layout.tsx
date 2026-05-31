import { Metadata } from "next"

export const metadata: Metadata = {
  title: "2026 Recap",
  description:
    "Recap of Southwest Minnesota's first student hackathon, held March 21, 2026 at SMSU in Marshall, MN. See the winners, the Schwan's Company challenges, and the people who made it happen.",
  openGraph: {
    title: "Southwest MN Hacks 2026 Recap",
    description:
      "Recap of Southwest Minnesota's first student hackathon, held March 21, 2026 at SMSU in Marshall, MN.",
    images: ["/og-image.png"],
  },
}

export default function RecapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
