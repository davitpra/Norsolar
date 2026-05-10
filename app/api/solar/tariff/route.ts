import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getCityWithIrradiance, getActiveTariff, defaultVoltageLevel } from '@/lib/solar/db';
import { calcEscalonadaCost } from '@/lib/solar/calculator';
import type { CustomerType } from '@/lib/solar/types';

export const revalidate = 3600;

const QuerySchema = z.object({
  city: z.string().min(1),
  type: z.enum(['residencial', 'comercial', 'industrial']),
  consumption: z.coerce.number().positive().optional(),
});

export async function GET(req: NextRequest) {
  const params = Object.fromEntries(req.nextUrl.searchParams);
  const parsed = QuerySchema.safeParse(params);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { city, type, consumption } = parsed.data;
  const customerType = type as CustomerType;

  try {
    const cityData = await getCityWithIrradiance(city);
    const voltageLevel = defaultVoltageLevel(customerType);
    const ranges = await getActiveTariff(cityData.distributor_id, customerType, voltageLevel);

    let suggestedRate: number;
    let rateBasis: 'escalonada_avg' | 'flat';

    if (customerType === 'residencial') {
      const cons = consumption ?? 200;
      const totalCost = calcEscalonadaCost(cons, ranges);
      suggestedRate = cons > 0 ? totalCost / cons : (ranges[0]?.energy_rate ?? 0.10);
      rateBasis = 'escalonada_avg';
    } else {
      suggestedRate = ranges[0]?.energy_rate ?? 0.10;
      rateBasis = 'flat';
    }

    return NextResponse.json({
      distributor: cityData.distributor_name,
      voltage_level: voltageLevel,
      suggested_rate: Math.round(suggestedRate * 10000) / 10000,
      rate_basis: rateBasis,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error interno';
    if (msg.includes('no encontrad')) {
      return NextResponse.json({ error: msg }, { status: 404 });
    }
    console.error('[/api/solar/tariff]', msg);
    return NextResponse.json({ error: 'internal' }, { status: 500 });
  }
}
