import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { insertLead, linkLeadToCalculation, getCityIdByName } from '@/lib/solar/db';
import type { CustomerType } from '@/lib/solar/types';

const BodySchema = z.object({
  company_name: z.string().optional(),
  contact_name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  position: z.string().optional(),
  city: z.string().min(1),
  customer_type: z.enum(['residencial', 'comercial', 'industrial']),
  monthly_consumption_kwh: z.number().optional(),
  source: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  calculation_id: z.string().optional(),
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

  const { city, customer_type, calculation_id, ...rest } = parsed.data;

  try {
    const city_id = await getCityIdByName(city);
    const leadId = randomUUID();

    await insertLead({
      id: leadId,
      ...rest,
      city_id: city_id ?? undefined,
      customer_type: customer_type as CustomerType,
      source: rest.source ?? 'landing',
    });

    if (calculation_id) {
      void linkLeadToCalculation(calculation_id, leadId);
    }

    return NextResponse.json({
      id: leadId,
      status: 'new',
      message: 'Solicitud recibida. Lo contactaremos en menos de 48 horas.',
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error interno';
    console.error('[/api/leads]', msg);
    return NextResponse.json({ error: 'internal' }, { status: 500 });
  }
}
