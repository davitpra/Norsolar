import { supabase } from '@/lib/supabase/client';
import type { CityRow, KitRow, TariffRangeRow, SystemConfigMap, CustomerType } from './types';

// ── Cities ─────────────────────────────────────────────────
export async function getCities() {
  const { data, error } = await supabase
    .from('cities')
    .select('id, name, province, region, hsp_annual, distributors(name)')
    .order('name');
  if (error) throw new Error(error.message);
  return data;
}

export async function getCityWithIrradiance(cityName: string): Promise<CityRow> {
  const { data: city, error: ce } = await supabase
    .from('cities')
    .select('id, name, region, hsp_annual, distributor_id, distributors(name)')
    .ilike('name', cityName)
    .single();
  if (ce || !city) throw new Error(`Ciudad no encontrada: ${cityName}`);

  const { data: irr, error: ie } = await supabase
    .from('city_monthly_irradiance')
    .select('month, hsp, factor')
    .eq('city_id', city.id);
  if (ie) throw new Error(ie.message);

  const monthly_factors: Record<number, number> = {};
  for (const row of irr ?? []) {
    monthly_factors[row.month] = Number(row.factor);
  }

  const dist = city.distributors;
  const distName = Array.isArray(dist)
    ? (dist[0] as { name: string } | undefined)?.name ?? ''
    : (dist as { name: string } | null)?.name ?? '';

  return {
    id: city.id,
    name: city.name,
    region: city.region,
    hsp_annual: Number(city.hsp_annual),
    distributor_id: city.distributor_id ?? '',
    distributor_name: distName,
    monthly_factors,
  };
}

// ── Tariffs ────────────────────────────────────────────────
export type VoltageLevel = 'bajo_voltaje' | 'medio_voltaje' | 'alto_voltaje_av1' | 'alto_voltaje_av2';

export function defaultVoltageLevel(customerType: CustomerType): VoltageLevel {
  if (customerType === 'industrial') return 'medio_voltaje';
  return 'bajo_voltaje';
}

export async function getActiveTariff(
  distributorId: string,
  customerType: CustomerType,
  voltageLevel?: VoltageLevel,
): Promise<TariffRangeRow[]> {
  const vl = voltageLevel ?? defaultVoltageLevel(customerType);

  // 1. Try distributor-specific schedule with matching voltage_level
  const { data: schedule } = await supabase
    .from('tariff_schedules')
    .select('id')
    .eq('distributor_id', distributorId)
    .eq('customer_type', customerType)
    .eq('voltage_level', vl)
    .eq('is_active', true)
    .order('valid_from', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (schedule) return getRangesForSchedule(schedule.id);

  // 2. Fallback: national schedule (distributor_id null) with matching voltage_level
  const { data: fb } = await supabase
    .from('tariff_schedules')
    .select('id')
    .is('distributor_id', null)
    .eq('customer_type', customerType)
    .eq('voltage_level', vl)
    .eq('is_active', true)
    .order('valid_from', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (fb) return getRangesForSchedule(fb.id);

  throw new Error(`Tarifa no encontrada para tipo: ${customerType} (${vl})`);
}

async function getRangesForSchedule(scheduleId: string): Promise<TariffRangeRow[]> {
  const { data, error } = await supabase
    .from('tariff_ranges')
    .select('min_kwh, max_kwh, energy_rate')
    .eq('schedule_id', scheduleId)
    .order('min_kwh');
  if (error) throw new Error(error.message);
  return (data ?? []).map((r) => ({
    min_kwh: r.min_kwh,
    max_kwh: r.max_kwh,
    energy_rate: Number(r.energy_rate),
  }));
}

// ── Kits ───────────────────────────────────────────────────
export async function getKitsByTarget(target: CustomerType): Promise<KitRow[]> {
  const { data, error } = await supabase
    .from('solar_kits')
    .select(`
      id, name, slug, target, system_type, power_kwp,
      panel_quantity, price_usd, roof_area_required_m2, image_url,
      panel_models(watts, brand),
      inverter_models(brand, type),
      battery_models(capacity_kwh)
    `)
    .eq('target', target)
    .eq('is_active', true)
    .order('power_kwp');
  if (error) throw new Error(error.message);

  return (data ?? []).map((k) => {
    const panelRaw = k.panel_models;
    const inverterRaw = k.inverter_models;
    const batteryRaw = k.battery_models;
    const panel = Array.isArray(panelRaw)
      ? (panelRaw[0] as { watts: number; brand: string } | undefined) ?? null
      : (panelRaw as { watts: number; brand: string } | null);
    const inverter = Array.isArray(inverterRaw)
      ? (inverterRaw[0] as { brand: string; type: string } | undefined) ?? null
      : (inverterRaw as { brand: string; type: string } | null);
    const battery = Array.isArray(batteryRaw)
      ? (batteryRaw[0] as { capacity_kwh: number } | undefined) ?? null
      : (batteryRaw as { capacity_kwh: number } | null);
    return {
      id: k.id,
      name: k.name,
      slug: k.slug,
      target: k.target as CustomerType,
      system_type: k.system_type as 'on_grid' | 'hybrid' | 'off_grid',
      power_kwp: Number(k.power_kwp),
      panel_quantity: k.panel_quantity,
      panel_watts: panel?.watts ?? 550,
      panel_brand: panel?.brand ?? 'Solar',
      inverter_brand: inverter?.brand ?? 'Inversor',
      inverter_type: (inverter?.type ?? 'on_grid') as 'on_grid' | 'hybrid' | 'off_grid',
      battery_kwh: battery ? Number(battery.capacity_kwh) : null,
      price_usd: Number(k.price_usd),
      roof_area_required_m2: Number(k.roof_area_required_m2),
      image_url: k.image_url ?? null,
    };
  });
}

// ── System config ──────────────────────────────────────────
export async function getSystemConfig(): Promise<SystemConfigMap> {
  const { data, error } = await supabase.from('system_config').select('key, value');
  if (error) throw new Error(error.message);
  const map: Record<string, number> = {};
  for (const row of data ?? []) map[row.key] = Number(row.value);
  return {
    panel_degradation_per_year: map.panel_degradation_per_year ?? 0.005,
    system_losses_sierra: map.system_losses_sierra ?? 0.20,
    system_losses_costa: map.system_losses_costa ?? 0.22,
    co2_factor_kg_per_kwh: map.co2_factor_kg_per_kwh ?? 0.3353,
    electricity_inflation_rate: map.electricity_inflation_rate ?? 0.03,
    system_lifespan_years: map.system_lifespan_years ?? 25,
  };
}

// ── Persistencia ───────────────────────────────────────────
export async function insertCalculation(payload: {
  id: string;
  session_id?: string;
  city_id: string;
  customer_type: CustomerType;
  monthly_consumption_kwh: number;
  current_tariff_usd: number;
  recommended_kit_id: string;
  system_size_kwp: number;
  monthly_generation_kwh: number;
  annual_generation_kwh: number;
  coverage_percentage: number;
  monthly_savings_usd: number;
  annual_savings_usd: number;
  total_savings_25y_usd: number;
  roi_years: number;
  co2_reduction_annual_tons: number;
  co2_reduction_25y_tons: number;
  estimated_investment_usd: number;
}) {
  const { error } = await supabase.from('calculations').insert(payload);
  if (error) console.error('[insertCalculation]', error.message);
}

export async function insertCalculationBreakdown(rows: {
  id: string;
  calculation_id: string;
  month: number;
  generation_kwh: number;
  consumption_kwh: number;
  cost_without_solar_usd: number;
  cost_with_solar_usd: number;
  savings_usd: number;
}[]) {
  const { error } = await supabase.from('calculation_monthly_breakdown').insert(rows);
  if (error) console.error('[insertBreakdown]', error.message);
}

export async function insertLead(payload: {
  id: string;
  company_name?: string;
  contact_name: string;
  email: string;
  phone?: string;
  position?: string;
  city_id?: string;
  customer_type: CustomerType;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}) {
  const { error } = await supabase.from('leads').insert(payload);
  if (error) throw new Error(error.message);
}

export async function linkLeadToCalculation(calculationId: string, leadId: string) {
  const { error } = await supabase
    .from('calculations')
    .update({ lead_id: leadId })
    .eq('id', calculationId);
  if (error) console.error('[linkLead]', error.message);
}

export async function getCityIdByName(cityName: string): Promise<string | null> {
  const { data } = await supabase
    .from('cities')
    .select('id')
    .ilike('name', cityName)
    .limit(1)
    .single();
  return data?.id ?? null;
}
