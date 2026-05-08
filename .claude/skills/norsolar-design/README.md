# Norsolar — Sistema de Diseño

> **Energía que transforma Ecuador.**
> Soluciones Energéticas Integrales — Ibarra, Imbabura, Ecuador.

Norsolar es una empresa ecuatoriana de **energía solar fotovoltaica** con sede en
Ibarra, especializada en instalaciones residenciales, comerciales e industriales.
La marca combina la **calidez del sol andino** con la **solidez del azul marino
profesional** para proyectar confianza técnica, innovación y compromiso con un
Ecuador más sostenible.

Este repositorio contiene los fundamentos visuales y de contenido necesarios
para producir cualquier pieza de comunicación de marca: sitio web, presentaciones,
papelería, redes sociales y prototipos de producto.

---

## Sources

Materiales originales entregados por el cliente:

- **Tablero de marca** — `assets/brand-board.png` (manual visual con paleta, tipografía e iconografía).
- **Referencia editorial** — `assets/reference-website.png` (mockup del sitio objetivo, estilo magazine).
- **Logos vectoriales** — 4 versiones en `assets/` (color, navy, blanco, sobre fondo oscuro) + favicon.
- **Tipografías** — Montserrat ExtraBold/SemiBold + Inter Regular en `fonts/` (archivos originales del cliente).
- **Fotografía** — biblioteca de instalaciones reales en techos ecuatorianos y equipo en campo (`assets/`).

No se entregó codebase ni archivo Figma; el sistema se construyó a partir del
manual de marca y las directrices escritas del cliente.

---

## Index — qué hay en este sistema

```
README.md                     ← este archivo
SKILL.md                      ← invocación como skill (Claude Code compatible)
colors_and_type.css           ← tokens CSS (color, tipografía, espaciado, radios, sombras)
fonts/                        ← Montserrat (800/600) + Inter (400)
assets/                       ← logos, brand board, fotografía, referencias
preview/                      ← cards del Design System (Type, Colors, Spacing, Components, Brand)
ui_kits/
  website/                    ← UI kit del sitio Norsolar (índice + componentes JSX)
```

Para empezar a diseñar una pieza nueva, importa `colors_and_type.css`, copia los
assets relevantes desde `assets/`, y reutiliza los componentes de `ui_kits/website/`
como base modular.

---

## Content fundamentals

### Idioma y tono

- **Idioma:** español de Ecuador. Todo el contenido público va en español.
- **Voz:** profesional pero cercana. Se utiliza el **"usted" formal** ("Cotice su proyecto", "Ahorre hasta un 90% en su planilla") manteniendo calidez. Evitar el "vos" y el "tú" en comunicación oficial.
- **Persona:** primera persona plural cuando habla la empresa ("Combinamos experiencia local…", "Impulsamos un futuro sostenible…"). Segunda persona formal cuando se dirige al cliente.
- **Vocabulario clave:** *paneles solares, fotovoltaico, planilla eléctrica, autoconsumo, ahorro, independencia energética, apagones, regulación ARCERNNR 001/2021, línea ecuatorial, radiación solar privilegiada, sostenibilidad, residencial / comercial / industrial.*

### Estructura editorial

- **Eyebrow + Headline + Bajada.** Cada sección abre con una micro-etiqueta en mayúsculas espaciadas (ej. `○ POR QUÉ NORSOLAR`), seguida de un titular grande en negrita y una bajada corta de 1–2 líneas.
- **Headlines en MAYÚSCULAS** y muy grandes ("INSTALACIÓN DE PANELES SOLARES", "IR A SOLAR ES MÁS FÁCIL DE LO QUE PIENSAS").
- **Bullets concisos.** Listas de valores y servicios con máximo 3–5 palabras por punto ("Confianza · Innovación · Sostenibilidad · Excelencia").
- **CTAs activos y específicos.** "Cotiza Gratis", "Calcula tu Ahorro", "Ver Proyectos", "Empieza Ahora", "Enviar Cotización". Verbos en imperativo.

### Énfasis recurrentes

- **Ahorro económico** — porcentajes concretos ("hasta un 90% en su planilla").
- **Independencia energética** — protección frente a apagones nacionales.
- **Respaldo legal** — mención explícita de la **regulación ARCERNNR 001/2021** (generación distribuida y autoconsumo en Ecuador).
- **Ventaja geográfica** — Ecuador en la línea ecuatorial → radiación solar privilegiada todo el año.
- **Cercanía local** — "experiencia local", proyectos en Imbabura, Quito, Guayaquil, etc.
- **Credenciales** — sellos ANDE, IESS Empresa Ecuatoriana, +250 proyectos instalados.

### Sin emoji

La marca **no utiliza emoji** en su comunicación oficial. La iconografía es lineal,
geométrica, en color naranja o navy. Los acentos visuales (○, →, etc.) se hacen con
caracteres tipográficos sutiles o con SVGs de la marca, no con emoji.

### Ejemplos de copy

- > "Expertos en soluciones fotovoltaicas para hogares, comercios e industrias en Ecuador. Ahorre hasta un 90% en su planilla eléctrica."
- > "Combinamos experiencia local, tecnología de clase mundial y atención personalizada para entregar proyectos solares que realmente generan resultados."
- > "Ecuador cuenta con radiación solar privilegiada por estar en la línea ecuatorial. Aproveche ese recurso ilimitado."
- > "Respaldo legal para generación distribuida y autoconsumo en Ecuador."

---

## Visual foundations

### Paleta

| Token | Hex | Uso |
|---|---|---|
| `--ns-orange` | `#F28C28` | CTAs, acentos, números de stats, eyebrows |
| `--ns-orange-hover` | `#E07B1A` | Estado hover de botones primarios |
| `--ns-navy` | `#1B2A4A` | Header, footer, body copy, headlines en claro |
| `--ns-navy-2` | `#2D4470` | Hover/bordes sobre navy |
| `--ns-navy-deep` | `#0F1A2E` | Secciones oscuras (hero, CTA, formulario) |
| `--ns-bg` | `#FFFFFF` | Fondo base |
| `--ns-bg-alt` | `#F7F8FA` | Secciones alternadas |
| `--ns-success` | `#22C55E` | Indicadores de ahorro y métricas positivas |
| `--ns-text-muted` | `#6B7280` | Texto secundario |

**Ritmo de color por sección:** se alternan tres tipos de fondo —
`bg-1` (blanco) → `bg-2` (gris claro) → `bg-dark` (navy profundo) — para crear
cadencia visual a lo largo de la página, igual que en la referencia editorial.

### Tipografía

- **Display (titulares):** **Montserrat ExtraBold (800)**. Mayúsculas, tracking ajustado (`-0.02em`), tamaños hero de 80–120px en desktop. Da el carácter editorial / magazine.
- **Subtítulos / botones:** **Montserrat SemiBold (600)**.
- **Cuerpo:** **Inter Regular (400)**. Tamaño 16–18px, line-height generoso (1.7).
- **Eyebrows / micro-labels:** Montserrat SemiBold 12px, MAYÚSCULAS, `letter-spacing: 0.22em`, color naranja, precedidos por un círculo `○`.

### Espaciado y layout

- **Padding vertical mínimo entre secciones: 80–100px** (`--space-9` / `--space-10`). Mucho aire.
- **Container central** de 1240px máx., gutters de 24px.
- **Grids 12 columnas** para layouts de tarjetas; rejillas asimétricas (texto izquierda + imagen derecha) en bloques editoriales.
- **Espacio en blanco generoso** alrededor de titulares — los hero y display headlines respiran con padding lateral amplio.

### Fotografía

- **Tema:** instalaciones reales sobre techos ecuatorianos, equipo técnico con casco trabajando, paisajes andinos con sol, paneles vistos desde arriba.
- **Tono cromático:** **cálido y soleado**, con cielos claros andinos, dominantes naranjas y azules naturales que conectan con la paleta.
- **Tratamiento:** sin filtros artísticos. Imágenes a sangre (full-bleed) en hero y bloques editoriales.
- **Placeholders:** cuando no hay imagen real, usar gradientes oscuros (`navy-deep` → `navy`) con el logo/sol en marca de agua.

### Bordes, radios, sombras

- **Radios:** 6px (inputs/badges pequeños), 10px (botones), 16px (cards estándar), 24px (cards grandes editoriales). Pill (999px) para tags.
- **Bordes:** 1px `#E5E7EB` en estado base; 2px `--ns-orange` o `--ns-navy` en focus.
- **Sombras:** sistema de 4 niveles (`--shadow-1` a `--shadow-4`), siempre con tinte navy (`rgba(15,26,46,…)`) en lugar de negro puro, para que se sientan integradas con la marca.

### Estados de interacción

- **Hover botón primario (naranja):** baja a `--ns-orange-hover` (#E07B1A), sin cambio de tamaño.
- **Hover botón secundario (outline navy):** fondo navy + texto blanco.
- **Hover link:** color naranja, underline 1px offset 4px.
- **Press / active:** ligero `transform: translateY(1px)` o reducción de sombra.
- **Focus visible:** outline 2px naranja con offset de 2px, accesibilidad AA.

### Animaciones

- **Fade-in desde abajo** (translateY 24px → 0, opacity 0 → 1) al entrar en viewport. Duración 600ms, easing `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Counters animados** en la sección de stats (de 0 al valor final, ~1.5s).
- **Parallax sutil** en imágenes hero (translate -10% al hacer scroll).
- **Sin bounces, sin rebotes**. Movimiento sobrio, profesional.
- **Hover de tarjetas:** `translateY(-4px)` + sombra nivel 3, transición 280ms.

### Transparencia y blur

- **Header sticky:** fondo `rgba(15, 26, 46, 0.85)` con `backdrop-filter: blur(12px)` cuando se hace scroll.
- **Stat card flotante en hero:** fondo blanco semitransparente (`rgba(255,255,255,0.92)`) con blur, esquinas redondeadas y sombra suave.
- **Overlays sobre fotografía:** gradiente `linear-gradient(to right, rgba(15,26,46,0.85), rgba(15,26,46,0))` para asegurar legibilidad del texto.

### Cards

- **Card estándar:** fondo blanco, radio 16px, borde `1px #E5E7EB`, sombra `--shadow-2`. Padding interno 24–32px. Hover sube con `--shadow-3` y `translateY(-4px)`.
- **Card sobre navy:** fondo `rgba(255,255,255,0.06)`, borde `1px rgba(255,255,255,0.12)`, sin sombra.
- **Card editorial (proyecto):** imagen full-width arriba (radio 16px solo en esquinas superiores), texto debajo con padding generoso, sin sombra, separación por aire.

### Layout rules

- **Header fijo** (sticky), 80px de alto, fondo navy, logo blanco a la izquierda, nav central, CTA naranja a la derecha.
- **Footer denso** sobre `--ns-navy-deep`, columnas de soluciones / empresa / contacto / redes, sello ANDE + IESS abajo.
- **WhatsApp flotante** abajo a la derecha en mobile.
- **Mobile-first:** hero pasa a columna única, formulario stackea, carousels se vuelven scroll horizontal con `scroll-snap`.

---

## Iconography

Norsolar utiliza un **sistema de iconos lineales geométricos** en color naranja
(o navy sobre fondos claros), con grosor de trazo uniforme (~2px) y esquinas
ligeramente redondeadas. Los iconos del manual de marca son:

- ☀ **Sol** — energía solar (icono insignia)
- 🛡 **Escudo** — seguridad / certificación
- 📈 **Gráfico ascendente** — eficiencia / retorno de inversión
- 🏠 **Casa** — residencial
- 🏭 **Fábrica** — industrial
- 🍃 **Hoja** — sostenibilidad
- 🔧 **Llave inglesa** — soluciones a medida / mantenimiento

> Los emoji arriba son **referencia conceptual**; en producción se renderizan como
> SVGs de trazo (stroke 2px, esquinas redondeadas).

**No se usa emoji en producción.** No hay icon font propio entregado en este sistema,
así que para el UI kit utilizamos **[Lucide Icons](https://lucide.dev) vía CDN** —
la familia más cercana al estilo del manual: lineal, 2px stroke, esquinas
redondeadas, geometría limpia. Esto está **flagueado** como sustitución; ver
*Caveats* abajo.

Iconos Lucide específicos que mapean al manual:
- `sun` → Energía solar
- `shield-check` → Seguridad / certificación
- `trending-up` → Eficiencia / ROI
- `home` → Residencial
- `factory` → Industrial
- `leaf` → Sostenibilidad
- `wrench` → Mantenimiento / soluciones a medida
- `battery-charging` → Baterías y almacenamiento

El logo principal incluye un **sol estilizado** (chispa de 8 puntas) en naranja —
este es el patrón gráfico recurrente de la marca y aparece como sello de agua,
patrón de fondo, y favicon.

---

## Caveats

- **Iconos:** se sustituye con Lucide vía CDN. Si Norsolar produce su propio set
  SVG de los 7 iconos del manual (sol, escudo, casa, fábrica, hoja, llave, gráfico),
  reemplazar por los SVGs oficiales y borrar la dependencia de Lucide.
- **No hay codebase ni Figma** entregados — el UI kit se basa en el mockup de
  referencia + manual de marca. Si existe un repositorio de producción, conviene
  cruzar valores de spacing exactos.
- **Fotografía limitada** a la biblioteca entregada. Para campañas extensas se
  necesitará producción adicional (drone shots, retratos del equipo, instalaciones
  industriales a gran escala).
