# Prompt: Mockups UI/UX — Calculadora Solar Norsolar (single-page)

> Copia y pega este documento entero en una herramienta de diseño generativo (v0, Figma AI, Claude artifacts, Vercel UI, etc.). El objetivo es producir **mockups visuales**, no código. Las anotaciones de spacing, color y eventos son obligatorias en el entregable.

---

## 0. Quién es la marca

Norsolar es una empresa ecuatoriana de energía solar fotovoltaica con sede en Ibarra. Vende e instala kits residenciales, comerciales e industriales en toda la sierra y costa del Ecuador. Su público trata de "usted", valora la cercanía técnica y la transparencia de costos. La voz es profesional pero cálida, sin tecnicismos innecesarios. **No uses emojis. No uses glassmorphism genérico, gradientes arcoíris ni "hero astronauta".**

---

## 1. Sistema de diseño (respeta los tokens al pie de la letra)

### Paleta
- `#F28C28` Naranja Solar — CTAs, eyebrows, números destacados, acentos.
- `#E07B1A` Naranja hover — único hover válido del primario.
- `#FDE4CB` Naranja soft — fondo de iconos.
- `#1B2A4A` Azul Marino — texto de cuerpo, headlines en fondos claros.
- `#0F1A2E` Navy Deep — secciones oscuras, hero del kit recomendado, footer.
- `#F7F8FA` Gris Alt — fondo de sección alternada.
- `#E5E7EB` Borde sutil de cards/inputs.
- `#6B7280` Texto secundario.
- `#22C55E` Verde Success — confirmación post-submit, deltas positivos.
- `#DCFCE7` Verde soft — fondo de badges de éxito.
- `#F59E0B` Ámbar warning — para advertencias de cobertura baja.

### Tipografía
- **Display: Montserrat ExtraBold (800)** uppercase, `letter-spacing: -0.02em`, `line-height: 1.15`.
- **UI: Montserrat SemiBold (600)** para botones, eyebrows, navs.
- **Body: Inter Regular (400)**, 16–18px, `line-height: 1.7`.

Escala (clamp):
- Hero `clamp(56px, 9vw, 120px)`
- Display `clamp(44px, 6.5vw, 80px)`
- H1 `clamp(36px, 4.5vw, 56px)`
- H2 `clamp(28px, 3vw, 40px)`
- Body `16–18px`
- Micro `12px` (eyebrows, badges)

### Patrón eyebrow obligatorio
Texto micro en mayúsculas, 12px, `letter-spacing: 0.22em`, color naranja, **prefijado con un círculo hueco `○` y un espacio**. Ejemplo: `○ TU AHORRO`. Sirve como ancla visual de cada bloque.

### Geometría
- Radios: inputs/badges 6px, botones 10px, cards 16px, cards editoriales 24px.
- Sombras tintadas navy, NO negras: `0 8px 24px rgba(15,26,46,0.06)` y `0 16px 40px rgba(15,26,46,0.10)`.
- Container max 1240px, gutter 24px, padding vertical de sección 100px (80px en tablet, 64px en mobile).
- Breakpoint custom `tablet: 960px`.

### Botones
- **Primario**: bg naranja, texto blanco, 10px radio, `padding: 16px 28px`, Montserrat SemiBold 14px. Hover oscurece a `#E07B1A`.
- **Outline en navy**: borde 1.5px blanco, transparente, hover invierte a fondo naranja.
- **Ghost dark**: sin borde, texto navy, hover texto naranja.

### Animaciones
- Reveal de scroll: fade + `translateY(24px → 0)` en 600ms con easing `cubic-bezier(0.22, 1, 0.36, 1)`.
- Hover de cards: `translateY(-4px)` en 280ms.
- Float decorativo (cards stat): `translateY(±6px)` en 6s loop.
- No uses Framer Motion explícito en mockups; describe la animación con texto en la anotación.

### Iconografía
Lucide icons, stroke 2px, 18–22px, dentro de cuadros redondeados de 36–40px con fondo `#FDE4CB`. Mapeo sugerido:
- Sol → generación.
- Hoja → CO₂.
- Casa / Edificio / Fábrica → tipo de cliente.
- Banknote → ahorro.
- Trending-up → ROI.
- Battery-charging → kit con batería.
- Roof → área de techo.
- Map-pin → ciudad.

---

## 2. Lo que tiene que resolver la pantalla

Una sola pantalla scrollable que permita a un usuario **decidir comprar un sistema solar sin hablar con un asesor**. Tres preguntas que la pantalla debe responder en menos de 30 segundos:

1. **¿Qué kit me sirve?** → tarjeta protagonista con el kit recomendado.
2. **¿Cuánto ahorro y en cuántos años recupero la inversión?** → dashboard de métricas + gráfico 12 meses.
3. **¿Cómo lo cotizo formalmente?** → formulario corto al final, pre-cargado con el contexto del cálculo.

KPI de éxito del diseño: minimizar el abandono entre "vio resultados" y "abrió el formulario". El sticky CTA mobile y los chips de contexto en el form están diseñados para ese cuello de botella.

---

## 3. Arquitectura del flujo single-page (orden vertical de bloques)

La página es una sola sección continua con 7 bloques verticales. Inputs arriba, resultados se hidratan en cuanto hay datos suficientes, lead form al fondo. Los inputs son **sticky en mobile** (barra superior con backdrop blur navy 12px). El recálculo es automático con debounce 400ms; no existe un botón "Calcular".

### Bloque A — Inputs (hero del componente)

**Layout desktop:** banda navy deep `#0F1A2E` full-width, padding vertical 80px. Contenido en grid 12 columnas: 7 columnas de copy a la izquierda (eyebrow, H1 "Calcula tu ahorro solar en 30 segundos", subtítulo Inter 18px en blanco 80%), 5 columnas de card blanca con los 4 inputs.

**Inputs (en este orden):**
1. **Ciudad** — `<select>` con 15 ciudades del Ecuador (Quito, Guayaquil, Cuenca, Manta, Ambato, Riobamba, Ibarra, Loja, Machala, Portoviejo, Santo Domingo, Esmeraldas, Puyo, Tena, Galápagos). Junto al label muestra un badge pill con la región (`sierra` / `costa` / `oriente` / `insular`) en color que cambia según región.
2. **Tipo de cliente** — toggle de 3 botones segmentados (Residencial / Comercial / Industrial) con icono Lucide. El seleccionado lleva fondo naranja, los otros borde gris.
3. **Consumo mensual (kWh)** — slider horizontal naranja + input numérico a la derecha. Rangos sugeridos por tipo: Residencial 100–1500, Comercial 1000–10000, Industrial 10000–100000. El track del slider tiene marcas cada 25%.
4. **Tarifa eléctrica (USD/kWh)** — input numérico con prefijo `$`, prefilled según ciudad y tipo (consume `GET /api/solar/tariffs/:city`). Debajo, en gris 14px: "Distribuidora: {nombre}" (ej. "EEQ", "CNEL-GYE", "Emelnorte").

Cada input debe respetar focus ring 3px `rgba(242,140,40,0.18)` y borde 1px navy.

**Estado vacío:** mientras `city` o `type` no estén seleccionados, los bloques B–G se muestran como **skeletons grises** con mensaje overlay: "Selecciona ciudad y tipo para ver tu cálculo personalizado."

**Microinteracción:** primer cambio en cualquier input dispara `calculator_started`. Cuando los 4 campos son válidos, debounce 400ms y llamada a `POST /api/solar/calculate`. Resultados se animan con reveal (600ms cascada por bloque, 80ms entre cada uno).

**Mobile:** los 4 inputs colapsan en una barra sticky superior compacta (60px de alto) con backdrop blur navy. Al hacer tap se expande un drawer inferior con los 4 campos completos.

---

### Bloque B — Kit recomendado (la card hero del resultado)

**Layout desktop:** grid 12 columnas, gap 24px, fondo `#F7F8FA`.

- **Columnas 1–7:** card grande fondo `#0F1A2E`, radio 24px, padding 40px, sombra navy nivel 3. Estructura interna:
  - Eyebrow `○ KIT RECOMENDADO` en naranja.
  - Nombre del kit (`recommended_kit.name`) en Montserrat ExtraBold 40px blanco.
  - Bloque hero con número grande: `power_kwp` en Montserrat ExtraBold 80px naranja, sufijo "kWp" en blanco 24px al lado.
  - Grid 2×3 de chips informativas blanco 10% opacidad, radio 10px, padding 12px 16px:
    - "{num_panels} paneles {panel_watts}W" (ej. "9 paneles 550W")
    - Marca panel: `panel_brand`
    - Inversor: `inverter_brand` + pill al lado con `inverter_type` (`on_grid` → "Conectado a red", `hybrid` → "Híbrido", `off_grid` → "Aislado")
    - Si `includes_battery`: badge naranja "Incluye batería {battery_kwh} kWh"; si no: badge gris "Sin batería"
    - "Área techo: {roof_area_m2} m²"
    - Marca de garantía sintética: "25 años garantía paneles"
  - Tag-price en esquina inferior derecha: caja naranja, radio 16px, "USD" 14px arriba, `price_usd` formato $XX,XXX en Montserrat ExtraBold 56px blanco.
  - Botón ghost claro (texto blanco, sin borde) "Ver ficha técnica completa →" como secundario.

- **Columnas 8–12:** título micro "Otras opciones" + 2 cards verticales de `alternative_kits[0]` y `alternative_kits[1]`. Cada card: fondo blanco, radio 16px, padding 20px, borde 1px gris claro.
  - Nombre del kit, kWp, precio, coverage % (con barra de progreso fina naranja), ROI (icono trending-up + "X.X años").
  - Botón ghost dark "Ver este kit" full-width abajo. Al hacer click, swap del Bloque B con animación 280ms y dispara `kit_viewed`.

**Tablet:** bloque B colapsa a single column; las dos alternativas pasan abajo en grid horizontal 2 columnas.

**Mobile:** card hero ocupa 100%, alternativas en stack vertical o carrusel horizontal con scroll-snap.

---

### Bloque C — Dashboard de ahorro (4 métricas)

**Layout desktop:** grid 4 columnas, gap 24px. Cada card: blanca, radio 16px, padding 28px, borde 1px `#E5E7EB`, sombra navy nivel 1.

Estructura interna de cada card:
1. Cuadro 40px con icono Lucide en naranja sobre fondo `#FDE4CB`.
2. Eyebrow micro gris (no naranja aquí, para no competir con los números).
3. Número grande en Montserrat ExtraBold 44px navy.
4. Línea descriptiva 14px gris.

**Las 4 métricas:**
- **M1 — Ahorro mensual:** icono banknote. Número: `savings.monthly_usd` formato `$XX`. Línea: "vs. tu factura actual de ${factura_actual}".
- **M2 — Ahorro anual:** icono trending-up. Número: `savings.annual_usd` formato `$X,XXX`. Línea: "Equivale a {meses} meses de tu factura".
- **M3 — Ahorro a 25 años:** icono calendar-check. Número: `savings.total_25_years_usd` formato `$XXX,XXX`. Badge debajo en gris claro: "Incluye inflación 3% / degradación 0.5%".
- **M4 — ROI + Cobertura:** card especial 2-en-1. A la izquierda número grande `savings.roi_years` "años". A la derecha **anillo de progreso** circular de 80px con `coverage_percentage` en el centro. Línea común: "Recuperas tu inversión y cubres el {coverage}% de tu consumo".

**Tablet:** grid 2×2.
**Mobile:** stack vertical, una card por fila.

---

### Bloque D — Gráfico de comparación 12 meses

**Layout desktop:** card blanca full-width del container (1240px), radio 24px, padding 40px.

- Eyebrow `○ COMPARATIVO MENSUAL`.
- H2 "Tu factura, mes a mes".
- Subtítulo Inter 16px gris: "Comparamos tu gasto eléctrico actual contra el gasto que tendrías con el {nombre_del_kit_recomendado} instalado."
- Recharts BarChart, altura 360px en desktop / 280px en mobile.
  - Eje X: `comparison_chart[].month` (Ene, Feb, Mar… abreviados 3 letras).
  - Eje Y: USD con prefijo `$` y formato compacto.
  - Dos barras agrupadas por mes: `without_solar_usd` en navy `#1B2A4A`, `with_solar_usd` en naranja `#F28C28`. Radio superior 4px en cada barra.
  - Grid de fondo punteado en gris muy claro, sólo líneas horizontales.
  - Tooltip custom: card blanca radio 10px sombra nivel 2, padding 12px 16px. Líneas: "Sin solar: $XX", "Con solar: $XX", "Ahorro: $XX" (la última en verde success).
- Leyenda inferior con dos chips (cuadrado de color + label).

**Anotación:** este gráfico **debe hidratarse del API**, no usar constantes locales. El componente actual `SavingsResults.jsx` calcula esto en cliente; el reemplazo no.

---

### Bloque E — Generación y huella ambiental

**Layout desktop:** grid 2 columnas, gap 24px. Dos cards blancas, radio 16px, padding 32px.

- **Card izquierda — Generación:**
  - Eyebrow `○ ENERGÍA QUE GENERAS`.
  - Icono sol grande `#FDE4CB` 56px.
  - Dos líneas grandes: `generation.monthly_kwh` "kWh/mes" y `generation.annual_kwh` "kWh/año".
  - Barra horizontal segmentada que muestra `coverage_percentage` (la porción cubierta en naranja, la restante en gris claro). Label arriba: "Cubre el {X}% de tu consumo mensual".

- **Card derecha — Huella ambiental:**
  - Eyebrow `○ IMPACTO AMBIENTAL`.
  - Icono hoja en círculo verde soft `#DCFCE7` 56px.
  - Dos líneas grandes: `environmental.co2_reduction_annual_tons` "ton CO₂/año" y `environmental.co2_reduction_25_years_tons` "ton CO₂ en 25 años".
  - Equivalencia decorativa, calculada en cliente: "≈ {floor(toneladas × 16)} árboles plantados". Iconito de árbol en línea de equivalencia.

**Mobile:** stack vertical.

---

### Bloque F — Carrusel de alternativas (vista expandida)

Los `alternative_kits` ya aparecen resumidos en el Bloque B; este bloque los expande en una vista comparativa.

**Layout desktop:** grid 3 columnas (3 cards), gap 24px. Mobile: carrusel horizontal scroll-snap, 1 card visible.

Cada card de alternativa: fondo blanco, radio 16px, borde 1px gris claro, padding 24px, sombra navy nivel 1, hover lift -4px.
- Header: nombre del kit + tag pill con kWp.
- Precio en Montserrat ExtraBold 32px navy.
- Lista de 3 datos resumidos con icono pequeño Lucide:
  - Cobertura: `coverage_percentage`% (con barra horizontal naranja debajo).
  - ROI: `roi_years` años.
  - Diferencia con el recomendado: "+$X" o "-$X" en verde/rojo.
- Botón primario naranja "Ver este kit como recomendado" → swap Bloque B + dispara `kit_viewed`.

**Si la respuesta del API trae menos de 3 alternativas**, mostrar las que hay y NO añadir placeholders.

---

### Bloque G — Lead capture (cierre del flujo)

**Layout desktop:** sección con fondo navy deep `#0F1A2E`, padding vertical 100px. Container 1240px con grid 12 columnas: 5 columnas de copy + chips de contexto a la izquierda, 7 columnas de form card blanca a la derecha.

**Lado izquierdo (copy):**
- Eyebrow `○ COTIZACIÓN FORMAL`.
- H2 blanco "¿Quiere recibir esta cotización detallada en su correo?"
- Subtítulo Inter 18px blanco 80%: "Un asesor de Norsolar le contactará en menos de 48 horas con la cotización formal del {nombre_del_kit_recomendado}, incluyendo plan de financiamiento y visita técnica gratuita."
- **Chips de contexto** (read-only, en pills blancas 10% opacidad sobre el fondo navy):
  - 📍 Ciudad (icono map-pin)
  - Tipo: Residencial/Comercial/Industrial
  - Consumo: {X} kWh/mes
  - Kit: {nombre_recomendado} — {power_kwp} kWp — ${price}
  Estos chips informan al usuario que NO tiene que volver a escribir esos datos; ya viajan con el lead.

**Lado derecho (form card):**
- Card blanca radio 24px, padding 40px, sombra nivel 3.
- Eyebrow micro gris "DATOS DE CONTACTO".
- Campos (mapean a `POST /api/leads`):
  - `contact_name` *: input text "Nombre completo".
  - `email` *: input email "Correo electrónico".
  - `phone`: input tel con prefijo "+593" "Celular / WhatsApp".
  - `company_name` (sólo visible si `type !== "residencial"`): input text "Empresa".
  - `position` (sólo visible si `type !== "residencial"`): input text "Cargo".
- Checkbox pequeño abajo: "Acepto recibir comunicaciones de Norsolar".
- Botón primario naranja full-width 56px de alto: "Recibir cotización detallada".
- Texto fino debajo: "Respuesta en menos de 48 horas. Sin compromiso."

**Eventos:**
- Focus en `contact_name` → `form_started`.
- Submit OK → `form_submitted` y la card cambia a estado de éxito.

**Estado de éxito (post-submit):**
- Card colapsa el form y muestra: icono check verde 64px en círculo `#DCFCE7`, H3 navy "¡Solicitud recibida!", párrafo: el `message` del response del API ("Solicitud recibida. Lo contactaremos en menos de 48 horas."), número de seguimiento mostrado como `ID: {response.id}` en mono fino gris, botón ghost-dark "Volver a calcular otro kit".

**Hidden fields enviados al API** (no visibles en UI pero documenta su existencia):
- `calculation_id`, `monthly_consumption_kwh`, `customer_type`, `city`, `source: "landing_calculator"`, `utm_source`, `utm_medium`, `utm_campaign` (leídos de la URL si existen).

---

## 4. Estados globales de la pantalla

Diseña explícitamente estos estados:

1. **Empty / inicial** — Bloque A activo, B–G en skeleton gris claro con mensaje "Selecciona ciudad y tipo para ver tu cálculo personalizado." sobre el bloque C (centrado).
2. **Loading** — al cambiar inputs, los bloques B–F muestran shimmer (gradient barrido `#E5E7EB → #F7F8FA → #E5E7EB` en 1.5s loop). Target de respuesta del API: <800ms.
3. **Error** — toast en esquina inferior izquierda: card navy radio 10px sombra nivel 2, icono naranja, copy "No pudimos calcular ahora. Intenta de nuevo." + botón ghost-light "Reintentar".
4. **Cobertura > 100%** — en el Bloque B, badge verde success debajo del precio: "✓ Excedente exportable a la red eléctrica" (sin emoji, usa icono check Lucide en línea).
5. **Cobertura < 50%** — en el Bloque C, banner ámbar `#F59E0B` 10% opacidad, borde 1px ámbar, sobre la métrica M4: "Este kit cubre menos del 50% de su consumo. Considere una alternativa de mayor potencia." + link "Ver kits más grandes →" que scrolls al Bloque F.
6. **Sticky CTA mobile** — al hacer scroll por debajo del Bloque C, fija barra inferior 64px de alto: fondo navy deep, padding 12px 16px. Izquierda: "Ahorrarás ${monthly_usd}/mes" en blanco 14px. Derecha: botón primario naranja "Cotizar →" que ancla al Bloque G. Dispara `cta_clicked` al tocar.
7. **Post-submit éxito** — descrito en Bloque G.

---

## 5. Responsive

- **Desktop ≥1240px:** layout completo con grid 12 columnas y gap 24px.
- **Tablet 960–1239px:** los bloques B y E colapsan a single column, el Bloque C pasa a grid 2×2, el Bloque F mantiene 3 columnas con cards más estrechas.
- **Mobile <960px:** todo single column. Inputs sticky superior con backdrop blur navy 12px. Lead form full-width, sticky CTA inferior visible cuando el Bloque G no está en viewport.

Anota los breakpoints en el mockup.

---

## 6. Accesibilidad (WCAG AA mínimo)

- Contraste: blanco puro sobre `#0F1A2E` y `#1B2A4A`; `#1B2A4A` sobre blanco. Nunca gris sobre navy.
- Focus visible en todos los inputs y botones (ring 3px naranja translúcido).
- Labels semánticas reales (`<label for>`), no placeholders como label.
- Resultados (Bloques B–F) envueltos en `aria-live="polite"` para que un lector de pantalla anuncie cambios al recalcular.
- Toggles de tipo y selects accesibles vía teclado (flechas, enter).
- Slider con valor textual visible al lado, no solo el thumb.
- Toda imagen decorativa con `aria-hidden`.

---

## 7. Eventos del funnel (mapeo explícito a `POST /api/events`)

Anota en cada bloque relevante qué evento dispara, según esta tabla:

| event_type            | Cuándo se dispara                                                       |
|-----------------------|-------------------------------------------------------------------------|
| `page_view`           | Mount inicial del componente / pantalla                                 |
| `calculator_started`  | Primer cambio de cualquiera de los 4 inputs del Bloque A                |
| `calculator_completed`| Primera respuesta 200 de `POST /api/solar/calculate`                    |
| `kit_viewed`          | Click en una alternativa (Bloque B columna der. o Bloque F)             |
| `form_started`        | Focus en `contact_name` del Bloque G                                    |
| `form_submitted`      | Response 200 de `POST /api/leads`                                       |
| `cta_clicked`         | Click en sticky CTA mobile o en cualquier "Ver este kit"                |
| `pdf_downloaded`      | (opcional) Click en "Ver ficha técnica completa" del Bloque B           |

Cada evento debe llevar `session_id` (UUID generado al `page_view` y guardado en localStorage), `city`, `customer_type` y `event_data` con el contexto puntual del trigger.

---

## 8. Mapeo 1:1 del response del API a elementos visuales

Verifica que cada campo de `POST /api/solar/calculate` esté representado:

| Campo del API                                | Bloque         | Elemento visual                              |
|----------------------------------------------|----------------|----------------------------------------------|
| `recommended_kit.name`                       | B              | Título de la card hero                       |
| `recommended_kit.power_kwp`                  | B              | Número grande naranja 80px                   |
| `recommended_kit.num_panels`                 | B              | Chip "{X} paneles {watts}W"                  |
| `recommended_kit.panel_watts`                | B              | Misma chip                                   |
| `recommended_kit.panel_brand`                | B              | Chip "Marca panel"                           |
| `recommended_kit.inverter_brand`             | B              | Chip "Inversor"                              |
| `recommended_kit.inverter_type`              | B              | Pill al lado del inversor                    |
| `recommended_kit.includes_battery`           | B              | Badge naranja / gris                         |
| `recommended_kit.battery_kwh`                | B              | Dentro del badge si `includes_battery`       |
| `recommended_kit.price_usd`                  | B              | Tag-price naranja inferior derecho           |
| `recommended_kit.roof_area_m2`               | B              | Chip "Área techo"                            |
| `savings.monthly_usd`                        | C (M1) + sticky| Card métrica + barra mobile                  |
| `savings.annual_usd`                         | C (M2)         | Card métrica                                 |
| `savings.total_25_years_usd`                 | C (M3)         | Card métrica                                 |
| `savings.roi_years`                          | C (M4)         | Lado izquierdo de la card 2-en-1             |
| `savings.coverage_percentage`                | C (M4) + E     | Anillo + barra horizontal del card de generación |
| `generation.monthly_kwh`                     | E              | Línea grande de la card izq.                 |
| `generation.annual_kwh`                      | E              | Línea grande de la card izq.                 |
| `environmental.co2_reduction_annual_tons`    | E              | Línea grande de la card der.                 |
| `environmental.co2_reduction_25_years_tons`  | E              | Línea grande de la card der.                 |
| `comparison_chart[].month`                   | D              | Eje X del BarChart                           |
| `comparison_chart[].without_solar_usd`       | D              | Barra navy                                   |
| `comparison_chart[].with_solar_usd`          | D              | Barra naranja                                |
| `alternative_kits[].name`                    | B + F          | Header de mini-card y card de alternativa    |
| `alternative_kits[].power_kwp`               | B + F          | Tag pill                                     |
| `alternative_kits[].price_usd`               | B + F          | Precio destacado                             |
| `alternative_kits[].coverage_percentage`     | B + F          | Barra de progreso fina                       |
| `alternative_kits[].roi_years`               | B + F          | Línea con icono trending-up                  |

---

## 9. Archivos del codebase a usar como referencia visual

Cuando dudes de un patrón, mira estos archivos del repo Norsolar (no los reproduzcas tal cual, sólo respeta su lenguaje visual):

- `docs/api-solar-calculator-spec_1.md` — fuente de verdad del response y del request.
- `.claude/skills/norsolar-design/colors_and_type.css` — todos los tokens.
- `.claude/skills/norsolar-design/README.md` — voz, copy, do/don'ts de marca.
- `.claude/skills/norsolar-design/references/tailwind.md` — utilidades existentes (`ns-btn`, `ns-input`, `ns-eyebrow`, `ns-section`, `ns-container`).
- `components/SavingsResults.jsx` — patrón Recharts dual-bar a reusar (líneas 30–90).
- `components/Solution.jsx` — patrón actual de toggle de tipo y selects (líneas 88–154).
- `components/Hero.jsx` y `components/QuoteForm.jsx` — patrón de hero navy con form card blanca encima.

---

## 10. Entregable esperado

Quien ejecute este prompt debe entregar:

1. **1 mockup desktop a 1440px** mostrando los 7 bloques en scroll, ya con datos de ejemplo (usa Quito + residencial + 500 kWh/mes + tarifa 0.10).
2. **1 mockup mobile a 390px** con sticky inputs arriba y sticky CTA inferior visible.
3. **Estados clave** como vistas separadas:
   - Vacío (Bloque A activo, resto skeleton).
   - Loading (shimmer en bloques B–F).
   - Error (toast).
   - Cobertura >100% (badge en B).
   - Cobertura <50% (banner ámbar en C).
   - Post-submit éxito (estado del Bloque G).
4. **Inventario de componentes reutilizables** documentado (input, toggle, slider, metric card, kit hero card, alt kit card, sticky bar, toast, skeleton).
5. **Anotaciones obligatorias** sobre cada bloque indicando: spacing, color tokens usados, evento del funnel asociado y qué campo del API representa.

**No entregues código.** Si la herramienta tiende a producirlo, fuerza el output a SVG/PNG/Figma frame con anotaciones laterales en texto.

---

## 11. Checklist final antes de entregar

- [ ] Cada campo del response de `/api/solar/calculate` está mapeado a un elemento visible (sección 8).
- [ ] Cada `event_type` de `/api/events` tiene un disparador concreto anotado (sección 7).
- [ ] Los 7 bloques aparecen en orden A → G.
- [ ] Los 6 estados globales están dibujados (sección 4).
- [ ] El sticky CTA mobile aparece a partir del Bloque C.
- [ ] El form de leads pre-carga ciudad/tipo/consumo/kit como chips read-only.
- [ ] Paleta exacta: `#F28C28`, `#1B2A4A`, `#0F1A2E`, `#F7F8FA`, `#22C55E`. Sin morados ni cian fuera de paleta.
- [ ] Tipografía: Montserrat ExtraBold para titulares, Inter Regular para body. Sin Roboto, sin Poppins.
- [ ] Eyebrows con `○ TEXTO` en naranja sobre cada bloque.
- [ ] Voz formal "usted", sin emojis, copy en español de Ecuador.
