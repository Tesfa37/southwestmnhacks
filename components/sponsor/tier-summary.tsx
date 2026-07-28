import Link from "next/link"
import { Check } from "lucide-react"
import { TIERS, formatCents, tierBenefitLines, type Tier } from "@/lib/sponsors/tiers"

// The selected-tier card shown at the top of /sponsor/start. `amountOverride` lets
// the custom tier reflect the amount the sponsor has entered. `onChangeTier`
// switches tiers in-page (keeping form input) instead of navigating away.
export function TierSummary({
  tier,
  amountCentsOverride,
  onChangeTier,
}: {
  tier: Tier
  amountCentsOverride?: number | null
  onChangeTier?: () => void
}) {
  const config = TIERS[tier]
  const benefitLines = tierBenefitLines(tier)
  const amount =
    typeof amountCentsOverride === "number"
      ? formatCents(amountCentsOverride)
      : config.amountCents != null
        ? formatCents(config.amountCents)
        : "Flexible"

  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{config.tagline}</p>
          <h2 className="text-2xl font-bold">{config.label}</h2>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">{amount}</p>
          {onChangeTier ? (
            <button
              type="button"
              onClick={onChangeTier}
              className="text-sm font-semibold text-orange-600 hover:underline"
            >
              Change tier
            </button>
          ) : (
            <Link href="/sponsor#tiers" className="text-sm font-semibold text-orange-600 hover:underline">
              Change tier
            </Link>
          )}
        </div>
      </div>
      {benefitLines.length > 0 && (
        <ul className="mt-4 space-y-2">
          {benefitLines.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check className="mt-0.5 size-4 shrink-0 text-pink-600" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
