// Notion sponsor tracker. This is the friendly pipeline board — Stripe stays the
// money source of truth. Every function here is BEST-EFFORT: if Notion isn't
// configured or a call fails, we log and move on rather than break the payment
// flow. Reconciliation is always possible from Stripe.
//
// Database: "Southwest MN Hacks — Sponsors" (provisioned separately).
// Uses the v5 data-source API (notion.dataSources.query / pages.create with a
// data_source_id parent).

import { Client } from "@notionhq/client"
import { optionalEnv } from "./env"
import type { Tier } from "./sponsors/tiers"
import type { PaymentPreference } from "./sponsors/payment-preferences"
import type { SponsorStatus } from "./sponsors/status"

// Map internal enum values to the exact Notion select-option names. These option
// names are app-controlled — don't rename them in Notion or writes will create
// duplicates.
const TIER_LABEL: Record<Tier, string> = {
  bronze: "Bronze",
  silver: "Silver",
  gold: "Gold",
  platinum: "Platinum",
  custom: "Custom",
  in_kind: "In-Kind",
}

const PREFERENCE_LABEL: Record<PaymentPreference, string> = {
  PAY_NOW_CARD: "Pay now by card",
  PAY_NOW_ACH: "Pay now by ACH",
  REQUEST_INVOICE: "Send me an invoice",
  PAY_BY_CHECK: "Pay by check",
  NEED_W9_VENDOR_SETUP: "W-9 / vendor setup",
  TALK_FIRST: "Talk first",
  IN_KIND: "In-kind",
  CUSTOM_DISCUSSION: "Discuss a custom amount",
}

const STATUS_LABEL: Record<SponsorStatus, string> = {
  FORM_STARTED: "Form submitted",
  FORM_SUBMITTED: "Form submitted",
  CHECKOUT_CREATED: "Checkout created",
  PAYMENT_PENDING: "Payment pending",
  PAID: "Paid",
  INVOICE_REQUESTED: "Invoice requested",
  INVOICE_DRAFTED: "Invoice drafted",
  INVOICE_SENT: "Invoice sent",
  INVOICE_PAID: "Invoice paid",
  CHECK_PAYMENT_REQUESTED: "Check requested",
  W9_VENDOR_SETUP_REQUESTED: "W-9 / vendor setup",
  IN_KIND_PENDING: "In-kind pending",
  MANUAL_FOLLOW_UP: "Manual follow-up",
  CANCELLED: "Cancelled",
  PAYMENT_FAILED: "Payment failed",
  REFUNDED: "Refunded",
}

let client: Client | null = null

function getNotion(): Client | null {
  const token = optionalEnv("NOTION_TOKEN")
  const dataSource = optionalEnv("NOTION_SPONSORS_DATA_SOURCE_ID")
  if (!token || !dataSource) return null
  if (!client) client = new Client({ auth: token })
  return client
}

export function notionConfigured(): boolean {
  return Boolean(optionalEnv("NOTION_TOKEN") && optionalEnv("NOTION_SPONSORS_DATA_SOURCE_ID"))
}

const rt = (value: string) => [{ type: "text" as const, text: { content: value.slice(0, 2000) } }]

export interface SponsorRowInput {
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
  purchaseOrderNumber?: string
  needsW9?: boolean
  wantsBooth?: boolean
  wantsMentorOrJudge?: boolean
  interestedInChallengePrize?: boolean
  notes?: string
  stripeCustomerId?: string
  stripeInvoiceUrl?: string
  logoUrl?: string
}

// Build a Notion properties object, omitting blanks. Typed loosely because the
// SDK's generated property union is unwieldy; values follow Notion's API shapes.
function buildProperties(input: Partial<SponsorRowInput>): Record<string, unknown> {
  const p: Record<string, unknown> = {}
  if (input.organizationName) p["Organization"] = { title: rt(input.organizationName) }
  if (input.publicSponsorName) p["Public name"] = { rich_text: rt(input.publicSponsorName) }
  if (input.tier) p["Tier"] = { select: { name: TIER_LABEL[input.tier] } }
  if (typeof input.amountCents === "number") p["Amount"] = { number: input.amountCents / 100 }
  if (input.paymentPreference) p["Payment preference"] = { select: { name: PREFERENCE_LABEL[input.paymentPreference] } }
  if (input.status) p["Status"] = { select: { name: STATUS_LABEL[input.status] } }
  if (input.contactName) p["Contact name"] = { rich_text: rt(input.contactName) }
  if (input.contactEmail) p["Contact email"] = { email: input.contactEmail }
  if (input.contactPhone) p["Contact phone"] = { phone_number: input.contactPhone }
  if (input.billingEmail) p["Billing email"] = { email: input.billingEmail }
  if (input.purchaseOrderNumber) p["PO number"] = { rich_text: rt(input.purchaseOrderNumber) }
  if (typeof input.needsW9 === "boolean") p["Needs W-9"] = { checkbox: input.needsW9 }
  if (typeof input.wantsBooth === "boolean") p["Booth"] = { checkbox: input.wantsBooth }
  if (typeof input.wantsMentorOrJudge === "boolean") p["Mentor/Judge"] = { checkbox: input.wantsMentorOrJudge }
  if (typeof input.interestedInChallengePrize === "boolean") p["Challenge/Prize"] = { checkbox: input.interestedInChallengePrize }
  if (input.notes) p["Notes"] = { rich_text: rt(input.notes) }
  if (input.stripeCustomerId) p["Stripe customer ID"] = { rich_text: rt(input.stripeCustomerId) }
  if (input.stripeInvoiceUrl) p["Stripe invoice"] = { url: input.stripeInvoiceUrl }
  if (input.logoUrl) p["Logo URL"] = { url: input.logoUrl }
  return p
}

/** Create a sponsor row. Returns the Notion page id, or null on failure/unconfigured. */
export async function createSponsorRow(input: SponsorRowInput): Promise<string | null> {
  const notion = getNotion()
  if (!notion) return null
  const dataSourceId = optionalEnv("NOTION_SPONSORS_DATA_SOURCE_ID")!
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const page = await notion.pages.create({
      parent: { type: "data_source_id", data_source_id: dataSourceId },
      properties: buildProperties(input) as any,
    } as any)
    return page.id
  } catch (err) {
    console.error("[notion] createSponsorRow failed:", err instanceof Error ? err.message : err)
    return null
  }
}

export interface SponsorRowPatch {
  status?: SponsorStatus
  stripeInvoiceUrl?: string
  amountCents?: number
}

/** Find the sponsor row by Stripe customer id and apply a patch. Best-effort. */
export async function updateSponsorRowByCustomerId(stripeCustomerId: string, patch: SponsorRowPatch): Promise<void> {
  const notion = getNotion()
  if (!notion) return
  const dataSourceId = optionalEnv("NOTION_SPONSORS_DATA_SOURCE_ID")!
  try {
    const res = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: { property: "Stripe customer ID", rich_text: { equals: stripeCustomerId } },
      page_size: 1,
    })
    const page = res.results[0]
    if (!page) {
      console.warn(`[notion] no sponsor row for customer ${stripeCustomerId}`)
      return
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await notion.pages.update({ page_id: page.id, properties: buildProperties(patch) as any } as any)
  } catch (err) {
    console.error("[notion] updateSponsorRowByCustomerId failed:", err instanceof Error ? err.message : err)
  }
}

/** Update a sponsor row directly by its Notion page id. Best-effort. */
export async function updateSponsorRow(pageId: string, patch: SponsorRowPatch): Promise<void> {
  const notion = getNotion()
  if (!notion) return
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await notion.pages.update({ page_id: pageId, properties: buildProperties(patch) as any } as any)
  } catch (err) {
    console.error("[notion] updateSponsorRow failed:", err instanceof Error ? err.message : err)
  }
}
