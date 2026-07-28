"use client"

import Link from "next/link"

// Kept intentionally minimal: an error boundary should have as little of its
// own failure surface as possible, so no Header/Footer here.
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
        <p className="text-gray-600 mb-8">An unexpected error occurred. It&apos;s not you, it&apos;s us.</p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
          >
            Try again
          </button>
          <Link href="/" className="font-semibold text-blue-600 underline underline-offset-2 hover:text-blue-700">
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}
