import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Register - SouthwestMN Hacks",
  description:
    "Register for SouthwestMN Hacks - A beginner-friendly full-day hackathon on March 21, 2026 in Marshall, MN. Free to attend, all skill levels welcome!",
  openGraph: {
    title: "Register - SouthwestMN Hacks",
    description:
      "Register for SouthwestMN Hacks - A beginner-friendly full-day hackathon on March 21, 2026 in Marshall, MN.",
    // TODO: Convert og-image.svg to PNG (1200x630) for full social platform support
    images: ["/og-image.svg"],
  },
}

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
