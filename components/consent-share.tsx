"use client"

import { useState } from "react"
import { Mail, Copy, Check } from "lucide-react"
import { CONSENT_FORM_URL, EVENT_DATES, SUPPORT_EMAIL } from "@/lib/config"

const MAILTO = `mailto:?subject=${encodeURIComponent(
  "Can you fill out my consent form for Southwest MN Hacks?",
)}&body=${encodeURIComponent(
  `Hi!\n\n` +
    `I want to go to Southwest MN Hacks — a free, two-day student hackathon at SMSU in Marshall on ${EVENT_DATES}. ` +
    `Teams build a project over the weekend with mentors, meals, and prizes, and it runs overnight (I'll pack a sleeping bag).\n\n` +
    `I'm on the waitlist right now, so this isn't a confirmed spot yet. ` +
    `If I'm offered one, then since I'm under 18 a parent or guardian has to complete the consent and ` +
    `medical form before I can check in — I can't check in without it. It takes about 5 minutes:\n\n` +
    `${CONSENT_FORM_URL}\n\n` +
    `Could you fill it out now so I'm ready if a spot opens up?\n\n` +
    `Questions? The organizers are at ${SUPPORT_EMAIL}, and the website is https://southwestmnhacks.org.\n\n` +
    `Thank you!!`,
)}`

// Puts the consent form in the student's hands: email it to a parent with a
// prefilled message, or copy the link to send it any other way.
export function ConsentShare({ onDark = false }: { onDark?: boolean }) {
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
        className={
          onDark
            ? "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/15"
            : "inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:border-gray-400 hover:bg-gray-50"
        }
      >
        {copied ? <Check className={onDark ? "size-4 text-green-400" : "size-4 text-green-600"} /> : <Copy className="size-4" />}
        {copied ? "Copied!" : "Copy form link"}
      </button>
    </div>
  )
}
