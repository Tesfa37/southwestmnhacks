# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 landing page for "SouthwestMN Hacks," a hackathon event scheduled for March 21, 2026 in Marshall, MN. The site is built with React 19, TypeScript, and Tailwind CSS 4, using the shadcn/ui component library in the "new-york" style.

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
  - Resources page: `resources-hero.tsx`, `starter-kits.tsx`, `workshops.tsx`, `day-of-checklist.tsx`
- **UI primitives** in `components/ui/` (70+ shadcn/ui components from Radix UI)
- All page components use `"use client"` directive for interactivity

### Path Aliases
TypeScript path mapping (`tsconfig.json`) resolves imports:
- `@/components` → `components/`
- `@/lib` → `lib/`
- `@/hooks` → `hooks/`
- `@/` → project root

### External Services
- **Vercel Analytics** integrated in root layout
- **Google Forms** for registration and sponsor applications

## Key Patterns

### Component Architecture
Pages are composed from isolated section components:
- `/sponsor` page assembles: SponsorHero → SponsorTiers → SponsorBenefits → SponsorForm → SponsorFaq
- `/resources` page assembles: ResourcesHero → StarterKits → Workshops → DayOfChecklist

### Navigation
The Header component implements responsive navigation with:
- Desktop navigation bar (visible lg+)
- Mobile hamburger menu (visible below lg)
- Links to page sections using hash anchors (`/#about`, `/#tracks`, etc.)

### TypeScript Configuration
- Strict mode enabled
- Images are unoptimized (`next.config.mjs`)
- TypeScript build errors ignored in production builds (for rapid iteration)

## Styling Conventions

### Color System
Custom CSS variables in OKLCH format support light/dark themes:
- Primary colors: orange-600, blue-600, pink-600 (brand gradients)
- Neutral palette from `--background` to `--foreground`
- Chart colors (`--chart-1` through `--chart-5`)

### Responsive Design
- Mobile-first approach using Tailwind breakpoints
- Responsive typography scales: `text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl`
- Grid layouts adapt: `grid-cols-1 md:grid-cols-3`

### Component Styling
- Rounded corners: `rounded-3xl`, `rounded-2xl`, `rounded-full` for cards and buttons
- Gradients: `bg-gradient-to-r from-orange-600 via-pink-600 to-blue-600`
- Shadows: `shadow-sm`, `shadow-lg` with `hover:shadow-xl` transitions
- Backdrop blur: `bg-white/80 backdrop-blur-sm` for sticky header

## Adding shadcn/ui Components

shadcn/ui is configured with:
- Style: "new-york"
- Base color: "neutral"
- CSS variables enabled
- Icon library: lucide-react

To add new components, they should follow the existing patterns in `components/ui/`.
