import type { CustomerType, KitRow, TariffRangeRow, SystemConfigMap } from './types';

const MONTH_NAMES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

// ── Tamaño del sistema ─────────────────────────────────────
export function calcKwpNeeded(
  consumptionKwh: number,
  hsp: number,
  losses: number,
): number {
  return consumptionKwh / (hsp * 30 * (1 - losses));
}

// ── Generación mensual de un kit instalado ─────────────────
export function calcMonthlyGeneration(kwp: number, hsp: number, losses: number): number {
  return kwp * hsp * 30 * (1 - losses);
}

// ── Factura con tarifa escalonada (residencial) ────────────
export function calcEscalonadaCost(consumptionKwh: number, ranges: TariffRangeRow[]): number {
  let total = 0;
  let remaining = consumptionKwh;
  for (const r of ranges) {
    if (remaining <= 0) break;
    const rangeSize = r.max_kwh != null ? r.max_kwh - r.min_kwh : Infinity;
    const consumed = Math.min(remaining, rangeSize);
    total += consumed * r.energy_rate;
    remaining -= consumed;
  }
  return total;
}

// ── Factura con tarifa plana (comercial / industrial) ──────
export function calcFlatCost(consumptionKwh: number, rate: number): number {
  return consumptionKwh * rate;
}

// ── Ahorro mensual considerando tarifa escalonada ──────────
// El ahorro se realiza en los rangos más caros primero.
export function calcMonthlySavings(
  consumptionKwh: number,
  generationKwh: number,
  customerType: CustomerType,
  tariffRanges: TariffRangeRow[],
  flatRate: number,
): number {
  const netConsumption = Math.max(0, consumptionKwh - generationKwh);
  if (customerType === 'residencial') {
    const without = calcEscalonadaCost(consumptionKwh, tariffRanges);
    const with_ = calcEscalonadaCost(netConsumption, tariffRanges);
    return without - with_;
  }
  return Math.min(generationKwh, consumptionKwh) * flatRate;
}

// ── Selección de kit recomendado ───────────────────────────
// Prefiere kits con cobertura entre 60% y 80% (sweet spot costo-beneficio).
// Dentro del rango elige el de menor precio por kWp.
// Si ninguno cae en el rango, cae al más cercano (preferentemente el de mayor cobertura).
export function selectKit(
  consumptionKwh: number,
  hsp: number,
  losses: number,
  customerType: CustomerType,
  kits: KitRow[],
): { recommended: KitRow; alternatives: KitRow[] } {
  const kwpNeeded = calcKwpNeeded(consumptionKwh, hsp, losses);
  const customerKits = kits.filter((k) => k.target === customerType);

  if (customerKits.length === 0) {
    throw new Error(`No hay kits disponibles para el tipo: ${customerType}`);
  }

  const byCostBenefit = (arr: KitRow[]) =>
    [...arr].sort((a, b) => a.price_usd / a.power_kwp - b.price_usd / b.power_kwp);

  // Sweet spot: kits que cubren entre 60% y 80% del consumo
  const inRange = customerKits.filter(
    (k) => k.power_kwp >= kwpNeeded * 0.6 && k.power_kwp <= kwpNeeded * 0.8,
  );

  let recommended: KitRow;

  if (inRange.length > 0) {
    recommended = byCostBenefit(inRange)[0];
  } else {
    // Fallback: el kit más cercano al rango ideal (preferir cobertura mayor a menor)
    const above = customerKits
      .filter((k) => k.power_kwp > kwpNeeded * 0.8)
      .sort((a, b) => a.power_kwp - b.power_kwp);
    if (above.length > 0) {
      recommended = above[0];
    } else {
      // Todos los kits están bajo 60% → tomar el más grande disponible
      recommended = [...customerKits].sort((a, b) => b.power_kwp - a.power_kwp)[0];
    }
  }

  const alternatives = customerKits.filter((k) => k.id !== recommended.id);
  return { recommended, alternatives };
}

// ── Métricas completas para un kit dado ────────────────────
export interface KitMetrics {
  monthlyGenerationKwh: number;
  annualGenerationKwh: number;
  coveragePercent: number;
  monthlySavingsUsd: number;
  annualSavingsUsd: number;
  total25YearsUsd: number;
  roiYears: number;
  co2AnnualTons: number;
  co2TwentyFiveTons: number;
  comparisonChart: { month: string; without_solar_usd: number; with_solar_usd: number; generation_kwh: number; consumption_kwh: number }[];
}

export function computeKitMetrics(
  consumptionKwh: number,
  kit: KitRow,
  hspAnnual: number,
  monthlyFactors: Record<number, number>,
  region: string,
  customerType: CustomerType,
  tariffRanges: TariffRangeRow[],
  flatRate: number,
  cfg: SystemConfigMap,
): KitMetrics {
  const losses = region === 'costa' ? cfg.system_losses_costa : cfg.system_losses_sierra;
  const monthlyGenKwh = calcMonthlyGeneration(kit.power_kwp, hspAnnual, losses);
  const coveragePercent = Math.min((monthlyGenKwh / consumptionKwh) * 100, 100);

  // 12-month comparison using seasonal factors
  const comparisonChart = Array.from({ length: 12 }, (_, i) => {
    const m = i + 1;
    const factor = monthlyFactors[m] ?? 1;
    const hspMonth = hspAnnual * factor;
    const genMonth = calcMonthlyGeneration(kit.power_kwp, hspMonth, losses);
    const without = customerType === 'residencial'
      ? calcEscalonadaCost(consumptionKwh, tariffRanges)
      : calcFlatCost(consumptionKwh, flatRate);
    const netCons = Math.max(0, consumptionKwh - genMonth);
    const with_ = customerType === 'residencial'
      ? calcEscalonadaCost(netCons, tariffRanges)
      : calcFlatCost(netCons, flatRate);
    return {
      month: MONTH_NAMES[i],
      without_solar_usd: Math.round(without * 100) / 100,
      with_solar_usd: Math.round(with_ * 100) / 100,
      generation_kwh: Math.round(genMonth * 10) / 10,
      consumption_kwh: Math.round(consumptionKwh * 10) / 10,
    };
  });

  const annualSavingsUsd = comparisonChart.reduce(
    (sum, m) => sum + (m.without_solar_usd - m.with_solar_usd), 0,
  );
  const monthlySavingsUsd = annualSavingsUsd / 12;

  // Annual generation (sum over 12 months)
  const annualGenKwh = Array.from({ length: 12 }, (_, i) => {
    const factor = monthlyFactors[i + 1] ?? 1;
    return calcMonthlyGeneration(kit.power_kwp, hspAnnual * factor, losses);
  }).reduce((a, b) => a + b, 0);

  // 25-year accumulation with inflation + degradation (same pattern as lib/kits.ts)
  const lifespan = cfg.system_lifespan_years;
  const inflation = cfg.electricity_inflation_rate;
  const degradation = cfg.panel_degradation_per_year;

  let accumulated = 0;
  let roiYears = 0;
  let co2TwentyFiveTons = 0;
  let prevAccumulated = 0;

  for (let y = 1; y <= lifespan; y++) {
    const inflFactor = Math.pow(1 + inflation, y - 1);
    const degFactor = 1 - degradation * (y - 1);
    const yearSavings = annualSavingsUsd * inflFactor * degFactor;
    prevAccumulated = accumulated;
    accumulated += yearSavings;

    const yearGen = annualGenKwh * degFactor;
    co2TwentyFiveTons += (yearGen * cfg.co2_factor_kg_per_kwh) / 1000;

    if (roiYears === 0 && accumulated >= kit.price_usd) {
      const frac = (kit.price_usd - prevAccumulated) / (accumulated - prevAccumulated);
      roiYears = parseFloat((y - 1 + frac).toFixed(1));
    }
  }

  if (roiYears === 0) roiYears = lifespan; // never paid off

  const co2AnnualTons = (annualGenKwh * cfg.co2_factor_kg_per_kwh) / 1000;

  return {
    monthlyGenerationKwh: Math.round(monthlyGenKwh * 10) / 10,
    annualGenerationKwh: Math.round(annualGenKwh * 10) / 10,
    coveragePercent: Math.round(coveragePercent * 10) / 10,
    monthlySavingsUsd: Math.round(monthlySavingsUsd * 100) / 100,
    annualSavingsUsd: Math.round(annualSavingsUsd * 100) / 100,
    total25YearsUsd: Math.round(accumulated * 100) / 100,
    roiYears,
    co2AnnualTons: Math.round(co2AnnualTons * 100) / 100,
    co2TwentyFiveTons: Math.round(co2TwentyFiveTons * 100) / 100,
    comparisonChart,
  };
}
