# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Next.js 16 site for "Southwest MN Hacks" (southwestmnhacks.org), a student hackathon nonprofit in Marshall, MN. The site currently promotes the **Fall 2026 event (September 12-13, 2026 at SMSU)**; the March 2026 event lives at `/recap`. Built with React 19, TypeScript, and Tailwind CSS 4, shadcn/ui ("new-york"). Deployed on Vercel.

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build for production (type checking enforced)
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm test         # Vitest (__tests__/)
```

## Architecture

### Routing (App Router, `app/`)
- `page.tsx` - Main landing page (server component, ISR `revalidate = 3600`)
- `recap/page.tsx` - March 2026 recap (ISR), metadata in `recap/layout.tsx`
- `sponsor/page.tsx` + `sponsor/start|success|cancel` - sponsor funnel (see below)
- `resources`, `rules`, `safety`, `code-of-conduct`, `privacy`, `terms`, `refunds`, `contact`
- `not-found.tsx` (styled 404), `error.tsx` (minimal boundary)
- `sitemap.ts` (fixed `SITE_UPDATED` dates - bump when content changes), `robots.ts` (sponsor flow disallowed), `manifest.ts`
- Registration is an external Google Form (`REGISTRATION_FORM_URL` in `lib/config.ts`); there is no `/register` route.

### Event-phase gating (important pattern)
- `lib/event-phase.ts` - `getEventPhase()` returns `"open" | "closed" | "live" | "ended"` from `REGISTRATION_CLOSE_AT` / `EVENT_START_AT` / `EVENT_END_AT` in `lib/config.ts`. Single source of truth for date logic (the countdown timer imports its MS constants from here).
- `components/register-cta.tsx` - the ONLY way to render a Register CTA. Variants: header-desktop, header-mobile, hero, section, footer-link. Automatically switches to "Registration closed" after Sept 8 and to Devpost-gallery CTAs after the event. Server call sites pass `initialPhase={getEventPhase()}`; client sites use the hook default.
- Homepage and recap use ISR (hourly) so server-rendered JSON-LD (`offers.availability`, `validThrough`) and phase-conditional copy stay current.
- QA: set `NEXT_PUBLIC_EVENT_PHASE=closed|live|ended` in `.env.local` to preview a phase. **Never set it in the Vercel environment** - it hard-locks the deployed site.

### Sponsor funnel (live payments)
- Tier cards / compare table -> `/sponsor/start?tier=` (helper: `sponsorInquiryUrl(slug)` in `lib/sponsor.ts`) -> `POST /api/sponsors/create` -> Stripe Customer -> Checkout / Invoice / record-only -> Notion row -> Resend notifications. Server-authoritative pricing in `lib/sponsors/tiers.ts`.
- `SPONSOR_DEADLINE` (config) = commit-by date for full benefits (t-shirt, challenge prompt); copy-only, nothing auto-gates on it.
- Sponsor logos: `lib/sponsors/partners.ts` is the single source for the homepage grid (`components/home-sponsors.tsx`), the `/sponsor` wall (`components/partner-logo-wall.tsx`), and the hero strip (`components/home/sponsor-strip.tsx`). All three render one logo via `components/partner-logo.tsx`, which links it only when `href` is set (omit `href` when we hold a logo but have no confirmed URL). `PartnerTier` = the four cash tiers plus four non-cash kinds: `partnership` (single-slot hero card), `supported_by`, `campus_partner`, `in_kind` (mirrors the funnel tier in `tiers.ts`). **Tier is data, never displayed** — no surface renders a tier label; its only behavioural use is picking the hero card. Don't reintroduce per-card pills: nine partners across seven tiers meant colour grouped nothing, and the labels are sponsor-sales language aimed at students.
- **Partner display order is the hand-picked `PARTNERS` array order, deliberately NOT tier-ranked. Do not add a sort.** Each entry's `width`/`height` must be the asset's true pixel size or `object-contain` letterboxes it.
- Devpost URLs (careful, near-identical): Fall = `southwest-mn-hacks.devpost.com` (`DEVPOST_FALL_URL`), March = `southwestmn-hacks.devpost.com` (`DEVPOST_SPRING_URL`).

### Styling & animation
- Tailwind CSS 4, OKLCH variables in `app/globals.css` (light theme only)
- `motion` library via `LazyMotion` + `domAnimation` + `m.` components
- CSS-only effects: `animate-aurora-*`, `animate-text-shimmer`
- **Reduced motion is honored everywhere**: the CSS media block (includes `animate-ping`) plus `useReducedMotion()` in every animated client component - copy `components/reveal.tsx`'s pattern for new ones
- A11y invariants: every page has `<main id="main">`; the root layout renders a skip link; global `:focus-visible` outline in globals.css
- `lib/images.ts` exports the shared `BLUR_DATA_URL` placeholder

### Component organization
- Layout: `header.tsx` (client, `variant="light"|"dark"` — homepage passes dark), `footer.tsx` (server + client RegisterCta island; dark, carries the legal/address line)
- **Homepage is "The Record"**: `app/page.tsx` renders `components/home-record/record-home.tsx` — `record-hero` (group photo as Exhibit A), full-bleed `sponsor-strip` marquee, `record-press`, `receipts`, `record-details`, `record-people`, `record-winners`, `record-faq`, `record-sponsors`. A daylight editorial register: paper ground `#FAFAF8`, mono eyebrows, hairline-ruled bands, and orange `evidence-stamp` on genuine artifacts only.
- Record vocabulary lives in `components/home-record/tokens.ts`: `DISPLAY` (Archivo, h1 + section h2s only), `CARD_TITLE` (Geist, card headings), `PAPER`/`INK`/`MUTED`, and `ACTION_PILL`. Action hierarchy is filled gradient pill (`RegisterCta`) > `ACTION_PILL` outline (card actions) > inline underlined text (links inside sentences) — keep new links in the right tier. Archivo is loaded in `app/layout.tsx` and used by ~9 elements; everything else is Geist so other pages need no re-typesetting.
- **`components/home/` is the runner-up design, not production.** `home-stage.tsx` takes `tone="light"|"dark"` reading classes from `components/home/tone.ts`; it only renders on `/preview/home/{daylight,classic,cinematic,video/*}`. `home-faq.tsx` still exports `buildFaqs(phase)`, which BOTH `record-faq` and the FAQ JSON-LD in `app/page.tsx` consume — edit FAQ copy there. `stats-strip.tsx` + `lib/event-stats.ts` are dormant.
- Homepage design candidates live on `/preview/home` (`record` = live, plus `daylight`, `classic`, `cinematic`, `strip/*`, `video/*`). All are noindex + robots-disallowed. Switching production is a one-line change in `app/page.tsx`, but check anchors first: `#main`, `#faq`, and `#receipts` are linked from the header, footer, and 404.
- Dark-stage vocabulary: cards `bg-white/5 ring-1 ring-white/10`, body `text-white/70`, muted `text-white/50`, links `text-blue-400 hover:text-blue-300`, frosted-over-photo `bg-black/55 backdrop-blur-sm ring-1 ring-white/15`. Shared components take opt-in props with light defaults: Header `variant`, CountdownTimer `tone`, RegisterCta `onDark`, ConsentShare `onDark` — never restyle their default branches.
- Recap sections: `event-recap.tsx`, `winners.tsx`, `appreciation.tsx` (used on `/recap` only)
- Sponsor page: `sponsor-hero`, `sponsor-benefits`, `sponsor-day-timeline`, `sponsor-proof` (+ `partner-logo-wall`), `sponsor-tiers`, `sponsor-form`, `sponsor-faq`, `floating-sponsor-cta`
- UI primitives in `components/ui/`: only `accordion.tsx` and `button.tsx`

### Canonical copy (keep consistent everywhere)
- Duration: "24-hour overnight hackathon" (doors 8 AM Sat, awards wrap by 10 AM Sun)
- Eligibility: students ages 14+, high school through university, plus recent graduates within 1 year
- Brand: "Southwest MN Hacks" (spaced). Known exception: `public/og-image.png` still reads "SouthwestMN Hacks" - regenerating it from `public/og-image.svg` is an open task.
- Prizes: structure published (1st/2nd/3rd + Devpost recognition), amounts "announced closer to the event"

### Images
- `next.config.mjs` configures the optimizer (webp, restricted `deviceSizes`); intrinsic width/height still required
- Event photos in `public/images/` (2400x1119)
- SEO: every indexable page sets `alternates.canonical`; recap OG image is the March group photo, Fall pages use `/og-image.png`

### External services
- Vercel Analytics `track()`: `Register Click` and `Sponsor Click` events with `location` prop; `Devpost Click` post-event
- Stripe (live) + Notion + Resend for the sponsor pipeline; secrets in `.env.local` / Vercel env

### TypeScript
- Strict mode; **build type errors are enforced** (do not re-add `ignoreBuildErrors`)

## Future TODO
- Regenerate `public/og-image.png` from the SVG spec with correct "Southwest MN Hacks" spacing
- Set up Discord server and Instagram, then flip `DISCORD_ENABLED` in `lib/config.ts`
- After the Fall event: build the Fall recap (consider `/recap/fall-2026` and per-event recap slugs)
