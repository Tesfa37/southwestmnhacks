# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 landing page for "SouthwestMN Hacks," a hackathon event scheduled for March 21, 2026 in Marshall, MN. The site is built with React 19, TypeScript, and Tailwind CSS 4, using the shadcn/ui component library in the "new-york" style. Deployed on Vercel at southwestmnhacks.org.

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
  - `app/page.tsx` - Main landing page
  - `app/sponsor/page.tsx` - Sponsor information page
  - `app/resources/page.tsx` - Resources for participants
  - `app/register/page.tsx` - Registration page with embedded Google Form
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
  - Landing page sections: Inline in `app/page.tsx`
  - Sponsor page: `sponsor-hero.tsx`, `sponsor-tiers.tsx`, `sponsor-benefits.tsx`, `sponsor-form.tsx`, `sponsor-faq.tsx`
  - Resources page: `resources-hero.tsx`, `starter-kits.tsx`, `free-resources.tsx`, `workshops.tsx`, `day-of-checklist.tsx`
  - Countdown: `countdown-timer.tsx` (3-state: before/during/after event)
- **UI primitives** in `components/ui/` (shadcn/ui components from Radix UI)
- Client components use `"use client"` directive for interactivity

### Path Aliases
TypeScript path mapping (`tsconfig.json`) resolves imports:
- `@/components` → `components/`
- `@/lib` → `lib/`
- `@/hooks` → `hooks/`
- `@/` → project root

### External Services
- **Vercel Analytics** integrated in root layout (custom event tracking via `track()`)
- **Google Forms** for registration and sponsor applications (embedded iframes)
- **Devpost** for project submissions: https://southwestmn-hacks.devpost.com/

### Navigation
- All internal links use Next.js `<Link>` for client-side navigation
- External links use `<a>` with `target="_blank"` and `rel="noopener noreferrer"`
- Header implements responsive navigation with desktop (lg+) and mobile hamburger menu

### Sponsor Logos
- `public/schwans-logo.png` — Black on transparent (for light backgrounds)
- `public/schwans-logo-white.png` — White version (for dark backgrounds)
- `public/etm-solutions-logo.jpeg` — ETM Solutions logo (blue gradient bg)

## Key Patterns

### Component Architecture
Pages are composed from isolated section components:
- `/sponsor` page assembles: SponsorHero → SponsorTiers → SponsorBenefits → SponsorForm → SponsorFaq
- `/resources` page assembles: ResourcesHero → StarterKits → FreeResources → Workshops → DayOfChecklist

### Event Tracking
Custom events tracked via Vercel Analytics `track()` function:
- `Register Click` with location prop (hero, header-desktop, header-mobile)
- `Sponsor Click` with location prop (hero, header-desktop, header-mobile, sponsors-section, cta-banner)

### TypeScript Configuration
- Strict mode enabled
- Images are unoptimized (`next.config.mjs`)
- TypeScript build errors ignored in production builds (for rapid iteration)

## Styling Conventions

### Color System
Custom CSS variables in OKLCH format support light/dark themes:
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

To add new components, they should follow the existing patterns in `components/ui/`.

## Post-Event TODO
- Remove unused shadcn/ui components from `components/ui/` to reduce bundle size (currently 57 installed, ~5 used: accordion, button and their Radix dependencies)
- Convert `public/og-image.svg` to PNG (1200x630) for full social platform OG support
- Add actual Schwan's logo file if higher-res version becomes available
- Set up Discord server and Instagram, then re-add links to footer
- Consider adding a "Past Winners" / project gallery section after the event
