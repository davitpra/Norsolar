# Datos de producción — API Calculadora Solar Ecuador
# Fuentes verificadas, mayo 2026

---

## 1. Irradiación solar por ciudad (HSP — Horas Sol Pico / día)

Fuente: Global Solar Atlas, NASA POWER, The Cuenca Dispatch, estudios académicos EPN/ESPOL

```typescript
const HSP_POR_CIUDAD: Record<string, number> = {
  // Sierra
  "Quito":          4.5,   // Rango 4.2-5.8, promedio 5.2 kWh/m² (pero con nubosidad ~4.5 efectivo)
  "Cuenca":         4.2,   // Similar a Guayaquil ~4.8 kWh/m², ajustado por nubosidad sierra
  "Ambato":         4.5,   // Sierra central, similar a Quito
  "Riobamba":       4.8,   // Buena irradiación por altitud y cielo despejado
  "Ibarra":         4.5,   // Sierra norte, hasta 5.8 kWh/m² en condiciones óptimas
  "Loja":           4.3,   // Sierra sur

  // Costa
  "Guayaquil":      4.7,   // Rango 4.65-4.8 kWh/m², ~4.5 hrs productivas (11am-4:30pm)
  "Manta":          5.0,   // Alta irradiación, costa central
  "Machala":        4.6,   // Costa sur
  "Portoviejo":     4.5,   // Rango 3.9-4.2 HSP zonas urbanas, hasta 6.5 zonas rurales costeras
  "Santo Domingo":  3.8,   // Zona de transición, más nublado
  "Esmeraldas":     4.3,   // Costa norte

  // Oriente
  "Puyo":           3.5,   // Amazonía, alta nubosidad
  "Tena":           3.5,
  "Nueva Loja":     3.8,

  // Insular
  "Galápagos":      5.5,   // Alta irradiación
};
```

### Fuente programática: NASA POWER API (gratuita, sin API key)

```typescript
// Endpoint para obtener irradiación mensual por coordenadas
// Parámetro ALLSKY_SFC_SW_DWN = irradiación global horizontal (kWh/m²/día)

const NASA_POWER_URL = "https://power.larc.nasa.gov/api/temporal/monthly/point";

async function getHSPFromNASA(lat: number, lon: number): Promise<Record<string, number>> {
  const url = `${NASA_POWER_URL}?parameters=ALLSKY_SFC_SW_DWN&community=RE&longitude=${lon}&latitude=${lat}&start=2020&end=2024&format=JSON`;
  const res = await fetch(url);
  const data = await res.json();
  // data.properties.parameter.ALLSKY_SFC_SW_DWN contiene valores mensuales en kWh/m²/día
  return data.properties.parameter.ALLSKY_SFC_SW_DWN;
}

// Coordenadas principales:
// Quito:      lat: -0.1807, lon: -78.4678
// Guayaquil:  lat: -2.1710, lon: -79.9224
// Cuenca:     lat: -2.9001, lon: -79.0059
// Manta:      lat: -0.9500, lon: -80.7333
// Ambato:     lat: -1.2491, lon: -78.6168
// Loja:       lat: -3.9931, lon: -79.2042
```

---

## 2. Tarifas eléctricas vigentes (2025-2026)

Fuente: Pliego Tarifario ARCONEL Resolución 022/2024 y Reforma 006/25

### Tarifa residencial (bajo voltaje) — SIN CAMBIOS en 2025-2026

```typescript
const TARIFA_RESIDENCIAL = {
  dignidad: {
    // Aplica si consume ≤110 kWh/mes (Sierra/Amazonía) o ≤130 kWh/mes (Costa/Galápagos)
    // durante 9 meses consecutivos
    tarifa_usd_kwh: 0.0450,
    descripcion: "Tarifa de la Dignidad",
  },
  rangos: [
    { min: 0,    max: 50,   tarifa: 0.091 },
    { min: 51,   max: 100,  tarifa: 0.093 },
    { min: 101,  max: 130,  tarifa: 0.095 },  // Límite dignidad Costa
    { min: 131,  max: 500,  tarifa: 0.100 },  // Promedio según CNEL
    { min: 501,  max: 700,  tarifa: 0.105 },  // Tarifa plana desde reforma
    { min: 701,  max: 1000, tarifa: 0.150 },
    { min: 1001, max: 2500, tarifa: 0.200 },
    { min: 2501, max: 3500, tarifa: 0.470 },
    { min: 3501, max: null, tarifa: 0.680 },  // Máximo posible
  ],
  precio_medio_nacional: 0.1061,  // Precio medio 2026 según ARCONEL
};
```

### Tarifa comercial/general (bajo voltaje)

```typescript
const TARIFA_COMERCIAL = {
  // Tarifa general con demanda, bajo voltaje
  energia_usd_kwh: 0.093,           // Componente energía
  demanda_usd_kw: 4.576,            // Componente demanda (USD/kW-mes)
  precio_medio_aprox: 0.105,        // Precio medio efectivo aproximado
};
```

### Tarifa industrial

```typescript
const TARIFA_INDUSTRIAL = {
  // Medio Voltaje (MV) — 0.6 kV a 40 kV
  // REFORMA julio 2025: incremento del 25%
  medio_voltaje: {
    precio_medio_anterior: 0.0927,  // Antes de julio 2025
    precio_medio_actual:   0.1164,  // Desde julio 2025
    descripcion: "Industrias en parques industriales (Quito, Cuenca, Ambato)",
  },

  // Alto Voltaje AV1 — 40 kV a 138 kV
  // REFORMA julio 2025: incremento del 29%
  alto_voltaje_av1: {
    precio_medio_anterior: 0.0791,
    precio_medio_actual:   0.1022,
    descripcion: "Cementeras, grandes industrias (ej: Durán, Guayas)",
  },

  // Alto Voltaje AV2 — más de 138 kV
  // SIN CAMBIOS
  alto_voltaje_av2: {
    precio_medio: 0.055,  // Aproximado, petroleras, mineras, acereras
    descripcion: "Grandes consumidores industriales",
  },
};
```

**Nota importante:** Las tarifas residenciales son escalonadas (el consumidor paga diferente por cada rango). Para el cálculo del ahorro solar, lo relevante es que **el ahorro se da en los rangos más altos primero** — si un cliente consume 500 kWh y los paneles cubren 300 kWh, ya no paga las tarifas altas de los rangos superiores.

---

## 3. Factor de emisión de CO₂

Fuente: CENACE — Informe Factor de Emisión CO2 del SNI, 2024

```typescript
const CO2_FACTORS = {
  // Factor de emisión del margen combinado (CM) ex Post — 2024
  // Este es el valor oficial más reciente de CENACE/ARCONEL
  margen_combinado_tco2_mwh: 0.3353,

  // Convertido a kg CO2 por kWh (para uso en calculadora)
  kg_co2_per_kwh: 0.3353,

  // Fuente del dato
  fuente: "CENACE/ARCONEL, Informe 2024",
  url: "https://arconel.gob.ec/wp-content/uploads/downloads/2025/09/Factor-de-emision-de-CO2-del-Sistema-Nacional-Interconectado-de-Ecuador-Informe-2024_compressed.pdf",

  // Contexto: Ecuador tiene alta generación hidroeléctrica (~70-80%)
  // por lo que su factor es relativamente bajo comparado con otros países.
  // Sin embargo, durante estiaje (época seca) se activan más térmicas,
  // lo que sube el factor en esos meses.

  // Histórico de referencia:
  // 2014: 0.3426 tCO2/MWh
  // 2019: ~0.25 tCO2/MWh (pico de hidro post Coca Codo Sinclair)
  // 2024: 0.3353 tCO2/MWh (subió por crisis hídrica y más generación térmica)
};
```

---

## 4. Factores del sistema fotovoltaico

```typescript
const SYSTEM_FACTORS = {
  // Degradación anual de paneles (garantía estándar fabricante)
  panel_degradation_per_year: 0.005,    // 0.5% anual (industria estándar)

  // Pérdidas totales del sistema
  // Incluye: inversión DC-AC (~3%), cableado (~2%), temperatura (~5-8%),
  //          polvo/suciedad (~3-5%), mismatch (~2%), disponibilidad (~1%)
  system_losses: 0.20,                  // 20% total (conservador para Ecuador)
  // Nota: En costa caliente como Guayaquil, las pérdidas por temperatura
  //       pueden ser mayores (hasta 25% total)

  // Vida útil del sistema
  system_lifespan_years: 25,            // Garantía estándar de producción

  // Inflación eléctrica estimada
  electricity_inflation_rate: 0.03,     // 3% anual (conservador)
  // Con la eliminación de subsidios industriales (julio 2025),
  // la tendencia es al alza

  // Costo referencial por Wp instalado (incluye equipos + instalación)
  cost_per_wp_residential: 1.20,        // USD/Wp residencial
  cost_per_wp_commercial: 1.00,         // USD/Wp comercial
  cost_per_wp_industrial: 0.85,         // USD/Wp industrial (>100kWp)
  // Estos valores deben actualizarse con cotizaciones reales de proveedores

  // Área requerida por kWp instalado
  area_m2_per_kwp: 5.5,                // m² por kWp (paneles de 550W, ~2.5m²/panel)
};
```

---

## 5. Variación mensual de irradiación (factores estacionales)

Fuentes: NASA POWER, INAMHI, Atlas Solar del Ecuador

```typescript
// Factor multiplicador mensual respecto al promedio anual
// Varía significativamente entre Sierra y Costa

const MONTHLY_FACTORS = {
  sierra: {  // Quito, Cuenca, Ambato, etc.
    // En Sierra, los meses más soleados son jun-sep (verano seco)
    // y los más nublados feb-abr (invierno lluvioso)
    ene: 0.95, feb: 0.88, mar: 0.85, abr: 0.85,
    may: 0.95, jun: 1.05, jul: 1.10, ago: 1.15,
    sep: 1.10, oct: 1.00, nov: 0.95, dic: 0.92,
  },
  costa: {  // Guayaquil, Manta, Machala, etc.
    // En Costa, época seca (jun-nov) es la de mayor irradiación
    // época lluviosa (dic-may) es menor pero no tanto como Sierra
    ene: 0.90, feb: 0.88, mar: 0.90, abr: 0.92,
    may: 0.95, jun: 1.05, jul: 1.10, ago: 1.12,
    sep: 1.10, oct: 1.08, nov: 1.02, dic: 0.95,
  },
};

// Para determinar la región de cada ciudad:
const CITY_REGION: Record<string, "sierra" | "costa" | "oriente"> = {
  "Quito": "sierra",
  "Cuenca": "sierra",
  "Ambato": "sierra",
  "Riobamba": "sierra",
  "Ibarra": "sierra",
  "Loja": "sierra",
  "Guayaquil": "costa",
  "Manta": "costa",
  "Machala": "costa",
  "Portoviejo": "costa",
  "Esmeraldas": "costa",
  "Santo Domingo": "costa",
  "Puyo": "oriente",
  "Tena": "oriente",
};
```

---

## 6. Distribuidoras eléctricas por ciudad

```typescript
const DISTRIBUIDORA_POR_CIUDAD: Record<string, string> = {
  "Quito":          "EEQ (Empresa Eléctrica Quito)",
  "Guayaquil":      "CNEL EP - Guayas Los Ríos",
  "Cuenca":         "Centrosur (Empresa Eléctrica Regional Centro Sur)",
  "Ambato":         "EEASA (Empresa Eléctrica Ambato)",
  "Manta":          "CNEL EP - Manabí",
  "Machala":        "CNEL EP - El Oro",
  "Loja":           "EERSSA (Empresa Eléctrica Regional del Sur)",
  "Riobamba":       "EERSA (Empresa Eléctrica Riobamba)",
  "Ibarra":         "Emelnorte",
  "Esmeraldas":     "CNEL EP - Esmeraldas",
  "Santo Domingo":  "CNEL EP - Santo Domingo",
  "Portoviejo":     "CNEL EP - Manabí",
};
```

---

## 7. URLs de fuentes oficiales (para actualizar datos)

```typescript
const FUENTES = {
  pliego_tarifario:
    "https://arconel.gob.ec/servicio-publico-de-energia-electrica-spee/",
  pliego_2025_pdf:
    "https://www.cnelep.gob.ec/wp-content/uploads/2025/01/2.-Pliego-Tarifario-del-Servicio-Publico-de-Energia-Electrcia-ano-2025.pdf",
  factor_co2_2024:
    "https://arconel.gob.ec/wp-content/uploads/downloads/2025/09/Factor-de-emision-de-CO2-del-Sistema-Nacional-Interconectado-de-Ecuador-Informe-2024_compressed.pdf",
  nasa_power_api:
    "https://power.larc.nasa.gov/data-access-viewer/",
  global_solar_atlas:
    "https://globalsolaratlas.info/map?c=-1.5,-78.5,7",
  arconel_general:
    "https://arconel.gob.ec/",
  cnel_tarifas:
    "https://www.cnelep.gob.ec/pliego-tarifario-2023/",
  decreto_32:
    "Decreto Ejecutivo 32, 15 de junio de 2025",
};
```

---

## 8. Dato faltante: catálogo de kits con precios

Este es el único dato que NO se puede obtener de fuentes públicas.
Necesitas contactar proveedores directamente.

### Proveedores sugeridos para cotización:

| Empresa | Ubicación | Contacto web | Enfoque |
|---------|-----------|-------------|---------|
| Enercity (Grupo Futuro) | Quito/Guayaquil | enercity.com.ec | Industrial/comercial |
| Deltaglobal | Ecuador | deltaglobal.ec | Industrial grande (20MW+) |
| Airis Ecuador | Quito | airis.ec | Residencial/comercial |
| ProViento | Ecuador | proviento.com.ec | Distribución equipos |
| Rising Sun Ecuador | Ecuador | risingsunecuador.com | Distribución paneles/inversores |
| SolarTeam | Ecuador | - | Industrial |

### Marcas de equipos más comunes en Ecuador:

**Paneles:** Trina Solar, JA Solar, LONGi, Yingli, Resun Solar (rangos 450-700W)
**Inversores:** Growatt, Sungrow, Huawei, Deye, GoodWe
**Baterías:** Pylontech, BYD, Growatt (LiFePO4), Victron Energy

### Estructura sugerida de kits para la base de datos:

```typescript
const EJEMPLO_KITS = [
  // Residencial pequeño
  { name: "Kit Solar 2 kWp", power_kw: 2.0, panels: 4, panel_w: 550,
    inverter: "Growatt 3kW", battery: false, price_range: "$2,000-2,800" },

  // Residencial medio
  { name: "Kit Solar 5 kWp", power_kw: 5.0, panels: 9, panel_w: 550,
    inverter: "Growatt 5kW", battery: false, price_range: "$4,500-6,000" },

  // Residencial con batería
  { name: "Kit Solar Híbrido 5 kWp", power_kw: 5.0, panels: 9, panel_w: 550,
    inverter: "Growatt SPH 5kW", battery: true, battery_kwh: 5.12,
    price_range: "$7,000-9,000" },

  // Comercial
  { name: "Kit Solar 20 kWp", power_kw: 20.0, panels: 36, panel_w: 550,
    inverter: "Sungrow 20kW", battery: false, price_range: "$16,000-22,000" },

  // Industrial
  { name: "Sistema Solar 100 kWp", power_kw: 100, panels: 182, panel_w: 550,
    inverter: "Sungrow 100kW", battery: false, price_range: "$75,000-95,000" },
];
// NOTA: Estos precios son estimaciones referenciales.
// Los precios reales DEBEN obtenerse de cotizaciones directas.
```
