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
- Sponsor logos: `lib/sponsors/partners.ts` is the single source for BOTH the homepage grid (`components/home-sponsors.tsx`) and the `/sponsor` wall (`components/partner-logo-wall.tsx`). Schwan's has `current: false` - flip to `true` when they confirm for Fall 2026.
- Devpost URLs (careful, near-identical): Fall = `southwest-mn-hacks.devpost.com` (`DEVPOST_FALL_URL`), March = `southwestmn-hacks.devpost.com` (`DEVPOST_SPRING_URL`).

### Styling & animation
- Tailwind CSS 4, OKLCH variables in `app/globals.css` (light theme only)
- `motion` library via `LazyMotion` + `domAnimation` + `m.` components
- CSS-only effects: `animate-aurora-*`, `animate-text-shimmer`
- **Reduced motion is honored everywhere**: the CSS media block (includes `animate-ping`) plus `useReducedMotion()` in every animated client component - copy `components/reveal.tsx`'s pattern for new ones
- A11y invariants: every page has `<main id="main">`; the root layout renders a skip link; global `:focus-visible` outline in globals.css
- `lib/images.ts` exports the shared `BLUR_DATA_URL` placeholder

### Component organization
- Layout: `header.tsx` (client), `footer.tsx` (server + client RegisterCta island)
- Homepage hero: `home-hero.tsx` composing `aurora-background`, `rotating-word`, `floating-stickers` (shared single pointermove listener), `easter-eggs`
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
- Flip Schwan's `current: true` in `lib/sponsors/partners.ts` once confirmed for Fall 2026
- After the Fall event: build the Fall recap (consider `/recap/fall-2026` and per-event recap slugs)
