"use client"

import Link from "next/link"
import { track } from "@vercel/analytics"

export function SponsorCtaButton() {
  return (
    <Link
      href="/sponsor"
      onClick={() => track("Sponsor Click", { location: "sponsors-section" })}
      className="bg-white text-blue-600 px-8 py-4 rounded-full hover:shadow-xl transition-all font-semibold text-lg inline-block"
    >
      Sponsor a Future Event
    </Link>
  )
}
