import { Metadata } from "next"

export const metadata: Metadata = {
  alternates: { canonical: "/events/spring-2026" },
  title: "Spring 2026 Recap",
  description:
    "Recap of Southwest Minnesota's first student hackathon, held March 21, 2026 at SMSU in Marshall, MN. See the winners, the Schwan's Company challenges, and the people who made it happen.",
  openGraph: {
    title: "Southwest MN Hacks: Spring 2026 Recap",
    description:
      "Recap of Southwest Minnesota's first student hackathon, held March 21, 2026 at SMSU in Marshall, MN.",
    images: [{ url: "/images/group-photo.jpg", width: 2400, height: 1119 }],
  },
}

export default function SpringRecapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
