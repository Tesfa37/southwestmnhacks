"use client"

import { useState } from "react"
import Link from "next/link"
import { track } from "@vercel/analytics"
import { Check, Medal, Award, Trophy, Crown, Gift, Minus, type LucideIcon } from "lucide-react"
import { LazyMotion, domAnimation, m, type Variants } from "motion/react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SPONSOR_EMAIL } from "@/lib/config"
import { sponsorInquiryUrl } from "@/lib/sponsor"
import {
  TIERS,
  CASH_TIERS,
  tierBenefitLines,
  tierPriceLabel,
  tierCompareRows,
  tierIncludes,
  type Tier,
} from "@/lib/sponsors/tiers"

// Display-only metadata (icon, emblem gradient, "popular" flag) keyed by slug. All
// copy (names, taglines, prices, benefits) comes from lib/sponsors/tiers.ts so the
// cards, compare table, /sponsor/start, emails, and invoices can never drift apart.
const CARD_SLUGS: Tier[] = ["bronze", "silver", "gold", "platinum", "in_kind"]
const DISPLAY: Record<string, { icon: LucideIcon; emblem: string; popular?: boolean }> = {
  bronze: { icon: Medal, emblem: "from-amber-200 to-yellow-100 text-amber-700" },
  silver: { icon: Award, emblem: "from-gray-200 to-slate-100 text-slate-600" },
  gold: { icon: Trophy, emblem: "from-yellow-300 to-amber-100 text-yellow-700", popular: true },
  platinum: { icon: Crown, emblem: "from-purple-200 to-violet-100 text-purple-700" },
  in_kind: { icon: Gift, emblem: "from-teal-200 to-cyan-100 text-teal-700" },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.21, 0.47, 0.32, 0.98] },
  }),
}

export function SponsorTiers() {
  const [view, setView] = useState<"cards" | "compare">("cards")
  const compareRows = tierCompareRows()

  return (
    <section id="tiers" className="py-16 px-4 bg-muted/30 scroll-mt-20">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Sponsorship levels</h2>
          <p className="text-lg text-muted-foreground text-balance">Choose a level that works for your organization</p>
        </div>

        {/* Cards / Compare toggle */}
        <div className="mb-10 flex justify-center">
          <div className="inline-flex rounded-full border border-border bg-card p-1 shadow-sm">
            {(["cards", "compare"] as const).map((option) => (
              <button
                key={option}
                onClick={() => setView(option)}
                className={cn(
                  "rounded-full px-6 py-2 text-sm font-semibold transition-colors",
                  view === option ? "bg-gray-900 text-white" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {option === "cards" ? "Cards" : "Compare all"}
              </button>
            ))}
          </div>
        </div>

        <LazyMotion features={domAnimation}>
          {view === "cards" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {CARD_SLUGS.map((slug, i) => {
                const cfg = TIERS[slug]
                const meta = DISPLAY[slug]
                const Icon = meta.icon
                return (
                  <m.div
                    key={slug}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10% 0px" }}
                    className={cn(
                      "relative flex flex-col rounded-3xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl",
                      meta.popular ? "border-orange-300 shadow-md" : "border-border",
                    )}
                  >
                    {meta.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange-600 px-4 py-1 text-sm font-medium text-white">
                        Popular
                      </div>
                    )}
                    <div
                      className={cn(
                        "mb-6 inline-flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br",
                        meta.emblem,
                      )}
                    >
                      <Icon className="size-7" />
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{cfg.label}</h3>
                    <p className="text-sm font-medium text-muted-foreground mb-3">{cfg.tagline}</p>
                    <p className="text-3xl font-bold mb-6">{tierPriceLabel(slug)}</p>
                    <ul className="space-y-3 mb-8 flex-1">
                      {tierBenefitLines(slug).map((benefit) => (
                        <li key={benefit} className="flex items-start gap-3">
                          <Check className="size-5 text-pink-600 shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground leading-relaxed">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={cn("w-full rounded-full", meta.popular && "bg-orange-600 hover:bg-orange-700")}
                      variant={meta.popular ? "default" : "outline"}
                      asChild
                    >
                      <Link
                        href={sponsorInquiryUrl({ name: cfg.label })}
                        onClick={() => track("Sponsor Click", { location: "tier-card", tier: cfg.label })}
                      >
                        Choose {cfg.label}
                      </Link>
                    </Button>
                  </m.div>
                )
              })}
            </div>
          ) : (
            <m.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-x-auto rounded-3xl border border-border bg-card shadow-sm"
            >
              <table className="w-full min-w-[720px] text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="sticky left-0 bg-card p-4 text-left font-semibold">Benefit</th>
                    {CASH_TIERS.map((slug) => {
                      const meta = DISPLAY[slug]
                      return (
                        <th key={slug} className="p-4 text-center">
                          <div className="flex flex-col items-center gap-1">
                            <span className={cn("font-bold", meta.popular && "text-orange-600")}>{TIERS[slug].label}</span>
                            {meta.popular && (
                              <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-orange-700">
                                Popular
                              </span>
                            )}
                          </div>
                        </th>
                      )
                    })}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row, i) => (
                    <tr key={row.label} className={cn("border-b border-border last:border-0", i % 2 === 1 && "bg-muted/30")}>
                      <td className="sticky left-0 bg-inherit p-4 text-left font-medium text-foreground">{row.label}</td>
                      {CASH_TIERS.map((slug, col) => (
                        <td key={slug} className="p-4 text-center">
                          {row.values ? (
                            row.values[col] ? (
                              <span className="font-semibold">{row.values[col]}</span>
                            ) : (
                              <Minus className="mx-auto size-4 text-gray-300" />
                            )
                          ) : tierIncludes(slug, row.minTier!) ? (
                            <Check className="mx-auto size-5 text-pink-600" />
                          ) : (
                            <Minus className="mx-auto size-4 text-gray-300" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="sticky left-0 bg-card p-4" />
                    {CASH_TIERS.map((slug) => {
                      const meta = DISPLAY[slug]
                      return (
                        <td key={slug} className="p-4 text-center">
                          <Button
                            size="sm"
                            className={cn("rounded-full", meta.popular && "bg-orange-600 hover:bg-orange-700")}
                            variant={meta.popular ? "default" : "outline"}
                            asChild
                          >
                            <Link
                              href={sponsorInquiryUrl({ name: TIERS[slug].label })}
                              onClick={() => track("Sponsor Click", { location: "compare-table", tier: TIERS[slug].label })}
                            >
                              Choose
                            </Link>
                          </Button>
                        </td>
                      )
                    })}
                  </tr>
                </tbody>
              </table>
            </m.div>
          )}
        </LazyMotion>

        {view === "compare" && (
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Prefer in-kind support? We accept meals, prizes, t-shirts, snacks, cloud or software credits, and equipment.
            Recognition is matched to the value contributed.{" "}
            <a href={`mailto:${SPONSOR_EMAIL}`} className="font-semibold text-orange-600 hover:underline">
              Email us
            </a>
            .
          </p>
        )}
      </div>
    </section>
  )
}
