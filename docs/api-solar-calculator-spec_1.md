# API de recomendación de kit solar — Especificación técnica
# Versión 2.0 — Actualizada con datos de producción

---

## 1. Datos de entrada del usuario (request body)

```typescript
interface SolarCalculatorInput {
  city: string;              // "Quito" | "Guayaquil" | "Cuenca" | "Manta" | ...
  type: "residencial" | "comercial" | "industrial";
  monthly_consumption_kwh: number;  // ej: 300
  electricity_tariff_usd: number;   // ej: 0.18 USD/kWh
}
```

---

## 2. Datos de referencia (base de datos / config)

### 2.1 Irradiación solar por ciudad (HSP — Horas Sol Pico por día)

Fuentes: Global Solar Atlas, NASA POWER, The Cuenca Dispatch, estudios EPN/ESPOL

```typescript
// Tabla: cities + city_monthly_irradiance

const HSP_POR_CIUDAD: Record<string, { hsp: number; region: "sierra" | "costa" | "oriente" | "insular"; lat: number; lon: number }> = {
  "Quito":          { hsp: 4.5, region: "sierra", lat: -0.1807, lon: -78.4678 },
  "Guayaquil":      { hsp: 4.7, region: "costa",  lat: -2.1710, lon: -79.9224 },
  "Cuenca":         { hsp: 4.2, region: "sierra", lat: -2.9001, lon: -79.0059 },
  "Manta":          { hsp: 5.0, region: "costa",  lat: -0.9500, lon: -80.7333 },
  "Ambato":         { hsp: 4.5, region: "sierra", lat: -1.2491, lon: -78.6168 },
  "Riobamba":       { hsp: 4.8, region: "sierra", lat: -1.6636, lon: -78.6546 },
  "Ibarra":         { hsp: 4.5, region: "sierra", lat:  0.3392, lon: -78.1223 },
  "Loja":           { hsp: 4.3, region: "sierra", lat: -3.9931, lon: -79.2042 },
  "Machala":        { hsp: 4.6, region: "costa",  lat: -3.2582, lon: -79.9554 },
  "Portoviejo":     { hsp: 4.5, region: "costa",  lat: -1.0546, lon: -80.4545 },
  "Santo Domingo":  { hsp: 3.8, region: "costa",  lat: -0.2522, lon: -79.1719 },
  "Esmeraldas":     { hsp: 4.3, region: "costa",  lat:  0.9592, lon: -79.6539 },
  "Puyo":           { hsp: 3.5, region: "oriente", lat: -1.4924, lon: -77.9962 },
  "Tena":           { hsp: 3.5, region: "oriente", lat: -0.9898, lon: -77.8141 },
  "Galápagos":      { hsp: 5.5, region: "insular", lat: -0.7432, lon: -90.3157 },
};

// Alternativa programática: NASA POWER API (gratuita, sin API key)
// GET https://power.larc.nasa.gov/api/temporal/monthly/point
//   ?parameters=ALLSKY_SFC_SW_DWN
//   &community=RE
//   &longitude={lon}&latitude={lat}
//   &start=2020&end=2024
//   &format=JSON
```

Factores de variación mensual respecto al promedio anual:

```typescript
// Tabla: city_monthly_irradiance

const MONTHLY_FACTORS = {
  sierra: {
    1: 0.95, 2: 0.88, 3: 0.85, 4: 0.85,
    5: 0.95, 6: 1.05, 7: 1.10, 8: 1.15,
    9: 1.10, 10: 1.00, 11: 0.95, 12: 0.92,
  },
  costa: {
    1: 0.90, 2: 0.88, 3: 0.90, 4: 0.92,
    5: 0.95, 6: 1.05, 7: 1.10, 8: 1.12,
    9: 1.10, 10: 1.08, 11: 1.02, 12: 0.95,
  },
};
```

### 2.2 Catálogo de productos y kits solares

```typescript
// Tablas: panel_models, inverter_models, battery_models, solar_kits

interface PanelModel {
  id: string;
  brand: string;             // "Trina Solar" | "JA Solar" | "LONGi" | "Yingli" | "Resun"
  model: string;
  watts: number;             // 450-700W
  efficiency: number;        // ej: 21.5%
  area_m2: number;           // ~2.5 m² por panel de 550W
  warranty_years: number;    // 25
  tier: string;              // "Tier 1" | "Tier 2"
}

interface InverterModel {
  id: string;
  brand: string;             // "Growatt" | "Sungrow" | "Huawei" | "Deye" | "GoodWe"
  model: string;
  power_kw: number;
  type: "on_grid" | "hybrid" | "off_grid";
  phases: 1 | 3;
  max_pv_input_kw: number;
  efficiency: number;        // ej: 97.5%
  warranty_years: number;    // 10
}

interface BatteryModel {
  id: string;
  brand: string;             // "Pylontech" | "BYD" | "Growatt" | "Victron"
  model: string;
  capacity_kwh: number;
  chemistry: string;         // "LiFePO4"
  cycles: number;            // 6000+
  warranty_years: number;    // 10
}

interface SolarKit {
  id: string;
  name: string;
  slug: string;
  description: string;
  target: "residencial" | "comercial" | "industrial";
  system_type: "on_grid" | "hybrid" | "off_grid";
  power_kwp: number;
  panel_model_id: string;
  panel_quantity: number;
  inverter_model_id: string;
  battery_model_id: string | null;
  battery_quantity: number;
  price_usd: number;
  installation_included: boolean;
  roof_area_required_m2: number;
}
```

Kits ejemplo (precios referenciales, confirmar con proveedores):

| Kit | kWp | Paneles | Inversor | Batería | Precio est. |
|-----|-----|---------|----------|---------|-------------|
| Residencial básico | 2.0 | 4×550W | Growatt 3kW | No | $2,000-2,800 |
| Residencial medio | 5.0 | 9×550W | Growatt 5kW | No | $4,500-6,000 |
| Residencial híbrido | 5.0 | 9×550W | Growatt SPH 5kW | 5.12 kWh | $7,000-9,000 |
| Comercial | 20.0 | 36×550W | Sungrow 20kW | No | $16,000-22,000 |
| Industrial | 100.0 | 182×550W | Sungrow 100kW | No | $75,000-95,000 |

### 2.3 Tarifas eléctricas vigentes (2025-2026)

Fuente: ARCONEL Resolución 022/2024, Reforma 006/25

```typescript
// Tablas: distributors, tariff_schedules, tariff_ranges

// Residencial (bajo voltaje) — SIN CAMBIOS en 2025-2026
const TARIFA_RESIDENCIAL = {
  dignidad: { tarifa: 0.0450, limite_sierra: 110, limite_costa: 130 },
  rangos: [
    { min: 0,    max: 50,   tarifa: 0.091 },
    { min: 51,   max: 100,  tarifa: 0.093 },
    { min: 101,  max: 130,  tarifa: 0.095 },
    { min: 131,  max: 500,  tarifa: 0.100 },
    { min: 501,  max: 700,  tarifa: 0.105 },
    { min: 701,  max: 1000, tarifa: 0.150 },
    { min: 1001, max: 2500, tarifa: 0.200 },
    { min: 2501, max: 3500, tarifa: 0.470 },
    { min: 3501, max: null, tarifa: 0.680 },
  ],
  precio_medio_nacional: 0.1061,
};

// Industrial — REFORMA julio 2025
const TARIFA_INDUSTRIAL = {
  medio_voltaje:    { anterior: 0.0927, actual: 0.1164 },  // +25%
  alto_voltaje_av1: { anterior: 0.0791, actual: 0.1022 },  // +29%
  alto_voltaje_av2: { valor: 0.055 },                      // sin cambio
};

// Distribuidoras por ciudad
const DISTRIBUIDORAS: Record<string, string> = {
  "Quito": "EEQ",   "Guayaquil": "CNEL-GYE",  "Cuenca": "Centrosur",
  "Ambato": "EEASA", "Manta": "CNEL-MAN",      "Machala": "CNEL-ORO",
  "Loja": "EERSSA",  "Riobamba": "EERSA",       "Ibarra": "Emelnorte",
};
```

### 2.4 Factores del sistema

```typescript
// Tabla: system_config (key-value global)

const SYSTEM_CONFIG = {
  panel_degradation_per_year: 0.005,     // 0.5% anual
  system_losses_sierra:       0.20,      // 20%
  system_losses_costa:        0.22,      // 22% (mayor pérdida por temperatura)
  system_lifespan_years:      25,
  co2_factor_kg_per_kwh:      0.3353,    // CENACE Informe 2024 (margen combinado)
  electricity_inflation_rate: 0.03,      // 3% anual estimado
  cost_per_wp_residential:    1.20,      // USD/Wp
  cost_per_wp_commercial:     1.00,
  cost_per_wp_industrial:     0.85,
  area_m2_per_kwp:            5.5,       // m² por kWp (paneles 550W)
};
```

---

## 3. Fórmulas de cálculo

### 3.1 Tamaño del sistema necesario

```
kWp_necesario = consumo_mensual_kwh / (HSP × 30 × (1 - system_losses))

Ejemplo (Quito, residencial, 300 kWh/mes):
  300 / (4.5 × 30 × 0.80) = 300 / 108 = 2.78 kWp
```

### 3.2 Número de paneles

```
num_paneles = ceil(kWp_necesario × 1000 / panel_watts)

Ejemplo con paneles de 550W:
  ceil(2.78 × 1000 / 550) = ceil(5.05) = 6 paneles → 3.3 kWp real
```

### 3.3 Generación mensual real del kit

```
generacion_mensual_kwh = kWp_instalado × HSP × 30 × (1 - system_losses)

Ejemplo con 3.3 kWp en Quito:
  3.3 × 4.5 × 30 × 0.80 = 356.4 kWh/mes
```

### 3.4 Generación anual

```
generacion_anual_kwh = Σ (kWp × HSP_base × factor_mes_i × 30 × (1 - losses))
                       para i = 1 hasta 12

Simplificado:
  generacion_mensual × 12 = 356.4 × 12 = 4,276.8 kWh/año
```

### 3.5 Porcentaje de cobertura

```
cobertura = min((generacion_mensual / consumo_mensual) × 100, 100)

Ejemplo: (356.4 / 300) × 100 = 118% → tope 100%
```

### 3.6 Ahorro mensual (con tarifa escalonada)

```
Para tarifa residencial escalonada, el ahorro se calcula eliminando
los rangos MÁS CAROS primero:

Ejemplo: consumo 500 kWh, generación 356 kWh
  Sin solar: suma de todos los rangos hasta 500 kWh = ~$44.55/mes
  Con solar: consumo neto = 500 - 356 = 144 kWh
             solo se pagan rangos hasta 144 kWh = ~$13.25/mes
  Ahorro = $44.55 - $13.25 = $31.30/mes

Para comercial/industrial (tarifa plana): ahorro = kWh_cubiertos × tarifa
```

### 3.7 Ahorro anual

```
ahorro_anual = Σ ahorro_mensual_i (considerando factor mensual de irradiación)
```

### 3.8 Retorno de inversión (ROI)

```
roi_años = precio_kit / ahorro_anual

Ejemplo con kit de $5,500:
  $5,500 / $375.60 = 3.2 años
```

### 3.9 Ahorro total en 25 años

```
ahorro_total = Σ (ahorro_anual × (1 + inflacion)^año × (1 - degradacion)^año)
               para año = 0 hasta 24
```

### 3.10 Reducción de CO₂

```
co2_anual_ton = (generacion_anual_kwh × 0.3353) / 1000

Ejemplo: (4,277 × 0.3353) / 1000 = 1.43 toneladas/año

co2_25_años = Σ (generacion_año_i × 0.3353 / 1000)
              considerando degradación del 0.5%/año
            ≈ 1.43 × 25 × 0.94 = 33.6 toneladas
```

### 3.11 Gasto mensual comparativo (para gráfico de barras)

```
Para cada mes (1-12):
  hsp_mes = HSP_base × factor_mensual[region][mes]
  generacion_mes = kWp × hsp_mes × 30 × (1 - losses)
  gasto_sin_solar = calcular_factura(consumo_mensual, tarifa_escalonada)
  consumo_neto = max(0, consumo_mensual - generacion_mes)
  gasto_con_solar = calcular_factura(consumo_neto, tarifa_escalonada)
```

---

## 4. Lógica de selección de kit

```typescript
function selectKit(
  consumption: number,
  city: string,
  customerType: "residencial" | "comercial" | "industrial",
  kits: SolarKit[]
): { recommended: SolarKit; alternatives: SolarKit[] } {
  const cityData = HSP_POR_CIUDAD[city];
  const losses = cityData.region === "costa" ? 0.22 : 0.20;
  const kWpNeeded = consumption / (cityData.hsp * 30 * (1 - losses));

  // Filtrar por tipo de cliente y cobertura mínima 80%
  const viable = kits
    .filter(kit => kit.target === customerType)
    .filter(kit => kit.power_kwp >= kWpNeeded * 0.8)
    .sort((a, b) => {
      const coverageA = Math.min(a.power_kwp / kWpNeeded, 1.2);
      const coverageB = Math.min(b.power_kwp / kWpNeeded, 1.2);
      const valueA = a.price_usd / a.power_kwp;
      const valueB = b.price_usd / b.power_kwp;
      const scoreA = Math.abs(1 - coverageA) * 100 + valueA;
      const scoreB = Math.abs(1 - coverageB) * 100 + valueB;
      return scoreA - scoreB;
    });

  return {
    recommended: viable[0],
    alternatives: viable.slice(1, 3),
  };
}
```

---

## 5. Endpoints del API

### POST /api/solar/calculate

Calcula el kit recomendado y todos los datos de ahorro/ROI.

```typescript
// Request
interface CalculateRequest {
  city: string;
  type: "residencial" | "comercial" | "industrial";
  monthly_consumption_kwh: number;
  electricity_tariff_usd: number;
  session_id?: string;
}

// Response
interface CalculateResponse {
  recommended_kit: {
    id: string;
    name: string;
    power_kwp: number;
    num_panels: number;
    panel_watts: number;
    panel_brand: string;
    inverter_brand: string;
    inverter_type: "on_grid" | "hybrid" | "off_grid";
    includes_battery: boolean;
    battery_kwh: number | null;
    price_usd: number;
    roof_area_m2: number;
  };
  savings: {
    monthly_usd: number;
    annual_usd: number;
    total_25_years_usd: number;
    roi_years: number;
    coverage_percentage: number;
  };
  generation: {
    monthly_kwh: number;
    annual_kwh: number;
  };
  environmental: {
    co2_reduction_annual_tons: number;
    co2_reduction_25_years_tons: number;
  };
  comparison_chart: {
    month: string;
    without_solar_usd: number;
    with_solar_usd: number;
  }[];
  alternative_kits: {
    id: string;
    name: string;
    power_kwp: number;
    price_usd: number;
    coverage_percentage: number;
    roi_years: number;
  }[];
}
```

### GET /api/solar/cities

Lista las ciudades disponibles con datos de irradiación.

```typescript
interface CitiesResponse {
  cities: {
    id: string;
    name: string;
    province: string;
    region: "sierra" | "costa" | "oriente" | "insular";
    hsp_annual: number;
    distributor: string;
  }[];
}
```

### GET /api/solar/kits?type=residencial&system_type=hybrid

Lista los kits disponibles, filtrados por tipo de cliente y sistema.

```typescript
interface KitsResponse {
  kits: SolarKit[];
}
```

### GET /api/solar/tariffs/:city

Devuelve las tarifas vigentes para una ciudad.

```typescript
interface TariffResponse {
  distributor: string;
  customer_types: {
    type: string;
    voltage_level: string;
    ranges: { min_kwh: number; max_kwh: number | null; rate: number }[];
  }[];
}
```

### POST /api/leads

Guarda un lead desde el formulario de la landing.

```typescript
// Request
interface LeadRequest {
  company_name?: string;
  contact_name: string;
  email: string;
  phone?: string;
  position?: string;
  city: string;
  customer_type: "residencial" | "comercial" | "industrial";
  sector?: string;
  monthly_consumption_kwh?: number;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  calculation_id?: string;
}

// Response
interface LeadResponse {
  id: string;
  status: "new";
  message: "Solicitud recibida. Lo contactaremos en menos de 48 horas.";
}
```

### POST /api/events

Registra eventos de interacción para analytics del funnel.

```typescript
// Request
interface EventRequest {
  session_id: string;
  event_type:
    | "page_view"            // Entró a la landing
    | "calculator_started"   // Movió un slider o cambió un campo
    | "calculator_completed" // Vio los resultados del cálculo
    | "kit_viewed"           // Hizo clic en un kit específico
    | "form_started"         // Hizo clic en el primer campo del formulario
    | "form_submitted"       // Envió el formulario exitosamente
    | "cta_clicked"          // Hizo clic en un botón de acción
    | "pdf_downloaded";      // Descargó el resumen del decreto
  event_data?: Record<string, any>;
  city?: string;
  customer_type?: string;
}

// Response: 204 No Content
```

**¿Para qué sirve page_events?**

Mide el funnel de conversión de la landing:

```
page_view (1,000) → calculator_started (400) → calculator_completed (300)
→ form_started (120) → form_submitted (45)

Conversión: 4.5%
Drop más grande: calculator → form (60% abandono)
→ Acción: simplificar formulario o mostrar CTA inmediatamente después del cálculo
```

También permite segmentar por ciudad y tipo de cliente para saber dónde hay más
demanda. Por ejemplo: "el 70% de los cálculos son de Guayaquil, industrial" →
enfocar pauta publicitaria ahí.

Es opcional para el MVP. Se puede reemplazar con Google Analytics 4 si no
quieres construir tracking propio.

---

## 6. Base de datos

Schema completo en `solar-api-schema.dbml` (para pegar en dbdiagram.io).

| Área | Tablas | Propósito |
|------|--------|-----------|
| Referencia | cities, city_monthly_irradiance, distributors, system_config | Datos de configuración, cambian poco |
| Tarifas | tariff_schedules, tariff_ranges | Tarifas por distribuidora, se actualizan anualmente |
| Catálogo | panel_models, inverter_models, battery_models, solar_kits | Productos y combinaciones con precios |
| Operación | leads, calculations, calculation_monthly_breakdown, page_events | Datos generados por usuarios |

---

## 7. Fuentes oficiales para actualización

| Dato | Fuente | URL | Frecuencia |
|------|--------|-----|------------|
| HSP por ciudad | NASA POWER API | power.larc.nasa.gov/api | Bajo demanda |
| HSP por ciudad | Global Solar Atlas | globalsolaratlas.info | Estático |
| Tarifas eléctricas | ARCONEL / CNEL | arconel.gob.ec/servicio-publico-de-energia-electrica-spee/ | Anual |
| Pliego tarifario PDF | CNEL EP | cnelep.gob.ec/pliego-tarifario-2023/ | Anual |
| Factor CO₂ del SNI | CENACE / ARCONEL | arconel.gob.ec (sección Factor CO2) | Anual |
| Decreto 32 | Gobierno Ecuador | Decreto Ejecutivo 32, 15 junio 2025 | N/A |
| Kits y precios | Proveedores directos | Enercity, Airis, ProViento, Rising Sun | Trimestral |

---

## 8. Stack tecnológico sugerido

```
Frontend:  Next.js 14+ (App Router) + Tailwind + Recharts (gráficos)
Backend:   Next.js API Routes o NestJS
DB:        PostgreSQL (Supabase o Neon)
ORM:       Prisma
Queue:     BullMQ (si se necesita procesar leads async)
Email:     Resend (ya configurado para davitprado.com)
Analytics: page_events propio o GA4
Deploy:    Vercel (frontend) + Supabase (DB)
```
