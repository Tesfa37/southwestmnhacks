"use client"

import { useMemo, useState, type ReactNode, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { track } from "@vercel/analytics"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { type Tier, TIERS, TIER_SLUGS, ENGAGEMENT_OPTIONS, formatCents, tierPriceLabel } from "@/lib/sponsors/tiers"
import { sponsorIntakeSchema, fieldErrors } from "@/lib/sponsors/schema"
import {
  PAYMENT_PREFERENCES,
  isPayNow,
  requiresBillingEmail,
  type PaymentPreference,
  type ConditionalField,
} from "@/lib/sponsors/payment-preferences"
import { AUTHORIZATION_LABEL, CONTACT_CONSENT_LABEL } from "@/lib/sponsors/legal"
import { TierSummary } from "@/components/sponsor/tier-summary"
import { PaymentPreferenceCards } from "@/components/sponsor/payment-preference-cards"
import { LegalNotice } from "@/components/sponsor/legal-notice"

const inputCls =
  "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-orange-400 focus:ring-1 focus:ring-orange-300"

// Which payment preferences make sense for a given tier, in display order.
// ACH leads (lowest fees / recommended), then card, then invoice, then the
// follow-up rails.
function preferencesForTier(tier: Tier): PaymentPreference[] {
  if (tier === "in_kind") return ["IN_KIND", "TALK_FIRST"]
  if (tier === "custom") return ["PAY_NOW_ACH", "PAY_NOW_CARD", "REQUEST_INVOICE", "CUSTOM_DISCUSSION", "TALK_FIRST"]
  return ["PAY_NOW_ACH", "PAY_NOW_CARD", "REQUEST_INVOICE", "PAY_BY_CHECK", "NEED_W9_VENDOR_SETUP", "TALK_FIRST"]
}

// Build the upsell note for engagement options a tier doesn't include, grouped by
// the tier that unlocks them, e.g. "A booth or table is included at Silver and
// above; …". Returns null when the tier includes everything.
function engagementUpsell(missing: { label: string; unlockTier: string }[]): string | null {
  if (missing.length === 0) return null
  const byTier = new Map<string, string[]>()
  for (const o of missing) {
    const arr = byTier.get(o.unlockTier) ?? []
    arr.push(o.label)
    byTier.set(o.unlockTier, arr)
  }
  const clauses = [...byTier.entries()].map(([unlock, labels]) => {
    const list =
      labels.length === 1 ? labels[0] : `${labels.slice(0, -1).join(", ")} and ${labels[labels.length - 1]}`
    return `${list} ${labels.length === 1 ? "is" : "are"} included at ${unlock} and above`
  })
  const sentence = clauses.join("; ")
  return `${sentence.charAt(0).toUpperCase()}${sentence.slice(1)}.`
}

interface FormState {
  organizationName: string
  publicSponsorName: string
  contactName: string
  contactEmail: string
  contactPhone: string
  organizationWebsite: string
  logoUrl: string
  customAmountDollars: string
  billingEmail: string
  billingContactName: string
  billingAddress: string
  city: string
  state: string
  zip: string
  purchaseOrderNumber: string
  needsW9: boolean
  wantsBooth: boolean
  wantsMentorOrJudge: boolean
  interestedInChallengePrize: boolean
  inKindDescription: string
  notes: string
  consentToBeContacted: boolean
}

const EMPTY: FormState = {
  organizationName: "",
  publicSponsorName: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  organizationWebsite: "",
  logoUrl: "",
  customAmountDollars: "",
  billingEmail: "",
  billingContactName: "",
  billingAddress: "",
  city: "",
  state: "",
  zip: "",
  purchaseOrderNumber: "",
  needsW9: false,
  wantsBooth: false,
  wantsMentorOrJudge: false,
  interestedInChallengePrize: false,
  inKindDescription: "",
  notes: "",
  consentToBeContacted: false,
}

function Field({
  label,
  htmlFor,
  required,
  error,
  children,
}: {
  label: string
  htmlFor: string
  required?: boolean
  error?: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium">
        {label}
        {required && <span className="text-pink-600"> *</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}

// Map schema error keys to the form element ids they anchor to.
const ERROR_FIELD_IDS: Record<string, string> = {
  customAmountCents: "customAmount",
  paymentPreference: "payment-preference",
  consentToBeContacted: "consentToBeContacted",
}

// The visual top-to-bottom field order, so scroll-to-error picks the first one.
const FIELD_ORDER = [
  "customAmountCents",
  "organizationName",
  "publicSponsorName",
  "organizationWebsite",
  "logoUrl",
  "contactName",
  "contactEmail",
  "contactPhone",
  "paymentPreference",
  "billingEmail",
  "billingContactName",
  "billingAddress",
  "city",
  "state",
  "zip",
  "purchaseOrderNumber",
  "inKindDescription",
  "notes",
  "consentToBeContacted",
]

function scrollToFirstError(errorKeys: string[]) {
  const first = FIELD_ORDER.find((key) => errorKeys.includes(key)) ?? errorKeys[0]
  if (!first) return
  const el = document.getElementById(ERROR_FIELD_IDS[first] ?? first)
  if (!el) return
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  el.scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" })
  if (el instanceof HTMLElement && el.tagName !== "FIELDSET") el.focus({ preventScroll: true })
}

export function SponsorStartForm({ initialTier }: { initialTier: Tier | null }) {
  const router = useRouter()
  const [tier, setTier] = useState<Tier | null>(initialTier)
  const [form, setForm] = useState<FormState>(EMPTY)
  const [preference, setPreference] = useState<PaymentPreference | null>(
    initialTier === "in_kind" ? "IN_KIND" : null,
  )
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  // Preference options differ per tier, so switching tiers resets the choice
  // (a stale preference could reveal fields the new tier never offers).
  function chooseTier(next: Tier) {
    setTier(next)
    setPreference(next === "in_kind" ? "IN_KIND" : null)
    setErrors({})
    setFormError(null)
  }

  const options = useMemo(() => preferencesForTier(tier ?? "bronze"), [tier])

  if (tier === null) {
    return (
      <div className="rounded-3xl border border-border bg-card p-6">
        <h2 className="mb-1 text-xl font-bold">Choose your level</h2>
        <p className="mb-5 text-sm text-muted-foreground">
          Pick the tier that fits. You can change it any time before submitting, or{" "}
          <Link href="/sponsor#tiers" className="font-semibold text-orange-600 hover:underline">
            compare all levels
          </Link>
          .
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {TIER_SLUGS.map((slug) => (
            <button
              key={slug}
              type="button"
              onClick={() => chooseTier(slug)}
              className="flex items-baseline justify-between gap-3 rounded-2xl border border-border bg-background px-4 py-3.5 text-left transition-colors hover:border-orange-400 hover:bg-orange-50/50"
            >
              <span>
                <span className="block font-semibold">{TIERS[slug].label}</span>
                <span className="block text-xs text-muted-foreground">{TIERS[slug].tagline}</span>
              </span>
              <span className="shrink-0 font-bold">{tierPriceLabel(slug)}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  const recommendInvoice = TIERS[tier].recommendsInvoice
  const conditional: Set<ConditionalField> = new Set(
    preference ? PAYMENT_PREFERENCES[preference].conditionalFields : [],
  )

  // Engagement options gated to what this tier includes (single source of truth in
  // tiers.ts). Options the tier doesn't include become an upsell note instead.
  const engagement = TIERS[tier].engagement
  const engagementFields: Record<keyof typeof engagement, { checked: boolean; set: (v: boolean) => void }> = {
    booth: { checked: form.wantsBooth, set: (v) => set("wantsBooth", v) },
    mentorJudge: { checked: form.wantsMentorOrJudge, set: (v) => set("wantsMentorOrJudge", v) },
    challenge: { checked: form.interestedInChallengePrize, set: (v) => set("interestedInChallengePrize", v) },
  }
  const includedEngagement = ENGAGEMENT_OPTIONS.filter((o) => engagement[o.flag])
  const engagementNote = engagementUpsell(ENGAGEMENT_OPTIONS.filter((o) => !engagement[o.flag]))

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const customAmountCents =
    tier === "custom" && form.customAmountDollars
      ? Math.round(parseFloat(form.customAmountDollars) * 100)
      : undefined

  // Amount shown on the pay-now submit button so the price sits next to the action.
  const payNowAmountCents = tier === "custom" ? customAmountCents : TIERS[tier].amountCents

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setFormError(null)
    setErrors({})

    if (!preference) {
      setErrors({ paymentPreference: "Please choose how you'd like to proceed." })
      scrollToFirstError(["paymentPreference"])
      return
    }

    track("Sponsor Start Submit", { tier, preference })

    const payload = {
      tier,
      paymentPreference: preference,
      organizationName: form.organizationName,
      publicSponsorName: form.publicSponsorName || undefined,
      contactName: form.contactName,
      contactEmail: form.contactEmail,
      contactPhone: form.contactPhone || undefined,
      organizationWebsite: form.organizationWebsite || undefined,
      logoUrl: form.logoUrl || undefined,
      customAmountCents,
      billingEmail: form.billingEmail || undefined,
      billingContactName: form.billingContactName || undefined,
      billingAddress: form.billingAddress || undefined,
      city: form.city || undefined,
      state: form.state || undefined,
      zip: form.zip || undefined,
      purchaseOrderNumber: form.purchaseOrderNumber || undefined,
      needsW9: form.needsW9,
      wantsBooth: form.wantsBooth,
      wantsMentorOrJudge: form.wantsMentorOrJudge,
      interestedInChallengePrize: form.interestedInChallengePrize,
      inKindDescription: form.inKindDescription || undefined,
      notes: form.notes || undefined,
      sourcePage: "sponsor-start",
      consentToBeContacted: form.consentToBeContacted,
    }

    // Mirror the server's validation locally so errors appear instantly and the
    // page scrolls to the first problem instead of failing at the bottom.
    const parsed = sponsorIntakeSchema.safeParse(payload)
    if (!parsed.success) {
      const fields = fieldErrors(parsed.error)
      setErrors(fields)
      setFormError("Please fix the highlighted fields.")
      scrollToFirstError(Object.keys(fields))
      return
    }

    setSubmitting(true)

    try {
      const res = await fetch("/api/sponsors/create", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        if (data?.error === "validation" && data.fields) {
          setErrors(data.fields)
          setFormError("Please fix the highlighted fields.")
          scrollToFirstError(Object.keys(data.fields))
        } else {
          setFormError(data?.message || "Something went wrong. Please try again.")
        }
        setSubmitting(false)
        return
      }

      if (data.next === "checkout" && data.url) {
        window.location.href = data.url
        return
      }
      if (data.next === "invoice") {
        router.push("/sponsor/success?state=invoice")
        return
      }
      router.push(`/sponsor/success?state=recorded&pref=${encodeURIComponent(preference)}`)
    } catch {
      setFormError("We couldn't reach the server. Please check your connection and try again.")
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8" noValidate>
      <TierSummary tier={tier} amountCentsOverride={customAmountCents} onChangeTier={() => setTier(null)} />

      {tier === "custom" && (
        <Field label="Sponsorship amount (USD)" htmlFor="customAmount" error={errors.customAmountCents}>
          <input
            id="customAmount"
            type="number"
            min={0}
            step="50"
            inputMode="decimal"
            value={form.customAmountDollars}
            onChange={(e) => set("customAmountDollars", e.target.value)}
            placeholder="e.g. 750"
            className={inputCls}
          />
        </Field>
      )}

      {/* Organization */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold">Your organization</legend>
        <Field label="Organization name" htmlFor="organizationName" required error={errors.organizationName}>
          <input id="organizationName" value={form.organizationName} onChange={(e) => set("organizationName", e.target.value)} className={inputCls} autoComplete="organization" />
        </Field>
        <Field label="Public sponsor name (if different)" htmlFor="publicSponsorName" error={errors.publicSponsorName}>
          <input id="publicSponsorName" value={form.publicSponsorName} onChange={(e) => set("publicSponsorName", e.target.value)} className={inputCls} />
        </Field>
        <Field label="Website" htmlFor="organizationWebsite" error={errors.organizationWebsite}>
          <input id="organizationWebsite" type="url" value={form.organizationWebsite} onChange={(e) => set("organizationWebsite", e.target.value)} placeholder="https://" className={inputCls} autoComplete="url" />
        </Field>
        <Field label="Logo URL (optional, or we'll follow up for it)" htmlFor="logoUrl" error={errors.logoUrl}>
          <input id="logoUrl" type="url" value={form.logoUrl} onChange={(e) => set("logoUrl", e.target.value)} placeholder="https://" className={inputCls} />
        </Field>
      </fieldset>

      {/* Contact */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold">Contact</legend>
        <Field label="Your name" htmlFor="contactName" required error={errors.contactName}>
          <input id="contactName" value={form.contactName} onChange={(e) => set("contactName", e.target.value)} className={inputCls} autoComplete="name" />
        </Field>
        <Field label="Email" htmlFor="contactEmail" required error={errors.contactEmail}>
          <input id="contactEmail" type="email" value={form.contactEmail} onChange={(e) => set("contactEmail", e.target.value)} className={inputCls} autoComplete="email" />
        </Field>
        <Field label="Phone" htmlFor="contactPhone" error={errors.contactPhone}>
          <input id="contactPhone" type="tel" value={form.contactPhone} onChange={(e) => set("contactPhone", e.target.value)} className={inputCls} autoComplete="tel" />
        </Field>
      </fieldset>

      {/* Payment preference */}
      <fieldset id="payment-preference" className="space-y-3 scroll-mt-24">
        <legend className="text-lg font-semibold">How would you like to proceed?</legend>
        <PaymentPreferenceCards options={options} value={preference} onChange={setPreference} recommendInvoice={recommendInvoice} />
        {errors.paymentPreference && <p className="text-sm text-red-600">{errors.paymentPreference}</p>}
        {recommendInvoice && preference === "PAY_NOW_CARD" && (
          <p className="rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800">
            For larger sponsorships, paying by ACH bank transfer or check helps reduce processing fees, but card is welcome too.
          </p>
        )}
      </fieldset>

      {/* Conditional: billing */}
      {conditional.has("billing") && (
        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold">Billing details</legend>
          <Field
            label="Billing email"
            htmlFor="billingEmail"
            required={!!preference && requiresBillingEmail(preference)}
            error={errors.billingEmail}
          >
            <input id="billingEmail" type="email" value={form.billingEmail} onChange={(e) => set("billingEmail", e.target.value)} className={inputCls} />
          </Field>
          <Field label="Billing contact name" htmlFor="billingContactName" error={errors.billingContactName}>
            <input id="billingContactName" value={form.billingContactName} onChange={(e) => set("billingContactName", e.target.value)} className={inputCls} />
          </Field>
          <Field label="Billing address" htmlFor="billingAddress" error={errors.billingAddress}>
            <input id="billingAddress" value={form.billingAddress} onChange={(e) => set("billingAddress", e.target.value)} className={inputCls} autoComplete="street-address" />
          </Field>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <Field label="City" htmlFor="city" error={errors.city}>
              <input id="city" value={form.city} onChange={(e) => set("city", e.target.value)} className={inputCls} />
            </Field>
            <Field label="State" htmlFor="state" error={errors.state}>
              <input id="state" value={form.state} onChange={(e) => set("state", e.target.value)} className={inputCls} />
            </Field>
            <Field label="ZIP" htmlFor="zip" error={errors.zip}>
              <input id="zip" value={form.zip} onChange={(e) => set("zip", e.target.value)} className={inputCls} />
            </Field>
          </div>
          <Field label="PO number" htmlFor="purchaseOrderNumber" error={errors.purchaseOrderNumber}>
            <input id="purchaseOrderNumber" value={form.purchaseOrderNumber} onChange={(e) => set("purchaseOrderNumber", e.target.value)} className={inputCls} />
          </Field>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.needsW9} onChange={(e) => set("needsW9", e.target.checked)} className="size-4 rounded border-border" />
            We need a W-9 from you before payment
          </label>
        </fieldset>
      )}

      {/* Conditional: check note */}
      {conditional.has("check") && (
        <p className="rounded-xl bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
          We'll send remit-to instructions and an invoice for your records. Mark the invoice as paid once your check clears.
        </p>
      )}

      {/* Conditional: W-9 / vendor note */}
      {conditional.has("w9") && (
        <p className="rounded-xl bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
          Tell us in the notes below what your accounts-payable team needs (vendor portal, forms, etc.) and we'll get set up.
        </p>
      )}

      {/* Conditional: in-kind */}
      {conditional.has("inKind") && (
        <Field label="What would you like to contribute?" htmlFor="inKindDescription" required error={errors.inKindDescription}>
          <textarea id="inKindDescription" value={form.inKindDescription} onChange={(e) => set("inKindDescription", e.target.value)} rows={3} className={inputCls} placeholder="e.g. lunch for 60, cloud credits, prizes…" />
        </Field>
      )}

      {/* Engagement interests: only the options this tier includes; the rest
          become an upsell note. */}
      {(includedEngagement.length > 0 || engagementNote) && (
        <fieldset className="space-y-2">
          <legend className="text-lg font-semibold">Optional: get involved</legend>
          {includedEngagement.map((o) => (
            <label key={o.flag} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={engagementFields[o.flag].checked}
                onChange={(e) => engagementFields[o.flag].set(e.target.checked)}
                className="size-4 rounded border-border"
              />
              {o.checkbox}
            </label>
          ))}
          {engagementNote && (
            <p className="text-sm text-muted-foreground">
              {engagementNote}{" "}
              <Link href="/sponsor#tiers" className="font-semibold text-orange-600 hover:underline">
                Change tier
              </Link>
            </p>
          )}
        </fieldset>
      )}

      <Field label="Anything else?" htmlFor="notes" error={errors.notes}>
        <textarea id="notes" value={form.notes} onChange={(e) => set("notes", e.target.value)} rows={3} className={inputCls} />
      </Field>

      <label className="flex items-start gap-2 text-sm">
        <input id="consentToBeContacted" type="checkbox" checked={form.consentToBeContacted} onChange={(e) => set("consentToBeContacted", e.target.checked)} className="mt-0.5 size-4 rounded border-border scroll-mt-24" />
        <span>
          {preference === "TALK_FIRST" || preference === "CUSTOM_DISCUSSION"
            ? CONTACT_CONSENT_LABEL
            : AUTHORIZATION_LABEL}
        </span>
      </label>
      {errors.consentToBeContacted && <p className="text-sm text-red-600">{errors.consentToBeContacted}</p>}

      <LegalNotice />

      {formError && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {formError}
        </div>
      )}

      <div className="space-y-2">
        <Button type="submit" disabled={submitting} className={cn("w-full rounded-full bg-orange-600 py-6 text-base hover:bg-orange-700", submitting && "opacity-70")}>
          {submitting
            ? "Submitting…"
            : preference && isPayNow(preference)
              ? `Continue to secure payment${payNowAmountCents != null ? ` · ${formatCents(payNowAmountCents)}` : ""}`
              : "Submit request"}
        </Button>
        {preference && isPayNow(preference) && (
          <p className="text-center text-xs text-muted-foreground">
            You&apos;ll be redirected to Stripe&apos;s secure checkout. Nothing is charged until you confirm there.
          </p>
        )}
      </div>
    </form>
  )
}
