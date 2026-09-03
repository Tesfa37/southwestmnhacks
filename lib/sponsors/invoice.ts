// Stripe Invoicing for "send me an invoice" sponsorships. Hosted invoice payable
// by card or bank transfer (ACH enabled in Stripe settings), on net terms. By
// default invoices are created as DRAFTS for manual review; set
// SPONSOR_AUTO_SEND_INVOICES=true to finalize + send automatically.

import { getStripe } from "@/lib/stripe"
import { EVENT_NAME } from "@/lib/config"
import { autoSendInvoices, invoiceDaysUntilDue } from "@/lib/env"
import { INVOICE_FOOTER_NOTE } from "./legal"
import { tierLabel, type Tier } from "./tiers"
import type { SponsorStatus } from "./status"

export interface InvoiceInput {
  customerId: string
  tier: Tier
  amountCents: number
  metadata: Record<string, string>
}

export interface InvoiceResult {
  invoiceId: string
  hostedInvoiceUrl: string | null
  status: SponsorStatus
}

export async function createSponsorInvoice(input: InvoiceInput): Promise<InvoiceResult> {
  const stripe = getStripe()
  const description = `${EVENT_NAME} ${tierLabel(input.tier)} Sponsorship`

  // Create the (draft) invoice first so we can attach the line item to it
  // explicitly, rather than relying on pending-item auto-attach behavior.
  // Stripe has no CC: the hosted invoice goes to customer.email and nowhere else.
  // InvoiceCreateParams carries no cc/bcc/additional-recipient field (stripe@22),
  // invoices.sendInvoice takes only `expand`, and Invoice.customer_email is
  // read-only. upsertSponsorCustomer therefore points customer.email at the
  // billing address; the contact stays on the customer metadata and Notion row.
  const invoice = await stripe.invoices.create({
    customer: input.customerId,
    collection_method: "send_invoice",
    days_until_due: invoiceDaysUntilDue(),
    description,
    footer: INVOICE_FOOTER_NOTE,
    auto_advance: false,
    metadata: input.metadata,
    // Payment methods (card / us_bank_account) come from the Stripe account's
    // invoice settings, enabled at go-live — we don't hard-code them here so a
    // not-yet-enabled method can't error invoice creation.
  })

  await stripe.invoiceItems.create({
    customer: input.customerId,
    invoice: invoice.id,
    amount: input.amountCents,
    currency: "usd",
    description,
    metadata: input.metadata,
  })

  if (autoSendInvoices()) {
    // Finalizes and emails the hosted invoice to the customer.
    const sent = await stripe.invoices.sendInvoice(invoice.id!)
    return {
      invoiceId: sent.id!,
      hostedInvoiceUrl: sent.hosted_invoice_url ?? null,
      status: "INVOICE_SENT",
    }
  }

  // Draft — left for manual review/send in the Stripe Dashboard.
  return {
    invoiceId: invoice.id!,
    hostedInvoiceUrl: invoice.hosted_invoice_url ?? null,
    status: "INVOICE_DRAFTED",
  }
}
