"use client"

import { useEffect, useState } from "react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const calculateTimeLeft = (): TimeLeft => {
      // March 21, 2026 at 8:00 AM Central Time
      // Central Time is UTC-6 (CST) or UTC-5 (CDT)
      // March 21, 2026 would be in CDT (Daylight Time)
      const targetDate = new Date("2026-03-21T08:00:00-05:00")
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((difference / 1000 / 60) % 60)
      const seconds = Math.floor((difference / 1000) % 60)

      return { days, hours, minutes, seconds }
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [mounted])

  if (!mounted || !timeLeft) {
    // Return placeholder during SSR to avoid hydration mismatch
    return (
      <div className="max-w-4xl mx-auto mb-12">
        <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-blue-500 rounded-3xl p-8 shadow-lg">
          <h3 className="text-white text-xl sm:text-2xl font-bold text-center mb-6">Event Starts In</h3>
          <div className="grid grid-cols-4 gap-3 sm:gap-6">
            {["Days", "Hours", "Minutes", "Seconds"].map((label) => (
              <div key={label} className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2">--</div>
                <div className="text-xs sm:text-sm font-semibold text-white/90">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const eventStart = new Date("2026-03-21T08:00:00-05:00")
  const eventEnd = new Date("2026-03-21T20:00:00-05:00")
  const now = new Date()

  if (now >= eventStart && now <= eventEnd) {
    return (
      <div className="max-w-4xl mx-auto mb-12">
        <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-blue-500 rounded-3xl p-8 shadow-lg text-center">
          <div className="text-4xl sm:text-5xl font-black text-white mb-4">
            <span className="animate-pulse">🎉</span>
          </div>
          <h3 className="text-white text-xl sm:text-2xl font-bold mb-2">Hacking is LIVE!</h3>
          <p className="text-white/90 text-lg">See you at SMSU Upper Conference Center!</p>
        </div>
      </div>
    )
  }

  if (now > eventEnd) {
    return (
      <div className="max-w-4xl mx-auto mb-12">
        <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-blue-500 rounded-3xl p-8 shadow-lg text-center">
          <h3 className="text-white text-xl sm:text-2xl font-bold mb-2">Thanks for an amazing day!</h3>
          <p className="text-white/90 text-lg">Stay tuned for results 🏆</p>
        </div>
      </div>
    )
  }

  const { days, hours, minutes, seconds } = timeLeft

  return (
    <div className="max-w-4xl mx-auto mb-12">
      <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-blue-500 rounded-3xl p-8 shadow-lg">
        <h3 className="text-white text-xl sm:text-2xl font-bold text-center mb-6">Event Starts In</h3>
        <div className="grid grid-cols-4 gap-3 sm:gap-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2">
              {String(days).padStart(2, "0")}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-white/90">Days</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2">
              {String(hours).padStart(2, "0")}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-white/90">Hours</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2">
              {String(minutes).padStart(2, "0")}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-white/90">Minutes</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2">
              {String(seconds).padStart(2, "0")}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-white/90">Seconds</div>
          </div>
        </div>
      </div>
    </div>
  )
}
