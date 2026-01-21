import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Register - SouthwestMN Hacks",
  description:
    "Register for SouthwestMN Hacks - A beginner-friendly 12-hour hackathon on March 21, 2026 in Marshall, MN. Free to attend, all skill levels welcome!",
  openGraph: {
    title: "Register - SouthwestMN Hacks",
    description:
      "Register for SouthwestMN Hacks - A beginner-friendly 12-hour hackathon on March 21, 2026 in Marshall, MN.",
    images: ["/og-image.png"],
  },
}

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
