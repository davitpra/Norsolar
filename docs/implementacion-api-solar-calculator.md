# Implementación API Solar Calculator
# Mayo 2026 — Resumen de cambios

---

## ¿Qué se construyó?

Se implementó el backend de la calculadora solar y se migró la landing page para consumirlo. Antes, todos los cálculos se hacían en el cliente con datos simplificados hardcodeados en `lib/kits.ts`. Ahora hay una API real respaldada por Supabase con datos oficiales de Ecuador (ARCONEL, NASA POWER, CENACE).

---

## Archivos nuevos

### `lib/supabase/client.ts`
Cliente de Supabase usando `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Se usa tanto en rutas API como en componentes client-side.

### `lib/solar/types.ts`
Todos los tipos TypeScript del sistema:
- `CalculateRequest` / `CalculateResponse` — contrato del API
- `RecommendedKit`, `AlternativeKit`, `MonthComparison` — partes del response
- `CityRow`, `KitRow`, `TariffRangeRow`, `SystemConfigMap` — shapes de la DB

### `lib/solar/calculator.ts`
Funciones de cálculo puras (sin DB, sin side effects). Implementa las fórmulas del spec:

| Función | Fórmula |
|---------|---------|
| `calcKwpNeeded` | `consumo / (HSP × 30 × (1 - pérdidas))` |
| `calcMonthlyGeneration` | `kWp × HSP × 30 × (1 - pérdidas)` |
| `calcEscalonadaCost` | Suma de rangos ARCONEL para tarifa residencial |
| `calcFlatCost` | `consumo × tarifa` para comercial/industrial |
| `calcMonthlySavings` | Diferencia de factura con/sin solar (elimina rangos caros primero) |
| `selectKit` | Filtra kits viables (≥80% cobertura) y puntúa por proximidad al kWp necesario + precio/kWp |
| `computeKitMetrics` | Calcula todas las métricas: generación, ahorro, ROI a 25 años, CO₂, gráfico 12 meses |

**Nota sobre `selectKit`:** El algoritmo penaliza tanto el subdimensionamiento (×200) como el sobredimensionamiento (×80). Así el kit más pequeño que cubra adecuadamente el consumo gana frente a kits más grandes con mejor precio/kWp.

### `lib/solar/db.ts`
Queries a Supabase:
- `getCityWithIrradiance(cityName)` — ciudad + factores mensuales de irradiación
- `getActiveTariff(distributorId, customerType)` — rangos de tarifa vigentes
- `getKitsByTarget(target)` — kits con join a panel/inversor/batería
- `getSystemConfig()` — parámetros globales (degradación, pérdidas, CO₂, inflación)
- `insertCalculation` / `insertCalculationBreakdown` — persistencia async
- `insertLead` / `linkLeadToCalculation` / `getCityIdByName`

### `app/api/solar/calculate/route.ts`
**`POST /api/solar/calculate`**

Request:
```json
{
  "city": "Quito",
  "type": "residencial",
  "monthly_consumption_kwh": 300,
  "electricity_tariff_usd": 0.10
}
```

Flujo interno:
1. Valida body con Zod
2. Consulta ciudad, kits y config en paralelo (`Promise.all`)
3. Carga tarifa activa del distribuidor de la ciudad
4. Selecciona kit recomendado + 2 alternativas
5. Calcula todas las métricas del kit recomendado
6. Persiste en `calculations` + `calculation_monthly_breakdown` de forma async (no bloquea la respuesta)
7. Calcula métricas reducidas para las alternativas
8. Devuelve `CalculateResponse` completo

Response incluye: `recommended_kit`, `savings`, `generation`, `environmental`, `comparison_chart` (12 meses), `alternative_kits`.

### `app/api/solar/cities/route.ts`
**`GET /api/solar/cities`**

Devuelve las 20 ciudades con HSP, región y distribuidora. Cache de 1 hora (`revalidate = 3600`).

### `app/api/leads/route.ts`
**`POST /api/leads`**

Persiste un lead en Supabase y lo vincula al cálculo previo si se envía `calculation_id`. Devuelve el ID del lead y un mensaje de confirmación.

```json
{
  "id": "a0f16c60-...",
  "status": "new",
  "message": "Solicitud recibida. Lo contactaremos en menos de 48 horas."
}
```

---

## Archivos modificados

### `components/NSInput.tsx`
- Carga la lista de ciudades desde `GET /api/solar/cities` al montar
- Elimina el botón "Recalcular" — el cálculo es automático con debounce de 400ms
- Cuando los 4 campos son válidos llama a `POST /api/solar/calculate`
- Llama a `props.onCalculate(response)` con el `CalculateResponse` completo
- Muestra spinner "Calculando…" mientras espera y mensaje de error inline si falla

### `components/NSKitRecommendation.tsx`
- Props cambiadas: ahora acepta `recommendation: CalculateResponse['recommended_kit'] | null`
- Muestra skeleton animado mientras no hay datos
- Usa campos reales del API: `num_panels`, `panel_watts`, `panel_brand`, `inverter_brand`, `inverter_type`, `includes_battery`, `battery_kwh`, `price_usd`, `roof_area_m2`
- Botón "Elegir este kit" hace scroll a `#cotiza`

### `components/SavingsResults.tsx`
- Props cambiadas: ahora acepta `result: CalculateResponse | null`
- El `BarChart` de Recharts lee directamente `result.comparison_chart` (datos del API con factores estacionales reales por región)
- Las métricas leen de `result.savings`, `result.generation`, `result.environmental`
- Muestra skeletons mientras no hay datos
- Se eliminó el cálculo local con `SEASON[]`, `KWH_PER_KWP_YEAR`, etc.

### `components/QuoteForm.tsx`
- Acepta `calculationId?: string` para vincular el lead al cálculo previo
- Hace `POST /api/leads` real al enviar el formulario
- Estado de éxito muestra el ID de referencia del lead (primeros 8 caracteres)
- Manejo de errores con mensaje inline

### `app/page.tsx`
- Estado simplificado: `const [calc, setCalc] = useState<CalculateResponse | null>(null)`
- `NSInput` llama a `setCalc` con el response completo
- `NSKitRecommendation` recibe `calc?.recommended_kit`
- `SavingsResults` recibe `calc`
- `NSQuoteForm` recibe `calc?.calculation_id`
- Se añadió `SavingsResults` entre `NSKitRecommendation` y `NSSolution`

---

## Base de datos (Supabase — ya existente)

El schema y los datos ya estaban aplicados al proyecto `oiydrnamfjzfszvxozoz`. Las tablas relevantes para este MVP:

| Tabla | Contenido |
|-------|-----------|
| `cities` | 20 ciudades con HSP y distribuidora |
| `city_monthly_irradiance` | 240 filas (20 × 12) con factores estacionales |
| `solar_kits` | 13 kits (residencial/comercial/industrial) |
| `panel_models` / `inverter_models` / `battery_models` | Catálogo de equipos |
| `tariff_schedules` / `tariff_ranges` | Tarifas ARCONEL vigentes 2025-2026 |
| `system_config` | Parámetros: degradación 0.5%/año, pérdidas 20%/22%, CO₂ 0.3353 kg/kWh, inflación 3% |
| `leads` | Leads generados por el formulario |
| `calculations` | Histórico de cálculos con métricas |

---

## Variables de entorno añadidas a `.env.local`

```
NEXT_PUBLIC_SUPABASE_URL=https://oiydrnamfjzfszvxozoz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

---

## Lo que NO se cambió (intencional)

- `lib/kits.ts` — sigue igual, lo usan `KitsCarousel` y `Solution` (migración pendiente para iteración 2)
- Diseño visual de todos los componentes — se conservó al 100%
- `NSSolution`, `NSBrandBar`, `NSTestimonials`, `NSWhy`, `NSProjects`, `NSHero`, `NSFooter`

---

## Pendiente (iteración 2)

- `GET /api/solar/kits` y `GET /api/solar/tariffs/:city`
- `POST /api/events` para analytics del funnel
- Migrar `KitsCarousel` y `Solution` al nuevo schema para retirar `lib/kits.ts`
- Integración con Resend para notificación por email al recibir un lead
