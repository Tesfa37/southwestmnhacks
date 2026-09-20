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
- `about/page.tsx` - **the organization's page**, as opposed to the event pages that are the rest of the site. Carries the mission, programs, dated history, founders, and the legal identity block (legal name, 501(c)(3), EIN, full street address). Built for nonprofit verification (Google for Nonprofits rejected an application because none of this was on the site), so **do not thin out the "Organization details" block for visual balance** — name, status, EIN and street address must stay together and rendered as text.
- `resources`, `rules`, `safety`, `code-of-conduct`, `privacy`, `terms`, `refunds`, `contact`
- `not-found.tsx` (styled 404), `error.tsx` (minimal boundary)
- `sitemap.ts` (fixed `SITE_UPDATED` dates - bump when content changes), `robots.ts` (sponsor flow disallowed), `manifest.ts`
- Sign-ups are **waitlist-only**: an external Google Form (`WAITLIST_FORM_URL` in `lib/config.ts`); there is no `/register` route. `WAITLIST_NOTE` in the same file is the single wording of "this adds you to the waitlist, not a confirmed spot" — every surface renders it verbatim, never a paraphrase.

### Event-phase gating (important pattern)
- `lib/event-phase.ts` - `getEventPhase()` returns `"open" | "closed" | "live" | "ended"` from `WAITLIST_CLOSE_AT` / `EVENT_START_AT` / `EVENT_END_AT` in `lib/config.ts`. Single source of truth for date logic (the countdown timer imports its MS constants from here).
- **The waitlist is CLOSED** as of Sept 9, 8:20 AM CT. It ran past the Sept 8 registration deadline, then shut early: `WAITLIST_CLOSE_AT` now carries its own literal rather than aliasing `EVENT_START_AT`. So `"closed"` is the phase the site is in today, and the countdown shows "Event begins in" counting to doors. Keep `WAITLIST_CLOSE_AT <= EVENT_START_AT`; `__tests__/event-phase.test.ts` asserts the ordering and that the close instant is in the past. Reopening sign-ups means moving that literal forward — nothing else.
- `components/waitlist-cta.tsx` - the ONLY way to render a sign-up CTA. `WaitlistCta` variants: header-desktop, header-mobile, hero, section, footer-link; the open-phase label is always "Join the waitlist". Currently renders "Waitlist closed" everywhere (sign-ups shut Sept 9), and switches to Devpost-gallery CTAs after the event. Every call site passes `initialPhase` so SSR HTML and hydration agree. The same file exports `WaitlistNote` (the `WAITLIST_NOTE` sentence) and `WaitlistDeadline`; both are *siblings*, not part of the CTA, so each surface places them in its own layout. Both **self-gate on the phase** as well as taking the caller's `phase === "open"` check — pages are ISR'd hourly, and that second gate is what stops a stale cache showing the note under a "Waitlist closed" button. Use `colorClassName` to replace their colour preset outright rather than fighting Tailwind precedence.
- Homepage and recap use ISR (hourly) so server-rendered JSON-LD (`offers.availability`, `validThrough`) and phase-conditional copy stay current.
- QA: set `NEXT_PUBLIC_EVENT_PHASE=closed|live|ended` in `.env.local` to preview a phase. **Never set it in the Vercel environment** - it hard-locks the deployed site.

### Sponsor funnel (live payments)
- Tier cards / compare table -> `/sponsor/start?tier=` (helper: `sponsorInquiryUrl(slug)` in `lib/sponsor.ts`) -> `POST /api/sponsors/create` -> Stripe Customer -> Checkout / Invoice / record-only -> Notion row -> Resend notifications. Server-authoritative pricing in `lib/sponsors/tiers.ts`.
- `SPONSOR_DEADLINE` (config) = commit-by date for full benefits (t-shirt, challenge prompt); copy-only, nothing auto-gates on it.
- Sponsor logos: `lib/sponsors/partners.ts` is the single source for the homepage grid (`components/home-sponsors.tsx`), the `/sponsor` wall (`components/partner-logo-wall.tsx`), and the hero strip (`components/home/sponsor-strip.tsx`). All three render one logo via `components/partner-logo.tsx`, which links it only when `href` is set (omit `href` when we hold a logo but have no confirmed URL). `PartnerTier` = the four cash tiers plus four non-cash kinds: `partnership` (single-slot hero card), `supported_by`, `campus_partner`, `in_kind` (mirrors the funnel tier in `tiers.ts`). **Tier is data, never displayed** — no surface renders a tier label; its only behavioural use is picking the hero card. Don't reintroduce per-card pills: ten partners across seven tiers meant colour grouped nothing, and the labels are sponsor-sales language aimed at students.
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
- Layout: `header.tsx` (**server** wrapper that resolves `getEventPhase()` and hands it to `header-client.tsx`, which holds the interactive nav and takes `variant="light"|"dark"` — homepage passes dark). Every `<Header />` call site is a server component, and it must stay that way: rendering it from a client component pulls it into the client bundle and reintroduces the hydration mismatch the split exists to fix. `footer.tsx` (server + client WaitlistCta island; dark, carries the legal/address line)
- **Homepage is "The Record"**: `app/page.tsx` renders `components/home-record/record-home.tsx` — `record-hero` (group photo as Exhibit A), full-bleed `sponsor-strip` marquee, `record-press`, `receipts`, `record-details`, `record-people`, `record-winners`, `record-faq`, `record-sponsors`. A daylight editorial register: paper ground `#FAFAF8`, mono eyebrows, hairline-ruled bands, and orange `evidence-stamp` on genuine artifacts only.
- Record vocabulary lives in `components/home-record/tokens.ts`: `DISPLAY` (Archivo, h1 + section h2s only), `CARD_TITLE` (Geist, card headings), `PAPER`/`INK`/`MUTED`, and `ACTION_PILL`. Action hierarchy is filled gradient pill (`WaitlistCta`) > `ACTION_PILL` outline (card actions) > inline underlined text (links inside sentences) — keep new links in the right tier. Archivo is loaded in `app/layout.tsx` and used by ~9 elements; everything else is Geist so other pages need no re-typesetting.
- **`components/home/` is the runner-up design, not production.** `home-stage.tsx` takes `tone="light"|"dark"` reading classes from `components/home/tone.ts`; it only renders on `/preview/home/{daylight,classic,cinematic,video/*}`. `home-faq.tsx` still exports `buildFaqs(phase)`, which BOTH `record-faq` and the FAQ JSON-LD in `app/page.tsx` consume — edit FAQ copy there. `stats-strip.tsx` + `lib/event-stats.ts` are dormant.
- Homepage design candidates live on `/preview/home` (`record` = live, plus `daylight`, `classic`, `cinematic`, `strip/*`, `video/*`). All are noindex + robots-disallowed. Switching production is a one-line change in `app/page.tsx`, but check anchors first: `#main`, `#faq`, and `#receipts` are linked from the header, footer, and 404.
- Dark-stage vocabulary: cards `bg-white/5 ring-1 ring-white/10`, body `text-white/70`, muted `text-white/50`, links `text-blue-400 hover:text-blue-300`, frosted-over-photo `bg-black/55 backdrop-blur-sm ring-1 ring-white/15`. Shared components take opt-in props with light defaults: Header `variant`, CountdownTimer `tone`, WaitlistCta `onDark`, ConsentShare `onDark` — never restyle their default branches.
- Recap sections: `event-recap.tsx`, `winners.tsx`, `appreciation.tsx` (used on `/recap` only)
- Sponsor page: `sponsor-hero`, `sponsor-benefits`, `sponsor-day-timeline`, `sponsor-proof` (+ `partner-logo-wall`), `sponsor-tiers`, `sponsor-form`, `sponsor-faq`, `floating-sponsor-cta`
- UI primitives in `components/ui/`: only `accordion.tsx` and `button.tsx`

### Canonical copy (keep consistent everywhere)
- Duration: "24-hour overnight hackathon" (doors 8 AM Sat, Devpost submissions due 8 AM Sun, awards after the Sunday presentations — no clock time is promised for awards or the close)
- Eligibility: students ages 14+, high school through university, plus recent graduates within 1 year
- **Never describe the ORGANIZATION as student-run, student-founded, or run by students.** The founders are professionals in their fields; that framing undersells the nonprofit to sponsors, grant-makers and verifiers. Say "a nonprofit based in southwestern Minnesota", name the Co-Founders, and state that nobody draws a salary. This is about the *organization* only — the **events** are still student hackathons for students ages 14+, and that wording stays (see Eligibility above).
- Brand: "Southwest MN Hacks" (spaced). Known exception: `public/og-image.png` still reads "SouthwestMN Hacks" - regenerating it from `public/og-image.svg` is an open task.
- Prizes: structure published (top 5 placements + one Creative Award for the bonus challenge + Devpost recognition for every submission), amounts "announced closer to the event". Never write the structure as 1st/2nd/3rd only — `lib/fall-2026.ts` carries all six Fall awards. March 2026 had five placements and no Creative Award, so `/events/spring-2026` copy stays top-5-only.
- Host: the Southwest MN Hacks nonprofit hosts the event; SMSU provides the venue and nothing more. Never write "hosted at SMSU" or credit a partner as host — `app/code-of-conduct/page.tsx` has the model sentence, and `PARTNERSHIP_LINE` in `lib/config.ts` is the short form. The Marshall Independent headline ("Two SMSU alum host first-ever Hackathon") is a verbatim quote and is exempt. `/terms` "Who we are" carries the independence statement; it stops short of "not affiliated" on purpose, because an SMSU student club is a listed partner and SMSU faculty judge.
- Sign-up: "Join the waitlist" / "Waitlist closed" - never "Register" or "Registration closed". "Registration" still appears on the legal and safety pages, where it correctly means the intake/check-in process for students who get a spot.

### Organization identity (`lib/config.ts`)
- `LEGAL_ENTITY_NAME`, `EIN`, `ORG_FOUNDED`/`ORG_FOUNDED_DISPLAY`, `MISSION`, `TAX_STATUS_LINE`, and the structured `ORG_ADDRESS` are the single source for every surface that states who the nonprofit is: `/about`, `/terms`, `/contact`, the footer, the Stripe invoice footer (`lib/sponsors/legal.ts`), and the Organization JSON-LD.
- **The mailing address is a residence.** It is displayed on `/about` and `/contact` only — Google's verification guidance accepts Contact *or* About *or* a site-wide footer, so two named pages plus the JSON-LD is deliberate restraint, not an oversight. **Do not add it back to the footer** or to other pages. The EIN carries no such constraint (it is public for a 501(c)(3)) and stays in the footer sitewide.
- **`ORG_ADDRESS` (1303 Birch St) is the ORGANIZATION's address; SMSU's 1501 State St is the VENUE.** Never swap them. The venue address belongs only to the Event schema's `location`; a verifier reading the university's address as ours is the bug that caused the failed verification.
- `MAILING_ADDRESS` is derived from `ORG_ADDRESS` — edit the parts, not the one-line string.
- `MISSION` is rendered verbatim on `/about`, as the Organization schema `description`, and inside all three `app/layout.tsx` descriptions. Edit it once.
- `components/org-schema.tsx` emits the `NGO` node on `/` and `/about` under a stable `@id`; the homepage Event's `organizer` references that `@id` rather than repeating a stub.
- 501(c)(3) status is stated, never turned into a deductibility promise — `lib/sponsors/legal.ts` still forbids calling sponsorships "donations" or "fully tax deductible", because sponsorships carry benefits.
- Social: `FACEBOOK_URL` / `INSTAGRAM_URL` / `LINKEDIN_URL` are the **nonprofit's own** profiles, rendered via `SOCIAL_LINKS` in the footer and on `/contact`, and fed to the Organization `sameAs`. Do not confuse them with `SCHWANS_INSTAGRAM_URL` / `SCHWANS_LINKEDIN_URL` directly above them — those are a *sponsor's* posts about the March event and belong to the Event node's `sameAs`, not the org's.
- Press: `MARSHALL_ARTICLE_SPRING_URL` / `MARSHALL_ARTICLE_FALL_URL` (near-identical URLs, like the Devpost pair). **The March headline is quoted verbatim; the September headline never is** — it calls the event an SMSU hackathon, which contradicts the host framing above. Cite and link it, don't reproduce it.

### Images
- `next.config.mjs` configures the optimizer (webp, restricted `deviceSizes`); intrinsic width/height still required
- Event photos in `public/images/` (2400x1119)
- SEO: every indexable page sets `alternates.canonical`; recap OG image is the March group photo, Fall pages use `/og-image.png`

### External services
- Vercel Analytics `track()`: `Waitlist Click` (renamed from `Register Click` when sign-ups became waitlist-only — pre-rename data lives under the old name) and `Sponsor Click` events with `location` prop; `Devpost Click` post-event
- Stripe (live) + Notion + Resend for the sponsor pipeline; secrets in `.env.local` / Vercel env

### TypeScript
- Strict mode; **build type errors are enforced** (do not re-add `ignoreBuildErrors`)

## Future TODO
- Regenerate `public/og-image.png` from the SVG spec with correct "Southwest MN Hacks" spacing
- Set up the Discord server, then flip `DISCORD_ENABLED` in `lib/config.ts`
- Swap `FACEBOOK_URL` for the canonical `facebook.com/<page-name>` URL (it is currently a `/share/` redirect, which is a weak `sameAs` signal)
- After the Fall event: build the Fall recap (consider `/recap/fall-2026` and per-event recap slugs)
