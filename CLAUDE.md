# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 landing page for "SouthwestMN Hacks," a hackathon event that took place on March 21, 2026 in Marshall, MN. The site now serves as the post-event recap page. Built with React 19, TypeScript, and Tailwind CSS 4, using the shadcn/ui component library in the "new-york" style. Deployed on Vercel at southwestmnhacks.org.

## Commands

### Development
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## Architecture

### Framework & Routing
- **Next.js 16** with App Router
- **File-based routing** using the `app/` directory:
  - `app/page.tsx` - Main landing page (server component)
  - `app/sponsor/page.tsx` - Sponsor information page
  - `app/resources/page.tsx` - Resources for participants
  - `app/register/page.tsx` - Post-event page (shows "registration closed" message)
  - `app/rules/page.tsx` - Hackathon rules
  - `app/code-of-conduct/page.tsx` - Code of conduct
  - `app/privacy/page.tsx` - Privacy policy
  - `app/layout.tsx` - Root layout with metadata and analytics

### Styling System
- **Tailwind CSS 4** with PostCSS pipeline
- **Custom CSS variables** using OKLCH color space defined in `app/globals.css`
- **shadcn/ui components** with "new-york" variant (configured in `components.json`)
- **tw-animate-css** for animations
- Uses `cn()` utility (`lib/utils.ts`) for conditional class merging

### Component Organization
- **Page-level components** live in `components/` directory:
  - Layout: `header.tsx`, `footer.tsx`
  - Landing page sections: `event-recap.tsx`, `winners.tsx`, `appreciation.tsx` + inline sections in `app/page.tsx`
  - Sponsor page: `sponsor-hero.tsx`, `sponsor-tiers.tsx`, `sponsor-benefits.tsx`, `sponsor-form.tsx`, `sponsor-faq.tsx`
  - Resources page: `resources-hero.tsx`, `starter-kits.tsx`, `free-resources.tsx`, `workshops.tsx`, `day-of-checklist.tsx`
  - Client wrappers: `sponsor-cta-button.tsx` (wraps `track()` call for server component compatibility)
- **UI primitives** in `components/ui/` — only `accordion.tsx` and `button.tsx` are kept (all others deleted post-cleanup)
- Client components use `"use client"` directive for interactivity

### Path Aliases
TypeScript path mapping (`tsconfig.json`) resolves imports:
- `@/components` → `components/`
- `@/lib` → `lib/`
- `@/hooks` → `hooks/`
- `@/` → project root

### External Services
- **Vercel Analytics** integrated in root layout (custom event tracking via `track()`)
- **Google Forms** for sponsor applications (embedded iframe on `/sponsor`)
- **Devpost** for project submissions: https://southwestmn-hacks.devpost.com/

### Navigation
- All internal links use Next.js `<Link>` for client-side navigation
- External links use `<a>` with `target="_blank"` and `rel="noopener noreferrer"`
- Header implements responsive navigation with desktop (lg+) and mobile hamburger menu

### Images
- Event photos live in `public/images/` — compressed to max 2400px wide at quality 72 (~3 MB total, down from 94 MB)
- Sponsor logos: `public/schwans-logo.png`, `public/schwans-logo-white.png`, `public/etm-solutions-logo.jpeg`
- OG image: `public/og-image.png` (1200x630, generated from SVG spec)
- Only the first below-the-fold image (`group-photo.jpg` in `event-recap.tsx`) uses `priority`; all others lazy-load by default

## Key Patterns

### Component Architecture
Pages are composed from isolated section components:
- `/sponsor` page assembles: SponsorHero → SponsorTiers → SponsorBenefits → SponsorForm → SponsorFaq
- `/resources` page assembles: ResourcesHero → StarterKits → FreeResources → Workshops → DayOfChecklist

### Server vs Client Components
- `app/page.tsx` is a **server component** — no `"use client"` at the top
- Interactive bits that need `track()` are extracted into small client components (e.g., `sponsor-cta-button.tsx`)
- `<Accordion>` works fine server-side since the component itself handles its own client state

### Event Tracking
Custom events tracked via Vercel Analytics `track()` function:
- `Sponsor Click` with location prop (hero, header-desktop, header-mobile, sponsors-section, cta-banner)

### TypeScript Configuration
- Strict mode enabled
- Images are unoptimized (`next.config.mjs`)
- TypeScript build errors ignored in production builds

## Styling Conventions

### Color System
Custom CSS variables in OKLCH format (light theme only — dark mode removed):
- Primary colors: orange-600, blue-600, pink-600 (brand gradients)
- Neutral palette from `--background` to `--foreground`

### Responsive Design
- Mobile-first approach using Tailwind breakpoints
- Responsive typography scales: `text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl`
- Grid layouts adapt: `grid-cols-1 md:grid-cols-3`

### Component Styling
- Rounded corners: `rounded-3xl`, `rounded-2xl`, `rounded-full` for cards and buttons
- Gradients: `bg-gradient-to-r from-orange-600 via-pink-600 to-blue-600`
- Shadows: `shadow-sm`, `shadow-lg` with `hover:shadow-xl` transitions
- Backdrop blur: `bg-white/80 backdrop-blur-sm` for sticky header

### Fonts
- Geist (sans-serif) and Geist Mono loaded via `next/font/google`
- Applied as CSS variables `--font-geist` and `--font-geist-mono` on body

## Adding shadcn/ui Components

shadcn/ui is configured with:
- Style: "new-york"
- Base color: "neutral"
- CSS variables enabled
- Icon library: lucide-react

Only `accordion` and `button` are currently installed. To add new components, follow existing patterns in `components/ui/`.

## Future TODO
- Add actual Schwan's logo file if higher-res version becomes available
- Set up Discord server and Instagram, then re-add links to footer
