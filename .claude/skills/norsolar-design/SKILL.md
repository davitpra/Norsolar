---
name: norsolar-design
description: Use this skill to generate well-branded interfaces and assets for Norsolar (energía solar fotovoltaica, Ibarra, Ecuador), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping. Use whenever the user wants to build, prototype, or style anything for Norsolar — landing pages, components, banners, forms, mockups — even if they don't say "Norsolar design" explicitly.
user-invocable: true
---

Read `README.md` for full brand guidelines. For Tailwind config and class reference, read `references/tailwind.md`.

If creating visual artifacts (slides, mocks, throwaway prototypes), copy assets out and produce static HTML. For production React/Next.js code, use Tailwind utilities with the brand tokens below.

If the user invokes this skill without guidance, ask what they want to build and act as an expert designer outputting either an HTML prototype **or** production JSX, depending on context.

---

## Quick map

| File / Dir               | Purpose                                                                                                  |
| ------------------------ | -------------------------------------------------------------------------------------------------------- |
| `references/tailwind.md` | **Start here for code.** Full Tailwind v4 setup, `@theme` config, brand→class mapping, and JSX patterns. |
| `README.md`              | Full brand guide: voice/copy, visual foundations, iconography, editorial rules.                          |
| `fonts/`                 | Montserrat ExtraBold/SemiBold + Inter Regular (TTF). Serve from `/fonts/` or embed via `@font-face`.     |
| `assets/`                | Logos (color/navy/white/dark-bg), favicon, brand board, photography.                                     |
| `preview/`               | Design tokens & components rendered as small HTML cards.                                                 |

---

## Brand essentials at a glance

**Voice:** Spanish (Ecuador), formal "usted", no emoji. Verbos en imperativo para CTAs ("Cotiza Gratis", "Calcula tu Ahorro").

**Colors (Tailwind class → value):**

- `bg-ns-orange` / `text-ns-orange` — `#F28C28` (CTAs, accents, eyebrows, stat numbers)
- `bg-ns-navy` / `text-ns-navy` — `#1B2A4A` (headlines, body text, header/footer)
- `bg-ns-navy-deep` — `#0F1A2E` (dark sections: hero, CTA forms)
- `bg-ns-bg-alt` — `#F7F8FA` (alternating sections)
- `text-ns-muted` — `#6B7280` (secondary text, labels)
- `text-ns-success` — `#22C55E` (savings indicators)

**Typography:**

- `font-display font-extrabold uppercase` — Montserrat 800, tracking -0.02em, hero 80–120px (`clamp`)
- `font-display font-semibold` — Montserrat 600 (buttons, nav, eyebrows)
- `font-body` — Inter 400, 16–18px, `leading-[1.7]`
- **Eyebrow pattern:** `<span className="ns-eyebrow">MICRO LABEL</span>` — auto-adds `○` bullet via CSS

**Layout:**

- Sections: `ns-section` = `py-[100px]`. Dark rounded: `bg-ns-navy-deep rounded-3xl mx-8 py-20 px-16`.
- Container: `ns-container` = `max-w-[1240px] mx-auto px-8`.
- Responsive tablet breakpoint (960px): `max-tablet:grid-cols-1`, `tablet:flex`, etc.

**Reusable component classes** (defined in `globals.css` `@layer components`):
`ns-container`, `ns-section`, `ns-eyebrow`, `ns-display-h`, `ns-body-lg`,
`ns-btn`, `ns-btn-primary`, `ns-btn-sm`, `ns-btn-outline-light`, `ns-btn-block`, `ns-btn-ghost-dark`,
`ns-link`, `ns-input`, `ns-input-full`

---

## Working approach

### For HTML prototypes / mocks

Use inline Tailwind via CDN — no build step needed:

```html
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          "ns-orange": "#F28C28",
          "ns-orange-hover": "#E07B1A",
          "ns-orange-soft": "#FDE4CB",
          "ns-navy": "#1B2A4A",
          "ns-navy-deep": "#0F1A2E",
          "ns-muted": "#6B7280",
          "ns-bg-alt": "#F7F8FA",
          "ns-border": "#E5E7EB",
          "ns-success": "#22C55E",
        },
        fontFamily: {
          display: ["Montserrat", "sans-serif"],
          body: ["Inter", "sans-serif"],
        },
      },
    },
  };
</script>
```

Then add Google Fonts import for Montserrat + Inter if not serving locally. Copy images from `assets/` as needed.

### For production code (Next.js / React)

Follow the full setup in `references/tailwind.md`. Key points:

- Use `@import "tailwindcss"` + `@theme {}` for Tailwind v4.
- Copy `fonts/` to `public/fonts/` and use `@font-face` in globals.css.
- Import `globals.css` in the root layout.
- Use `ns-btn`, `ns-eyebrow`, `ns-container` etc. for repeated patterns; inline Tailwind for component-specific layouts.

### Section rhythm

Alternate backgrounds to create editorial cadence:

1. White (`bg-white`) → 2. Alt (`bg-ns-bg-alt`) → 3. Dark (`bg-ns-navy-deep`) → repeat

Each section opens with `<span className="ns-eyebrow">LABEL</span>` + `<h2 className="ns-display-h">...</h2>`.

### Gradients (can't be Tailwind classes)

Always use `style` prop for gradients:

- Hero overlay: `linear-gradient(95deg, rgba(15,26,46,0.85) 0%, rgba(15,26,46,0.55) 50%, rgba(15,26,46,0.15) 100%)`
- Card overlay: `linear-gradient(180deg, rgba(15,26,46,0.15) 0%, rgba(15,26,46,0.95) 100%)`
- Avatar placeholder: `linear-gradient(135deg, #F28C28, #1B2A4A)`
