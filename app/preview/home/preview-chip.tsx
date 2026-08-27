import Link from "next/link"

// Self-identifying label so screenshots and scroll-throughs name their variant.
export function PreviewChip({ label }: { label: string }) {
  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-3 rounded-full bg-gray-900 px-4 py-2 text-xs font-semibold text-white shadow-xl">
      {label}
      <Link href="/preview/home" className="underline underline-offset-2 text-white/80 hover:text-white">
        All variants
      </Link>
    </div>
  )
}
