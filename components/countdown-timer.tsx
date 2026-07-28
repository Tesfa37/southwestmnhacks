"use client"

import { useEffect, useState } from "react"
import { CLOSE_MS, START_MS, END_MS } from "@/lib/event-phase"

type Unit = { label: string; value: number }

function unitsUntil(target: number, now: number): Unit[] {
  const total = Math.max(0, target - now)
  return [
    { label: "Days", value: Math.floor(total / 86_400_000) },
    { label: "Hours", value: Math.floor((total % 86_400_000) / 3_600_000) },
    { label: "Min", value: Math.floor((total % 3_600_000) / 60_000) },
    { label: "Sec", value: Math.floor((total % 60_000) / 1_000) },
  ]
}

function Pill({ children, tone }: { children: React.ReactNode; tone: "live" | "ended" }) {
  const styles =
    tone === "live" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700"
  return (
    <div className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-base font-semibold ${styles}`}>
      {children}
    </div>
  )
}

export function CountdownTimer() {
  // null until mounted so the server and first client render match (no hydration mismatch).
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    const update = () => setNow(Date.now())
    const timeout = setTimeout(update, 0)
    const interval = setInterval(update, 1000)
    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [])

  // Reserve vertical space before mount to avoid layout shift.
  if (now === null) {
    return <div className="h-[104px]" aria-hidden="true" />
  }

  if (now >= END_MS) {
    return (
      <Pill tone="ended">That&apos;s a wrap. Thanks for joining!</Pill>
    )
  }

  if (now >= START_MS) {
    return (
      <Pill tone="live">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-600" />
        </span>
        The event is officially underway
      </Pill>
    )
  }

  const beforeClose = now < CLOSE_MS
  const label = beforeClose ? "Registration closes in" : "Event begins in"
  const units = unitsUntil(beforeClose ? CLOSE_MS : START_MS, now)

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">{label}</p>
      <div className="flex gap-2 sm:gap-3">
        {units.map((u) => (
          <div
            key={u.label}
            className="flex flex-col items-center bg-white rounded-3xl shadow-sm border border-gray-200 px-3 py-2 sm:px-4 sm:py-3 min-w-[60px] sm:min-w-[76px]"
          >
            <span className="text-2xl sm:text-3xl font-black tabular-nums bg-gradient-to-r from-orange-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              {String(u.value).padStart(2, "0")}
            </span>
            <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wide text-gray-500">
              {u.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
