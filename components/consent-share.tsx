"use client"

import { useState } from "react"
import { Mail, Copy, Check } from "lucide-react"
import { CONSENT_FORM_URL, EVENT_DATES } from "@/lib/config"

const MAILTO = `mailto:?subject=${encodeURIComponent(
  "Parental consent form — Southwest MN Hacks",
)}&body=${encodeURIComponent(
  `Hi! I'm registering for Southwest MN Hacks, a student hackathon on ${EVENT_DATES} at SMSU in Marshall. ` +
    `Since I'm under 18, a parent or guardian needs to complete this consent form before I can check in:\n\n` +
    `${CONSENT_FORM_URL}\n\n` +
    `It only takes a few minutes. Thank you!`,
)}`

// Puts the consent form in the student's hands: email it to a parent with a
// prefilled message, or copy the link to send it any other way.
export function ConsentShare() {
  const [copied, setCopied] = useState(false)

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(CONSENT_FORM_URL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable (permissions/insecure context) — leave button as-is.
    }
  }

  return (
    <div className="mt-4 flex flex-wrap gap-3">
      <a
        href={MAILTO}
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-5 py-2.5 text-sm font-semibold text-white transition-shadow hover:shadow-md"
      >
        <Mail className="size-4" />
        Email it to your parent
      </a>
      <button
        onClick={copyLink}
        className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:border-gray-400 hover:bg-gray-50"
      >
        {copied ? <Check className="size-4 text-green-600" /> : <Copy className="size-4" />}
        {copied ? "Copied!" : "Copy form link"}
      </button>
    </div>
  )
}
