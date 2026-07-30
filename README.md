# Southwest MN Hacks

Production website and sponsor platform for [Southwest MN Hacks](https://southwestmnhacks.org), a 501(c)(3) nonprofit hackathon serving southwest Minnesota, run in partnership with Aulden and hosted at Southwest Minnesota State University.

The first event ran March 21, 2026 with front-page local press coverage. **Southwest MN Hacks: Fall 2026** runs September 12 and 13, 2026 at SMSU.

**Live site:** https://southwestmnhacks.org

## What the platform does

- **Event marketing and registration funnel**, including rules, safety, code of conduct, refunds, terms, privacy, resources, contact, and event recap pages.
- **Date-driven registration states.** The site derives an event phase (`open`, `closed`, `live`, `ended`) from configured timestamps at request time, and every registration surface renders accordingly. A `NEXT_PUBLIC_EVENT_PHASE` override exists for local QA only.
- **Native sponsor intake with real payments.** Sponsors pick a tier ($500, $1,000, $2,000, $5,000, custom amount, or in-kind) and a payment preference, and the server routes the submission to the right rail:
  - **Stripe Checkout** (card or ACH) for pay-now sponsors
  - **Stripe Invoicing** (draft-first by default, configurable net terms) for invoice requests
  - **Record-only** for check, W-9 vendor setup, in-kind, and talk-first submissions that need human follow-up
- **Server-authoritative pricing.** Tier amounts live server-side; client-supplied amounts are ignored for fixed tiers, and custom amounts above a ceiling route to manual review instead of an automatic charge.
- **Webhook-driven status tracking** from Stripe events, with sponsor records synced to a Notion pipeline database and organizer notifications sent through Resend. Notion and Resend degrade gracefully: if unconfigured, those steps are skipped and Stripe remains the source of truth.

## Architecture

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4, Radix UI primitives, Motion
- **Payments:** Stripe (Checkout Sessions, Invoices, webhooks at `app/api/stripe/webhook`)
- **Data/ops:** Notion API (sponsor pipeline sync), Resend (transactional email)
- **Validation:** Zod schemas for sponsor submissions
- **Testing:** Vitest unit tests covering sponsor schema validation, payment routing, status transitions, deadline logic, and event-phase derivation (`__tests__/`)
- **Deployment:** Vercel

Key sponsor logic lives in `lib/sponsors/` (tiers, payment preferences, routing, checkout, invoicing, status, webhook handlers) and is written as pure functions where possible so the routing rules are unit-testable. Operational docs for the payment flow are in `docs/`.

## Ownership

I built and operate this platform end to end as a co-founder of Southwest MN Hacks. That covers requirements and payment policy, architecture and integration decisions, implementation, testing, the Git and Vercel deployment workflow, and ongoing Stripe, Notion, and Resend operations.

Development is AI-assisted: I use Claude and Claude Code as implementation tools, and I own every requirement, technical decision, review, test, deploy, and iteration.

## Local setup

```bash
git clone https://github.com/Tesfa37/southwestmnhacks.git
cd southwestmnhacks
npm install
cp .env.example .env.local   # then fill in values
npm run dev
```

Verify:

```bash
npm test        # Vitest suite
npm run lint    # ESLint
npm run build   # production build
```

## Environment variables

See [`.env.example`](.env.example) for the full annotated list. Summary:

| Variable | Required | Purpose |
|----------|----------|---------|
| `STRIPE_SECRET_KEY` | Yes | Stripe API access (use a test key in development) |
| `STRIPE_WEBHOOK_SECRET` | Yes | Webhook signature verification (`stripe listen` in dev) |
| `NEXT_PUBLIC_SITE_URL` | Yes | Absolute origin for Checkout success/cancel URLs |
| `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `SPONSOR_NOTIFY_EMAIL` | No | Organizer and confirmation emails; skipped if unset |
| `NOTION_TOKEN`, `NOTION_SPONSORS_DATA_SOURCE_ID` | No | Sponsor pipeline sync; skipped if unset |
| `SPONSOR_AUTO_SEND_INVOICES` | No | `false` (default) creates draft invoices for manual review |
| `SPONSOR_INVOICE_DAYS_UNTIL_DUE` | No | Invoice net terms in days (default 30) |
| `NEXT_PUBLIC_EVENT_PHASE` | No | Local QA phase override; never set in production |

Develop and test against Stripe test mode before touching live keys.
