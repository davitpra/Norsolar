export type CustomerType = 'residencial' | 'comercial' | 'industrial';
export type SystemType = 'on_grid' | 'hybrid' | 'off_grid';
export type RegionType = 'sierra' | 'costa' | 'oriente' | 'insular';

// ── API Request ──────────────────────────────────────────────
export interface CalculateRequest {
  city: string;
  type: CustomerType;
  monthly_consumption_kwh: number;
  electricity_tariff_usd: number;
  session_id?: string;
}

// ── API Response ─────────────────────────────────────────────
export interface MonthComparison {
  month: string;
  without_solar_usd: number;
  with_solar_usd: number;
  generation_kwh: number;
  consumption_kwh: number;
}

export interface KitOption {
  id: string;
  name: string;
  power_kwp: number;
  num_panels: number;
  panel_watts: number;
  panel_brand: string;
  inverter_brand: string;
  inverter_type: SystemType;
  includes_battery: boolean;
  battery_kwh: number | null;
  price_usd: number;
  roof_area_m2: number;
  image_url: string | null;
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
  comparison_chart: MonthComparison[];
}

export interface CalculateResponse {
  calculation_id: string;
  kits: KitOption[];
  recommended_kit_id: string;
}

// ── DB row shapes returned by queries ────────────────────────
export interface CityRow {
  id: string;
  name: string;
  region: RegionType;
  hsp_annual: number;
  distributor_id: string;
  distributor_name: string;
  monthly_factors: Record<number, number>; // month(1-12) → factor
}

export interface TariffRangeRow {
  min_kwh: number;
  max_kwh: number | null;
  energy_rate: number;
}

export interface KitRow {
  id: string;
  name: string;
  slug: string;
  target: CustomerType;
  system_type: SystemType;
  power_kwp: number;
  panel_quantity: number;
  panel_watts: number;
  panel_brand: string;
  inverter_brand: string;
  inverter_type: SystemType;
  battery_kwh: number | null;
  price_usd: number;
  roof_area_required_m2: number;
  image_url: string | null;
}

export interface SystemConfigMap {
  panel_degradation_per_year: number;
  system_losses_sierra: number;
  system_losses_costa: number;
  co2_factor_kg_per_kwh: number;
  electricity_inflation_rate: number;
  system_lifespan_years: number;
}
