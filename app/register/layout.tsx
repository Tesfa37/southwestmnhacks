import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Register",
  description:
    "Register for Southwest MN Hacks: Fall 2026, a beginner-friendly two-day hackathon on September 12 to 13, 2026 at SMSU in Marshall, MN. Free to attend, all skill levels welcome.",
  openGraph: {
    title: "Register | Southwest MN Hacks: Fall 2026",
    description:
      "Register for Southwest MN Hacks: Fall 2026, a beginner-friendly two-day hackathon on September 12 to 13, 2026 at SMSU in Marshall, MN.",
    images: ["/og-image.png"],
  },
}

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
