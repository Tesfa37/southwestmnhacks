# Sponsor payments & intake

How sponsors should pay, and how the website is wired to support it. This is the
operational reference behind the gated front-end (`SPONSOR_INTAKE_FORM_URL` in
`lib/config.ts`).

> **Not tax or legal advice.** The tax notes below are flags to raise with the
> nonprofit's accountant, not guidance to act on directly.

## Why invoice-first (not a "Pay Now" card button)

At $2,000–$5,000, the biggest sponsors are organizations whose finance / accounts-
payable teams frequently **cannot or will not** pay by credit card on a website.
They need an invoice (sometimes a W-9 from us first) and pay by **ACH or check on
net terms**. A card-only checkout quietly filters out exactly the sponsors we most
want. So instant card pay is a nice add-on for the small / in-kind end — **not the
primary mechanism**.

What the old per-tier `mailto:` button cost us:
- Dies silently on phones and webmail with no mail app configured (button does
  nothing).
- Hands us a subject line and **zero structured data**.
- Leads rot in an inbox with no pipeline.

The fix is **lead capture + invoicing**, framed on the page as *invoice default,
card optional*.

## The intake form (to build in Jotform)

One form, linked from every tier button and the "Ready to sponsor?" section. Fields:

- Organization name
- Contact name
- Contact email
- Contact phone
- **Tier** — prefilled from the button the sponsor clicked, via `?tier=` (set the
  Jotform field's **Unique Name** to exactly `tier`)
- Logo upload
- Billing contact + billing email
- Preferred payment: **invoice** or **card**
- PO number / notes (optional)

This alone kills the mobile-mailto failure and gives structured, trackable leads.

## Payment flow

1. **Invoice is the default.** Use Stripe Invoicing (or QuickBooks / Wave) to send
   a hosted invoice payable by **card or bank transfer**, with an automatic receipt.
2. **Card optional for the small end.** Enable Jotform's Stripe integration so
   small or in-kind sponsors who just want to click and pay can.
3. **Issue invoices/receipts from the nonprofit's name + EIN** — *not* Aulden. This
   keeps the entities clean (the site already carefully separates the two) and gives
   sponsors something clean for their books.

## Pipeline

Track every lead through these stages (a Google Sheet or Notion board is plenty):

> inquiry → agreement → invoiced → paid → logo received

## Fees (verify current rates before quoting)

- **Cards:** roughly low-3% + a fixed per-transaction fee.
- **ACH:** materially cheaper than cards.
- **Stripe nonprofit discount:** apply with 501(c)(3) status for reduced pricing.

## Tax caveat (confirm with the accountant)

Sponsorship and donation have **different tax treatment**, and sponsor benefits can
raise unrelated-business-income (UBI) questions. Confirm receipt wording and UBI
handling with whoever does the nonprofit's books before issuing receipts at scale.

## Activation checklist

When ready to switch the site from mailto to the intake form:

1. Build the Jotform with the fields above.
2. Set the **tier** field's **Unique Name** to `tier` (so `?tier=Gold` prefills it).
3. Paste the form's URL into `SPONSOR_INTAKE_FORM_URL` in `lib/config.ts`.
4. (Optional) Connect Jotform → Stripe for instant card payment.
5. Deploy. Every tier button and the "Ready to sponsor?" CTA now route to the form
   with the tier prefilled; the mailto fallback turns off automatically.
