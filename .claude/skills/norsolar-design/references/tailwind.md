# Norsolar — Tailwind CSS Reference

## Setup (Tailwind v4 + Next.js)

Install:
```bash
npm install -D tailwindcss @tailwindcss/postcss
```

`postcss.config.js`:
```js
module.exports = { plugins: { '@tailwindcss/postcss': {} } };
```

In `globals.css` (or any entry CSS):
```css
@import "tailwindcss";

@font-face {
  font-family: "Montserrat"; font-weight: 800; font-style: normal; font-display: swap;
  src: url("/fonts/Montserrat-ExtraBold.ttf") format("truetype");
}
@font-face {
  font-family: "Montserrat"; font-weight: 600; font-style: normal; font-display: swap;
  src: url("/fonts/Montserrat-SemiBold.ttf") format("truetype");
}
@font-face {
  font-family: "Inter"; font-weight: 400; font-style: normal; font-display: swap;
  src: url("/fonts/Inter-Regular.ttf") format("truetype");
}

@theme {
  /* Brand colors */
  --color-ns-orange:       #F28C28;
  --color-ns-orange-hover: #E07B1A;
  --color-ns-orange-soft:  #FDE4CB;
  --color-ns-navy:         #1B2A4A;
  --color-ns-navy-2:       #2D4470;
  --color-ns-navy-deep:    #0F1A2E;
  --color-ns-muted:        #6B7280;
  --color-ns-bg-alt:       #F7F8FA;
  --color-ns-border:       #E5E7EB;
  --color-ns-success:      #22C55E;
  --color-ns-success-soft: #DCFCE7;

  /* Fonts */
  --font-display: "Montserrat", "Helvetica Neue", Arial, sans-serif;
  --font-body:    "Inter", "Helvetica Neue", Arial, sans-serif;

  /* Custom breakpoint */
  --breakpoint-tablet: 960px;

  /* Float animation for stat cards */
  --animate-ns-float: nsFloat 6s ease-in-out infinite;
}

@keyframes nsFloat {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-6px); }
}

/* Global resets */
*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
a { color: inherit; }
body { font-family: var(--font-body); color: #1B2A4A; background: #fff; -webkit-font-smoothing: antialiased; }

/* Reusable component classes */
@layer components {
  .ns-container  { @apply max-w-[1240px] mx-auto px-8 relative; }
  .ns-section    { @apply py-[100px] relative; }

  /* Eyebrow label with ○ bullet */
  .ns-eyebrow { @apply font-display font-semibold text-[12px] tracking-[0.22em] uppercase text-ns-orange inline-flex items-center gap-[10px] mb-[18px]; }
  .ns-eyebrow::before { content: ""; @apply w-[7px] h-[7px] border-[1.5px] border-current rounded-full shrink-0; }

  /* Display heading — clamp can't live in @theme */
  .ns-display-h {
    font-size: clamp(40px, 5.5vw, 72px);
    @apply font-display font-extrabold uppercase leading-none tracking-[-0.02em] text-ns-navy m-0 mb-7;
  }

  /* Body copy intro */
  .ns-body-lg { @apply font-body text-[17px] leading-[1.7] text-ns-muted m-0 mb-6 max-w-[460px]; }

  /* Buttons */
  .ns-btn             { @apply inline-flex items-center justify-center gap-2 px-7 py-4 rounded-[10px] font-display font-semibold text-[14px] tracking-[0.02em] no-underline cursor-pointer transition-all duration-200 border-0 whitespace-nowrap; }
  .ns-btn-sm          { @apply px-[22px] py-3 text-[13px]; }
  .ns-btn-primary     { @apply bg-ns-orange text-white hover:bg-ns-orange-hover; }
  .ns-btn-outline-light { @apply bg-transparent text-white border-[1.5px] border-white/85 hover:bg-white hover:text-ns-navy; }
  .ns-btn-block       { @apply w-full py-[18px] text-[15px]; }
  .ns-btn-ghost-dark  { @apply bg-transparent border-0 text-ns-navy font-display font-semibold text-[13px] cursor-pointer px-3 py-2 hover:text-ns-orange disabled:opacity-40 disabled:cursor-not-allowed; }
  .ns-link            { @apply font-display font-semibold text-[13px] text-ns-orange no-underline; }

  /* Form inputs */
  .ns-input      { @apply bg-white border border-ns-border rounded-[10px] px-[18px] py-4 font-body text-[14px] text-ns-navy outline-none transition-[border-color,box-shadow] duration-[180ms] placeholder:text-ns-muted focus:border-ns-orange focus:shadow-[0_0_0_3px_rgba(242,140,40,0.18)]; }
  .ns-input-full { @apply w-full; }
}

/* Scroll-reveal (applied via JS IntersectionObserver) */
.ns-reveal           { opacity: 0; transform: translateY(24px); transition: opacity 600ms cubic-bezier(0.22,1,0.36,1), transform 600ms cubic-bezier(0.22,1,0.36,1); }
.ns-reveal.is-visible { opacity: 1; transform: translateY(0); }

/* Select custom arrow */
select.ns-input {
  appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path fill='%231B2A4A' d='M6 8L0 0h12z'/></svg>");
  background-repeat: no-repeat; background-position: right 16px center;
}

@media (max-width: 600px) { .ns-section { padding: 64px 0; } }
```

---

## Brand → Tailwind class mapping

| Design token | Tailwind class | Value |
|---|---|---|
| Naranja Solar | `text-ns-orange` / `bg-ns-orange` / `border-ns-orange` | `#F28C28` |
| Naranja hover | `hover:bg-ns-orange-hover` | `#E07B1A` |
| Naranja soft (fondo icon) | `bg-ns-orange-soft` | `#FDE4CB` |
| Azul Marino | `text-ns-navy` / `bg-ns-navy` | `#1B2A4A` |
| Navy Profundo | `bg-ns-navy-deep` | `#0F1A2E` |
| Texto secundario | `text-ns-muted` | `#6B7280` |
| Fondo alternado | `bg-ns-bg-alt` | `#F7F8FA` |
| Borde base | `border-ns-border` | `#E5E7EB` |
| Verde éxito | `text-ns-success` / `bg-ns-success-soft` | `#22C55E` / `#DCFCE7` |
| Fuente titulares | `font-display` | Montserrat ExtraBold/SemiBold |
| Fuente cuerpo | `font-body` | Inter Regular |
| Breakpoint tablet | `tablet:` prefix | `960px` |
| Animación flotante | `animate-ns-float` | `nsFloat 6s ease-in-out infinite` |

---

## Patterns comunes

### Section con fondo alternado
```jsx
<section className="ns-section bg-ns-bg-alt">
  <div className="ns-container"> ... </div>
</section>
```

### Section oscura (formulario, CTA)
```jsx
<section className="ns-section bg-ns-navy-deep text-white rounded-3xl mx-8">
  <div className="ns-container"> ... </div>
</section>
```

### Eyebrow + heading
```jsx
<span className="ns-eyebrow">POR QUÉ NORSOLAR</span>
<h2 className="ns-display-h">¿POR QUÉ<br />NORSOLAR ES<br />DIFERENTE?</h2>
```

### Botones
```jsx
<a href="#cotiza" className="ns-btn ns-btn-primary">Cotiza Gratis</a>
<a href="#proyectos" className="ns-btn ns-btn-outline-light">Ver Proyectos</a>
```

### Card estándar con hover
```jsx
<div className="bg-white border border-[#ECEFF3] rounded-2xl p-5 shadow-[0_4px_12px_rgba(15,26,46,0.04)] transition-[transform,box-shadow] duration-[220ms] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(15,26,46,0.10)]">
```

### Ícono con fondo naranja soft
```jsx
<div className="w-11 h-11 rounded-xl bg-ns-orange-soft text-ns-orange flex items-center justify-center">
  <svg className="w-[22px] h-[22px] fill-none stroke-current" strokeWidth="2" .../>
</div>
```

### Header sticky con scroll
```jsx
// Estado scrolled → bg navy semitransparente con blur
<header className={`fixed inset-x-0 top-0 z-[100] transition-[background,backdrop-filter] duration-[240ms]${
  scrolled ? ' bg-[rgba(15,26,46,0.85)] backdrop-blur-[12px] shadow-[0_4px_20px_rgba(15,26,46,0.18)]' : ''
}`}>
```

### Hero background con overlay
```jsx
<section className="relative min-h-[720px] h-screen max-h-[880px] flex items-center overflow-hidden">
  <div className="absolute inset-0 bg-cover bg-center z-[1]" style={{ backgroundImage: 'url(...)' }} />
  <div className="absolute inset-0 z-[2]"
    style={{ background: 'linear-gradient(95deg, rgba(15,26,46,0.85) 0%, rgba(15,26,46,0.55) 50%, rgba(15,26,46,0.15) 100%)' }} />
  <div className="ns-container relative z-[3]"> ... </div>
</section>
```

### Grid responsivo (2 cols → 1 col en tablet)
```jsx
<div className="grid grid-cols-2 max-tablet:grid-cols-1 gap-14">
```

### Process/project cards con overlay de gradiente
Para tarjetas con imagen de fondo + gradiente negro abajo, usar un `<div>` absoluto en lugar de `::before`:
```jsx
<article className="relative h-[320px] rounded-2xl overflow-hidden bg-cover bg-center flex flex-col justify-end p-6 text-white" style={{ backgroundImage: `url(${img})` }}>
  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(15,26,46,0.15) 0%, rgba(15,26,46,0.95) 100%)' }} />
  <span className="relative ...">...</span>  {/* z-index implícito por relative */}
</article>
```

### Stat card flotante (hero)
```jsx
<div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 w-[200px] shadow-[0_24px_60px_rgba(15,26,46,0.18)] text-ns-navy relative"
  style={{ animation: 'nsFloat 6s ease-in-out infinite' }}>
```

---

## Notas de compatibilidad

- **Tailwind v4** usa `@import "tailwindcss"` + `@theme {}` en CSS (sin `tailwind.config.js`).
- **Tailwind v3** usa `@tailwind base/components/utilities` + `tailwind.config.js`. La mayoría de clases son iguales; cambiar `@theme` por `theme.extend` en el config.
- Los valores con `clamp()` siempre se escriben como `style={{ fontSize: 'clamp(...)' }}` ya que no son soportados en `@theme`.
- La opacidad en colores funciona con `/`: `text-white/85`, `bg-[rgba(15,26,46,0.85)]`.
