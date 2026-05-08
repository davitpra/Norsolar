# Norsolar — Website UI Kit

Recreación interactiva del sitio público de Norsolar (referencia: `assets/reference-website.png`).

## Estructura

```
index.html              Demo completa con todos los componentes ensamblados
styles.css              Estilos del kit (consume tokens de colors_and_type.css)
01-Header-Hero.jsx      Header sticky · Hero editorial · BrandBar de partners
02-Why-Process-Projects.jsx
                        WhySection (4 features + sello ARCERNNR)
                        ProcessSection (4 pasos sobre fotografía)
                        ProjectsSection (3 cards editorial)
03-Form-Testimonials.jsx
                        QuoteForm (cotización en navy con 7 campos)
                        Testimonials (3 testimonios + stats)
                        WhyChoose (lista de razones)
04-Footer.jsx           Footer denso de 5 columnas + WhatsApp FAB
```

## Componentes interactivos

- **Header** se vuelve translúcido con blur cuando se hace scroll.
- **QuoteForm** es funcional: valida campos, muestra estado de éxito tras envío.
- **Process** "Empieza Ahora" hace smooth-scroll al formulario de cotización.
- **WhatsApp FAB** flotante en cada vista.

## Cómo extender

Cada componente está expuesto en `window.NS*` (ej. `window.NSHero`, `window.NSFooter`)
para que se pueda mezclar en otras páginas (proyectos individuales, blog, FAQ).

## Pendientes / no implementados

- Páginas internas (proyecto detalle, blog, FAQ, política).
- Calculadora de ahorro (CTA "Calcula tu Ahorro" actualmente lleva al hero).
- Versión multilenguaje (solo español).
- Login para clientes / dashboard de monitoreo (mencionado pero no diseñado).
