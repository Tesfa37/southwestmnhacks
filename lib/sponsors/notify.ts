// Email notifications via Resend. BEST-EFFORT — if Resend isn't configured or a
// send fails, we log and continue so the payment flow never 500s on email.
//
// Stripe sends its own invoice + receipt emails for pay-now / invoice paths, so
// the sponsor-facing confirmation here is only used for the non-payment paths
// (in-kind / check / W-9 / talk-first / custom-discussion). The organizer
// notification fires for EVERY submission.

import { Resend } from "resend"
import { optionalEnv } from "@/lib/env"
import { EVENT_NAME, SPONSOR_EMAIL } from "@/lib/config"
import { tierLabel, formatCents, type Tier } from "./tiers"
import { PAYMENT_PREFERENCES, type PaymentPreference } from "./payment-preferences"
import { TAX_NOTICE } from "./legal"
import type { SponsorStatus } from "./status"

function getResend(): Resend | null {
  const key = optionalEnv("RESEND_API_KEY")
  return key ? new Resend(key) : null
}

function fromAddress(): string {
  // Must be a Resend-verified sender. Defaults to Resend's onboarding domain so
  // dev works before southwestmnhacks.org is verified (set RESEND_FROM_EMAIL then).
  return optionalEnv("RESEND_FROM_EMAIL") || "Southwest MN Hacks <onboarding@resend.dev>"
}

export interface NotifyPayload {
  organizationName: string
  publicSponsorName?: string
  tier: Tier
  amountCents: number | null
  paymentPreference: PaymentPreference
  status: SponsorStatus
  contactName: string
  contactEmail: string
  contactPhone?: string
  billingEmail?: string
  needsW9?: boolean
  wantsBooth?: boolean
  wantsMentorOrJudge?: boolean
  interestedInChallengePrize?: boolean
  notes?: string
  inKindDescription?: string
  customerId: string
  invoiceUrl?: string
  notionPageId?: string | null
}

function amountLine(amountCents: number | null): string {
  return amountCents != null ? formatCents(amountCents) : "—"
}

function yesNo(v?: boolean): string {
  return v ? "yes" : "no"
}

/** Internal notification to the organizer — fires on every submission. */
export async function notifyOrganizer(payload: NotifyPayload): Promise<void> {
  const resend = getResend()
  const to = optionalEnv("SPONSOR_NOTIFY_EMAIL")
  if (!resend || !to) {
    console.warn("[notify] organizer email skipped (RESEND_API_KEY / SPONSOR_NOTIFY_EMAIL not set)")
    return
  }

  const lines = [
    `New sponsor submission — ${EVENT_NAME}`,
    "",
    `Organization:        ${payload.organizationName}`,
    payload.publicSponsorName ? `Public name:         ${payload.publicSponsorName}` : "",
    `Tier:                ${tierLabel(payload.tier)}`,
    `Amount:              ${amountLine(payload.amountCents)}`,
    `Payment preference:  ${PAYMENT_PREFERENCES[payload.paymentPreference].label}`,
    `Status:              ${payload.status}`,
    "",
    `Contact:             ${payload.contactName} <${payload.contactEmail}>`,
    payload.contactPhone ? `Phone:               ${payload.contactPhone}` : "",
    payload.billingEmail ? `Billing email:       ${payload.billingEmail}` : "",
    `Needs W-9:           ${yesNo(payload.needsW9)}`,
    `Booth:               ${yesNo(payload.wantsBooth)}`,
    `Mentor/Judge:        ${yesNo(payload.wantsMentorOrJudge)}`,
    `Challenge/Prize:     ${yesNo(payload.interestedInChallengePrize)}`,
    payload.inKindDescription ? `In-kind:             ${payload.inKindDescription}` : "",
    payload.notes ? `Notes:               ${payload.notes}` : "",
    "",
    `Stripe customer:     https://dashboard.stripe.com/customers/${payload.customerId}`,
    payload.invoiceUrl ? `Stripe invoice:      ${payload.invoiceUrl}` : "",
    payload.notionPageId ? `Notion row:          https://www.notion.so/${payload.notionPageId.replace(/-/g, "")}` : "",
  ].filter(Boolean)

  try {
    await resend.emails.send({
      from: fromAddress(),
      to,
      replyTo: payload.contactEmail,
      subject: `New sponsor: ${payload.organizationName} — ${tierLabel(payload.tier)}`,
      text: lines.join("\n"),
    })
  } catch (err) {
    console.error("[notify] organizer email failed:", err instanceof Error ? err.message : err)
  }
}

const CONFIRMATION_SUBJECTS: Partial<Record<PaymentPreference, string>> = {
  IN_KIND: "Southwest MN Hacks in-kind sponsorship request received",
  PAY_BY_CHECK: "Southwest MN Hacks sponsorship request received",
  NEED_W9_VENDOR_SETUP: "Southwest MN Hacks sponsorship request received",
  TALK_FIRST: "Southwest MN Hacks sponsorship request received",
  CUSTOM_DISCUSSION: "Southwest MN Hacks sponsorship request received",
}

const CONFIRMATION_NEXT_STEP: Partial<Record<PaymentPreference, string>> = {
  IN_KIND: "Our team will follow up to coordinate the details of your in-kind contribution.",
  PAY_BY_CHECK: "Our team will follow up with remit-to instructions and an invoice for your records.",
  NEED_W9_VENDOR_SETUP: "Our team will follow up with our W-9 and vendor setup details so your accounts-payable team can proceed.",
  TALK_FIRST: "Our team will reach out shortly to answer your questions before anything is finalized.",
  CUSTOM_DISCUSSION: "Our team will follow up to discuss a sponsorship that fits your organization.",
}

/** Sponsor-facing confirmation for the non-payment paths. */
export async function sendSponsorConfirmation(payload: NotifyPayload): Promise<void> {
  const resend = getResend()
  if (!resend) {
    console.warn("[notify] sponsor confirmation skipped (RESEND_API_KEY not set)")
    return
  }

  const subject = CONFIRMATION_SUBJECTS[payload.paymentPreference] || "Southwest MN Hacks sponsorship request received"
  const nextStep = CONFIRMATION_NEXT_STEP[payload.paymentPreference] || "Our team will follow up shortly."

  const body = [
    `Hi ${payload.contactName},`,
    "",
    `Thank you for your interest in sponsoring ${EVENT_NAME}. We've received your ${tierLabel(payload.tier)} sponsorship request.`,
    "",
    nextStep,
    "",
    `If you have any questions in the meantime, just reply to this email or reach us at ${SPONSOR_EMAIL}.`,
    "",
    TAX_NOTICE,
    "",
    "— Southwest MN Hacks",
  ].join("\n")

  try {
    await resend.emails.send({
      from: fromAddress(),
      to: payload.contactEmail,
      replyTo: SPONSOR_EMAIL,
      subject,
      text: body,
    })
  } catch (err) {
    console.error("[notify] sponsor confirmation failed:", err instanceof Error ? err.message : err)
  }
}
