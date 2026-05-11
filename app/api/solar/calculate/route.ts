import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { getCityWithIrradiance, getActiveTariff, getKitsByTarget, getSystemConfig, insertCalculation, insertCalculationBreakdown } from '@/lib/solar/db';
import { selectKit, computeKitMetrics } from '@/lib/solar/calculator';
import type { CalculateResponse, CustomerType, KitOption } from '@/lib/solar/types';

const BodySchema = z.object({
  city: z.string().min(1),
  type: z.enum(['residencial', 'comercial', 'industrial']),
  monthly_consumption_kwh: z.number().positive(),
  electricity_tariff_usd: z.number().positive(),
  session_id: z.string().optional(),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }

  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { city, type, monthly_consumption_kwh, electricity_tariff_usd, session_id } = parsed.data;
  const customerType = type as CustomerType;

  try {
    const [cityData, kits, cfg] = await Promise.all([
      getCityWithIrradiance(city),
      getKitsByTarget(customerType),
      getSystemConfig(),
    ]);

    const tariffRanges = await getActiveTariff(cityData.distributor_id, customerType);
    const flatRate = electricity_tariff_usd;
    const losses = cityData.region === 'costa' ? cfg.system_losses_costa : cfg.system_losses_sierra;

    const { recommended, alternatives } = selectKit(
      monthly_consumption_kwh,
      cityData.hsp_annual,
      losses,
      customerType,
      kits,
    );

    const metrics = computeKitMetrics(
      monthly_consumption_kwh,
      recommended,
      cityData.hsp_annual,
      cityData.monthly_factors,
      cityData.region,
      customerType,
      tariffRanges,
      flatRate,
      cfg,
    );

    const calculationId = randomUUID();

    // Persist async — non-blocking
    void insertCalculation({
      id: calculationId,
      session_id,
      city_id: cityData.id,
      customer_type: customerType,
      monthly_consumption_kwh,
      current_tariff_usd: electricity_tariff_usd,
      recommended_kit_id: recommended.id,
      system_size_kwp: recommended.power_kwp,
      monthly_generation_kwh: metrics.monthlyGenerationKwh,
      annual_generation_kwh: metrics.annualGenerationKwh,
      coverage_percentage: metrics.coveragePercent,
      monthly_savings_usd: metrics.monthlySavingsUsd,
      annual_savings_usd: metrics.annualSavingsUsd,
      total_savings_25y_usd: metrics.total25YearsUsd,
      roi_years: metrics.roiYears,
      co2_reduction_annual_tons: metrics.co2AnnualTons,
      co2_reduction_25y_tons: metrics.co2TwentyFiveTons,
      estimated_investment_usd: recommended.price_usd,
    }).then(() =>
      insertCalculationBreakdown(
        metrics.comparisonChart.map((m, i) => ({
          id: randomUUID(),
          calculation_id: calculationId,
          month: i + 1,
          generation_kwh: m.generation_kwh,
          consumption_kwh: monthly_consumption_kwh,
          cost_without_solar_usd: m.without_solar_usd,
          cost_with_solar_usd: m.with_solar_usd,
          savings_usd: m.without_solar_usd - m.with_solar_usd,
        })),
      ),
    );

    function buildKitOption(kit: typeof recommended, m: typeof metrics): KitOption {
      return {
        id: kit.id,
        name: kit.name,
        power_kwp: kit.power_kwp,
        num_panels: kit.panel_quantity,
        panel_watts: kit.panel_watts,
        panel_brand: kit.panel_brand,
        inverter_brand: kit.inverter_brand,
        inverter_type: kit.inverter_type,
        includes_battery: kit.battery_kwh != null,
        battery_kwh: kit.battery_kwh,
        price_usd: kit.price_usd,
        roof_area_m2: kit.roof_area_required_m2,
        image_url: kit.image_url,
        savings: {
          monthly_usd: m.monthlySavingsUsd,
          annual_usd: m.annualSavingsUsd,
          total_25_years_usd: m.total25YearsUsd,
          roi_years: m.roiYears,
          coverage_percentage: m.coveragePercent,
        },
        generation: {
          monthly_kwh: m.monthlyGenerationKwh,
          annual_kwh: m.annualGenerationKwh,
        },
        environmental: {
          co2_reduction_annual_tons: m.co2AnnualTons,
          co2_reduction_25_years_tons: m.co2TwentyFiveTons,
        },
        comparison_chart: m.comparisonChart,
      };
    }

    const otherKits = kits.filter((k) => k.id !== recommended.id);
    const allKits: KitOption[] = [
      buildKitOption(recommended, metrics),
      ...otherKits.map((alt) => {
        const altM = computeKitMetrics(
          monthly_consumption_kwh,
          alt,
          cityData.hsp_annual,
          cityData.monthly_factors,
          cityData.region,
          customerType,
          tariffRanges,
          flatRate,
          cfg,
        );
        return buildKitOption(alt, altM);
      }),
    ].sort((a, b) => a.power_kwp - b.power_kwp);

    const response: CalculateResponse = {
      calculation_id: calculationId,
      kits: allKits,
      recommended_kit_id: recommended.id,
    };

    return NextResponse.json(response);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error interno';
    console.error('[/api/solar/calculate]', msg);
    if (msg.includes('no encontrad')) {
      return NextResponse.json({ error: msg }, { status: 404 });
    }
    return NextResponse.json({ error: 'internal' }, { status: 500 });
  }
}
