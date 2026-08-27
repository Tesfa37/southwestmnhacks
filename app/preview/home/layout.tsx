import type { ReactNode } from "react"

// Internal design previews: never indexed, never in the sitemap, and /preview
// is disallowed in robots.ts.
export const metadata = {
  title: "Homepage previews",
  robots: { index: false, follow: false },
}

export default function PreviewLayout({ children }: { children: ReactNode }) {
  return children
}
