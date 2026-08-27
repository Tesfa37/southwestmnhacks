import type { ReactNode } from "react"

// The Record's signature device: an archival-style stamp that marks a real
// artifact (a photo, a press clipping, a public gallery). Orange is reserved
// for this component alone; if something isn't a genuine artifact with a date
// or source, it doesn't get a stamp.
export function EvidenceStamp({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-700">
      {children}
    </p>
  )
}
