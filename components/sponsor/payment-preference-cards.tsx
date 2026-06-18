"use client"

import { cn } from "@/lib/utils"
import { PAYMENT_PREFERENCES, type PaymentPreference } from "@/lib/sponsors/payment-preferences"

// Accessible radio-card group for choosing how to pay. For Gold/Platinum we tag
// invoice / ACH as "Recommended" (card stays available, just nudged).
export function PaymentPreferenceCards({
  options,
  value,
  onChange,
  recommendInvoice,
}: {
  options: PaymentPreference[]
  value: PaymentPreference | null
  onChange: (preference: PaymentPreference) => void
  recommendInvoice?: boolean
}) {
  return (
    <div role="radiogroup" aria-label="Payment preference" className="grid gap-3 sm:grid-cols-2">
      {options.map((option) => {
        const config = PAYMENT_PREFERENCES[option]
        const selected = value === option
        const recommended = recommendInvoice && (option === "REQUEST_INVOICE" || option === "PAY_NOW_ACH")
        return (
          <button
            type="button"
            role="radio"
            aria-checked={selected}
            key={option}
            onClick={() => onChange(option)}
            className={cn(
              "rounded-2xl border p-4 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400",
              selected ? "border-orange-400 bg-orange-50/60 ring-1 ring-orange-300" : "border-border hover:border-orange-200",
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold">{config.label}</span>
              {recommended && (
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-green-700">
                  Recommended
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{config.help}</p>
          </button>
        )
      })}
    </div>
  )
}
