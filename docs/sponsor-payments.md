# Sponsor payments & intake

How sponsors commit and pay, and how the website is wired to support it. The flow
is a native, guided intake at **`/sponsor/start`** backed by **Stripe** (money),
**Notion** (pipeline tracker), and **Resend** (email).

> **Not tax or legal advice.** The tax notes below are flags to raise with the
> nonprofit's accountant, not guidance to act on directly.

## Strategy: invoice-default, card-optional

At $2,000–$5,000, the biggest sponsors are organizations whose finance / accounts-
payable teams frequently **cannot or will not** pay by credit card on a website.
They need an invoice (sometimes a W-9 from us first) and pay by **ACH or check on
net terms**. So the form recommends invoice/ACH for Gold/Platinum (card stays
available, just nudged), while small and in-kind sponsors can pay instantly. The
form never dead-ends: every sponsor gets a clear next step.

## Architecture

Three systems, each with one job:

- **Stripe — money source of truth.** Every submission creates (or reuses, by
  email) a Stripe **Customer** with the full intake on `metadata`. Pay-now →
  **Checkout Session**; invoice → **Stripe Invoice**; non-payment paths → a Customer
  with no charge. The Stripe Dashboard is the authoritative financial record.
- **Notion — the pipeline board.** One row per sponsor in the "Southwest MN Hacks —
  Sponsors" database, updated by the webhook (inquiry → invoiced → paid). This is the
  organizers' friendly admin view. Writes are **best-effort**; Stripe stays
  authoritative if Notion ever hiccups.
- **Resend — email.** Internal organizer notification on every submission, plus
  sponsor confirmations for the non-payment paths. Pay-now / invoice confirmations
  ride on Stripe's built-in receipt + invoice emails.

The webhook (`/api/stripe/webhook`) is the **source of truth for status** — the
success page never marks anything paid from a query param.

## The flow

1. Sponsor clicks a tier on `/sponsor` → `/sponsor/start?tier=<slug>`.
2. Fills the form and picks a payment preference (card, ACH, invoice, check, W-9,
   talk-first, in-kind, custom-discussion).
3. `/api/sponsors/create` validates (zod), creates the Stripe Customer, routes by
   `decideAction()`, mirrors to Notion, and emails.
4. Pay-now → redirect to Stripe Checkout → `/sponsor/success`. Others → a tailored
   confirmation page.
5. Stripe webhooks advance the status on the Customer metadata **and** the Notion row.

Server-side tier amounts (`lib/sponsors/tiers.ts`) are authoritative — the client
amount is ignored for fixed tiers, and custom amounts are validated (min
$250, manual review over $5,000).

## Pipeline stages (the Notion "Status")

> inquiry → invoice requested/sent → paid (or check requested / in-kind pending /
> manual follow-up) → logo received

## Money notes (verify before quoting)

- **Cards:** roughly low-3% + a fixed per-transaction fee. **ACH:** materially
  cheaper. Apply for the **Stripe nonprofit discount** with 501(c)(3) status.
- **Issue invoices/receipts from the nonprofit's legal name + EIN** — *not* Aulden.
- Checks: an offline option — mark the invoice paid when the check clears; put
  remit-to in the invoice memo.

## Tax caveat (confirm with the accountant)

Sponsorship and donation have **different tax treatment**, and sponsor benefits can
raise unrelated-business-income (UBI) questions. The site deliberately avoids
"donation" / "fully tax deductible" language and tells sponsors to consult their tax
advisor. Confirm receipt wording and UBI handling before issuing at scale.

## Setup & operations

See **[sponsor-stripe-runbook.md](./sponsor-stripe-runbook.md)** for environment
variables, local testing with the Stripe CLI, the test checklist, and the go-live
steps.
