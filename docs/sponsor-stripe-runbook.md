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

1. Activate Stripe for the nonprofit (legal name + **EIN**); switch to **live** keys.
2. Register the live webhook endpoint (`https://southwestmnhacks.org/api/stripe/webhook`)
   for the events the handler covers; set the **live** `whsec_` in prod env.
3. Enable **ACH / US bank transfer** and the hosted invoice payment page; set net
   terms, invoice memo/footer (EIN, thank-you, check remit-to), and Stripe branding/logo.
4. Apply for the Stripe **nonprofit discount** (501(c)(3)).
5. Verify **southwestmnhacks.org** as a Resend sending domain; set `RESEND_FROM_EMAIL`
   to a branded address; point `SPONSOR_NOTIFY_EMAIL` at the organizer inbox.
6. Confirm `NOTION_TOKEN` + data source id are set and the integration has access.
7. Confirm receipt wording + UBI handling with the accountant.
8. Run one small **live** test payment, then refund it.
