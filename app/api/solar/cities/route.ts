import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export const revalidate = 3600;

export async function GET() {
  const { data, error } = await supabase
    .from('cities')
    .select('id, name, province, region, hsp_annual, distributors(name)')
    .order('name');

  if (error) {
    return NextResponse.json({ error: 'internal' }, { status: 500 });
  }

  const cities = (data ?? []).map((c) => ({
    id: c.id,
    name: c.name,
    province: c.province,
    region: c.region,
    hsp_annual: Number(c.hsp_annual),
    distributor: Array.isArray(c.distributors)
      ? (c.distributors[0] as { name: string } | undefined)?.name ?? ''
      : (c.distributors as { name: string } | null)?.name ?? '',
  }));

  return NextResponse.json({ cities });
}
