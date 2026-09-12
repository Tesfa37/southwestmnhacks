import { SUBMISSION_DEADLINE } from "@/lib/config"
import type { SubmissionCountdown as Countdown } from "@/components/home-record/use-submission-countdown"

const UNIT_LABELS = ["Hours", "Min", "Sec"] as const

/**
 * The card timer. Holds no state: every value comes from the one
 * useSubmissionCountdown() call in event-hub.tsx.
 */
export function SubmissionCountdown({ countdown }: { countdown: Countdown }) {
  const { mounted, state, tier, parts } = countdown

  // Reserve the counting block's height so the orange callout doesn't jump.
  if (!mounted) {
    return <div className="h-[92px]" aria-hidden="true" />
  }

  if (state === "closed") {
    return (
      <div className="py-3">
        <span className="inline-flex items-center rounded-full bg-gray-100 px-5 py-2.5 text-base font-semibold text-gray-700">
          Submissions are closed
        </span>
      </div>
    )
  }

  const urgent = tier === "urgent"
  const values = [parts.hours, parts.minutes, parts.seconds]

  return (
    // aria-live="off" is deliberate: a live region here would have a screen
    // reader announce the time every second, all night. The sr-only line below
    // carries the deadline instead, and never changes.
    <div className="py-3" role="timer" aria-live="off">
      <span className="sr-only">Submissions close at {SUBMISSION_DEADLINE}.</span>

      <p
        className={`mb-2 text-xs font-semibold uppercase tracking-wider ${
          urgent ? "text-red-700" : "text-orange-800"
        }`}
        aria-hidden="true"
      >
        {urgent ? "Final hour to submit" : "Time left to submit"}
      </p>

      <div className="flex gap-2 sm:gap-3" aria-hidden="true">
        {values.map((value, i) => (
          <div
            key={UNIT_LABELS[i]}
            className={`flex flex-col items-center rounded-2xl bg-white px-3 py-2 shadow-sm ring-1 sm:px-4 ${
              urgent ? "ring-red-200" : "ring-orange-200"
            } min-w-[62px] sm:min-w-[72px]`}
          >
            <span
              className={`text-2xl font-black tabular-nums sm:text-3xl ${
                urgent ? "text-red-600" : "text-orange-600"
              }`}
            >
              {String(value).padStart(2, "0")}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-wide text-gray-500 sm:text-xs">
              {UNIT_LABELS[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
