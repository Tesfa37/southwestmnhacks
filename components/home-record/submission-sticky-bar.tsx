"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { track } from "@vercel/analytics"
import { DEVPOST_FALL_URL } from "@/lib/config"
import type {
  SubmissionCountdown as Countdown,
  SubmissionTier,
} from "@/components/home-record/use-submission-countdown"

const DISMISS_KEY = "swmh-submit-bar-dismissed"
// Comfortably taller than the bar itself.
const BAR_CLEARANCE = "5.5rem"

// sessionStorage can throw outright in private mode, so every access is guarded
// and the bar simply stays visible when storage is unavailable.
function readDismissed(): SubmissionTier | null {
  try {
    return sessionStorage.getItem(DISMISS_KEY) as SubmissionTier | null
  } catch {
    return null
  }
}

function writeDismissed(tier: SubmissionTier) {
  try {
    sessionStorage.setItem(DISMISS_KEY, tier)
  } catch {
    // Nothing to do: the bar just reappears on the next render.
  }
}

/**
 * Bottom bar for the last three hours. Stateless about time — it takes the
 * shared countdown — and owns only its own dismissal.
 */
export function SubmissionStickyBar({ countdown }: { countdown: Countdown }) {
  const { mounted, state, tier, parts } = countdown
  // Lazy initializer rather than an effect: on the server readDismissed()
  // throws on the missing global and returns null, and the bar renders null
  // until `mounted` anyway, so there is nothing to mismatch on hydration.
  const [dismissedTier, setDismissedTier] = useState<SubmissionTier | null>(readDismissed)

  // Dismissing the 3-hour warning must not also silence the final-hour one, so
  // what's remembered is WHICH tier was dismissed, not a bare boolean.
  const visible =
    mounted && state === "counting" && tier !== "normal" && dismissedTier !== tier

  // A fixed bar covers the last ~60px of the PAGE, not of any one section, so
  // the clearance belongs on the body — otherwise the footer's final row is
  // unreachable at maximum scroll. Pure DOM synchronisation, cleaned up on hide.
  useEffect(() => {
    if (!visible) return
    const previous = document.body.style.paddingBottom
    document.body.style.paddingBottom = BAR_CLEARANCE
    return () => {
      document.body.style.paddingBottom = previous
    }
  }, [visible])

  if (!visible) return null

  const urgent = tier === "urgent"

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-sm ${
        urgent ? "border-red-300 bg-red-50/95" : "border-orange-300 bg-orange-50/95"
      }`}
      role="status"
      aria-live="off"
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        <p className="min-w-0 flex-1 text-sm font-semibold sm:text-base">
          <span className={urgent ? "text-red-800" : "text-orange-900"}>
            <span className="tabular-nums">
              {parts.hours}h {String(parts.minutes).padStart(2, "0")}m
            </span>{" "}
            left to submit
          </span>
        </p>

        <a
          href={DEVPOST_FALL_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("Devpost Click", { location: "sticky-bar" })}
          className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold text-white transition-colors ${
            urgent ? "bg-red-600 hover:bg-red-700" : "bg-orange-600 hover:bg-orange-700"
          }`}
        >
          Submit
        </a>

        <button
          type="button"
          onClick={() => {
            writeDismissed(tier)
            setDismissedTier(tier)
          }}
          aria-label="Dismiss submission reminder"
          className={`shrink-0 rounded-full p-2 transition-colors ${
            urgent ? "text-red-700 hover:bg-red-100" : "text-orange-800 hover:bg-orange-100"
          }`}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
