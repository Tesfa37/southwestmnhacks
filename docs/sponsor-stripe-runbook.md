# Sponsor flow — Stripe runbook

Setup, local testing, and go-live for the `/sponsor/start` flow. Build and test
everything in **Stripe TEST mode** first.

## Environment variables

Copy `.env.example` to `.env.local` and fill in. See that file for the full list.
Summary:

| Variable | Required | Notes |
|---|---|---|
| `STRIPE_SECRET_KEY` | yes | `sk_test_…` in dev. |
| `STRIPE_WEBHOOK_SECRET` | yes | `whsec_…` from `stripe listen` (dev) or the registered endpoint (prod). |
| `NEXT_PUBLIC_SITE_URL` | yes | Origin for Checkout success/cancel URLs. |
| `RESEND_API_KEY` | no* | Emails skipped if unset (non-fatal). |
| `RESEND_FROM_EMAIL` | no | Verified sender; defaults to Resend onboarding domain in dev. |
| `SPONSOR_NOTIFY_EMAIL` | no* | Where organizer notifications go. |
| `SPONSOR_AUTO_SEND_INVOICES` | no | `false` (default) = draft for review; `true` = finalize + send. |
| `SPONSOR_INVOICE_DAYS_UNTIL_DUE` | no | Net terms, default 30. |
| `NOTION_TOKEN` | no* | Notion sync skipped if unset (non-fatal). |
| `NOTION_SPONSORS_DATA_SOURCE_ID` | no* | `118000e5-8953-4aeb-9d65-5bc56dcf50f4` (provisioned). |

\* Stripe is the only hard dependency. Notion + Resend degrade gracefully so you can
test the payment flow before they're configured.

Tier amounts are server-side in `lib/sponsors/tiers.ts` (dynamic `price_data`), so
no `STRIPE_PRICE_*` IDs are needed.

## Notion integration (one-time)

The database "Southwest MN Hacks — Sponsors" already exists
(`https://app.notion.com/p/5151e9c480f44fbeb192908554cca809`). To let the app write to
it:

1. Create an **internal integration** at notion.so/my-integrations → copy its token
   into `NOTION_TOKEN`.
2. Open the database → **•••** → **Connections** → add your integration.
3. Set `NOTION_SPONSORS_DATA_SOURCE_ID` (value above).
4. Don't rename the Tier / Payment preference / Status select options — they're
   written by the app.

## Local testing with the Stripe CLI

```bash
stripe login
# Forward events to your local webhook and copy the printed whsec_ into .env.local:
stripe listen --forward-to localhost:3000/api/stripe/webhook
# In another terminal, run the dev server and drive events:
pnpm dev
stripe trigger checkout.session.completed
stripe trigger payment_intent.succeeded
stripe trigger invoice.paid
stripe trigger charge.refunded
```

Test cards: `4242 4242 4242 4242` (success), `4000 0000 0000 0002` (decline). For ACH
use Stripe's test US bank account in Checkout. (See the `stripe:test-cards` skill.)

## Test checklist

Unit tests: `pnpm test` (routing, schema, idempotency). End-to-end in test mode:

1. Bronze pay-now card → Customer + Checkout, redirect to Stripe, webhook sets **Paid**.
2. Silver pay-now ACH → **Payment pending**, then `async_payment_succeeded` → **Paid**.
3. Gold card → allowed, fee note shown; invoice/ACH tagged "Recommended".
4. Platinum invoice, `SPONSOR_AUTO_SEND_INVOICES=false` → draft, **Invoice drafted**.
5. Platinum invoice, auto-send `true` → **Invoice sent**, pay → **Invoice paid**.
6. Custom $300 card → Checkout at the entered amount.
7. Custom $50 → rejected client + server (below $250 min).
8. Custom $8,000 → manual review → **Manual follow-up**, no auto charge.
9. In-kind / check / W-9 / talk-first → record-only Customer + Notion row + emails.
10. Webhook replayed twice → second is a no-op (status unchanged), still 200.
11. Tampered amount (client sends $1 for Gold) → charged $2,000 regardless.
12. Bad webhook signature → 400.
13. Success page shows status from the session but never marks paid on its own.

## Go-live checklist

1. Activate Stripe for the nonprofit (legal name + **EIN**); switch to **live** keys. ✅
2. Register the live webhook endpoint at **`https://www.southwestmnhacks.org/api/stripe/webhook`**
   (use the **www** host; the apex `southwestmnhacks.org` 307-redirects and Stripe does not
   follow redirects for webhooks) for the 10 events the handler covers; set the **live**
   `whsec_` in the Vercel **Production** env. ✅
3. Enable **ACH / US bank transfer** and the hosted invoice payment page; set net terms,
   invoice memo/footer (EIN, thank-you, check remit-to), and Stripe branding/logo.
   See **Live dashboard configuration** below.
4. Apply for the Stripe **nonprofit discount** (501(c)(3)).
5. Resend sending domain **`notifications.southwestmnhacks.org`** is already verified;
   `RESEND_FROM_EMAIL` = `Southwest MN Hacks <noreply@notifications.southwestmnhacks.org>`,
   `SPONSOR_NOTIFY_EMAIL` = organizer inbox. ✅
6. Confirm `NOTION_TOKEN` + data source id are set and the integration has access. ✅
7. Confirm receipt wording + UBI handling with the accountant.
8. Run one small **live** test payment, then refund it.

Note: rolling the live `STRIPE_SECRET_KEY` (e.g. after exposure) requires a **production
redeploy** to take effect — Vercel snapshots env vars per deployment. Update the value in
Vercel Production, then redeploy.

## Live dashboard configuration (step by step)

Do all of this with the Stripe dashboard in **Live mode** (the toggle must not say Test/Sandbox).

**A. Turn on bank payment methods**
- A1 — on-site ACH (the "Pay now by bank transfer (ACH)" option): **Settings → Payment methods**
  (`dashboard.stripe.com/settings/payment_methods`) → turn on **US bank account**. Card is on by default.
- A2 — invoices: **Settings → Billing → Invoices** (`dashboard.stripe.com/settings/billing/invoice`)
  → **Default payment methods** → **Edit payment methods** → under **Bank debits** turn on
  **ACH Direct Debit**; optionally under **Bank transfer** turn on (virtual account / wire). If
  Bank transfer is missing, enable it first under Settings → Payment methods.

**B. Invoice settings (net terms, memo, footer with EIN + remit-to)** — same Invoices page:
- **Default payment terms** → Net 30 (matches `SPONSOR_INVOICE_DAYS_UNTIL_DUE=30`); tick
  "include a link to a payment page in the invoice email".
- **Default memo** (optional): "Thank you for sponsoring Southwest MN Hacks."
- **Default footer**: remit-to + legal, e.g. "Southwest MN Hacks is a 501(c)(3) nonprofit
  (EIN XX-XXXXXXX). Checks payable to Southwest MN Hacks, <mailing address>. Sponsorship
  payments may include recognition or event-related benefits; consult your tax advisor
  regarding deductibility."
- **Invoice tax information** section (scroll down) → add the **EIN** as a US tax ID.

**C. Branding** — **Settings → Branding** (`dashboard.stripe.com/settings/branding`): upload
**Icon** (square) and **Logo** (non-square; shows on Checkout + invoice PDFs), PNG/JPG <512kb
≥128×128; set **Brand color** and **Accent color**.

**D. Public business info** — **Settings → Public details** (`dashboard.stripe.com/settings/public`):
support email (`sponsors@southwestmnhacks.org`), business mailing address, optional phone, and the
real site URLs (replace any `example.com` placeholders):
- Business website → `https://www.southwestmnhacks.org`
- Customer support URL → `https://www.southwestmnhacks.org/contact`
- Privacy policy URL → `https://www.southwestmnhacks.org/privacy`
- Terms of service URL → `https://www.southwestmnhacks.org/terms`
- (Optional) Checkout Settings → link the refund policy `https://www.southwestmnhacks.org/refunds`.

**E. Verify** — create a small invoice (sandbox or a live one to yourself), open the Hosted
Invoice Page, confirm ACH appears and the footer/EIN/branding render correctly.
