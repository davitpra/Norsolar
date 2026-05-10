# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Next.js, localhost:3000)
npm run build    # Production build
npm run start    # Start production server
```

There is no test or lint script configured.

## Architecture

Single-page Next.js 15 app (App Router) for Norsolar — a solar energy company in Ibarra, Ecuador. The entire site is one route (`app/page.tsx`) composed of section components rendered in sequence.

**Data flow:** `page.tsx` holds `monthlyBill` state. `NSQuoteForm` accepts `onCalculate` to update it; `NSSavingsResults` reads it to render the savings chart. The `KitsCarousel` and savings logic derive from `lib/kits.ts`.

**Key files:**
- `lib/kits.ts` — all business logic: kit catalog (`KITS[]`), tariff rates (`TARIFAS`), `recommendKit()` (picks kit by monthly consumption), `computeSavingsProjection()` (25-year savings model with 3% inflation + 0.5%/year panel degradation)
- `components/SavingsResults.tsx` — Recharts bar chart comparing monthly spend with/without solar; accepts `monthlyBill` and `kitPower` props
- `components/QuoteForm.tsx` — lead capture form (no backend integration yet; form submission is local state only)
- `app/globals.css` — Tailwind v4 config via `@theme {}` block; all design tokens defined here

**Design system:**
- CSS custom properties prefixed `ns-` (e.g., `--color-ns-orange: #f28c28`, `--color-ns-navy: #1b2a4a`)
- Component utility classes in `@layer components`: `.ns-container`, `.ns-section`, `.ns-btn`, `.ns-input`, `.ns-eyebrow`, `.ns-display-h`, `.ns-display-h-md`, `.ns-body-lg`
- Fonts: Montserrat (display/headings, weights 600 and 800) + Inter (body), served from `/public/fonts/`
- Custom breakpoint: `tablet` = 960px (`max-tablet:` prefix in Tailwind)
- Scroll reveal: JS in `page.tsx` adds `.ns-reveal` + `.is-visible` via IntersectionObserver

**Path aliases:** `@/components/*` and `@/lib/*` (configured in `tsconfig.json`)

**Tailwind version:** v4 — uses `@import "tailwindcss"` in `globals.css` (no `tailwind.config.js`); PostCSS handled via `@tailwindcss/postcss`.

## Norsolar skill

Use the `norsolar-design` skill when building or styling any UI for this project. It contains the brand guidelines, color palette, typography rules, and component kit.
