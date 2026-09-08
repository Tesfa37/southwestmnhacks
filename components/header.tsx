import { HeaderClient } from "@/components/header-client"
import { getEventPhase } from "@/lib/event-phase"

/**
 * Server wrapper whose only job is to resolve the event phase at render time and
 * hand it to the interactive header, the same way footer.tsx already does for its
 * own CTA. Without it the header's CTA fell back to the hook's "open" default, so
 * server-rendered HTML shipped "Join the waitlist" in every phase and only
 * corrected itself after hydration.
 *
 * This works because every <Header /> call site is a server component. Rendering
 * it from a client component would pull it into the client bundle and reintroduce
 * the hydration mismatch — render <HeaderClient> with an explicit phase instead.
 */
export function Header({ variant = "light" }: { variant?: "light" | "dark" }) {
  return <HeaderClient variant={variant} initialPhase={getEventPhase()} />
}
