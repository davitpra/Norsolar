'use client';

import { forwardRef, useMemo } from 'react';
import type { ComponentType, SVGProps } from 'react';
import {
  BanknotesIcon,
  CloudIcon,
  SunIcon,
} from '@heroicons/react/24/outline';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const OFFSET_PCT = 0.75;
const YEARLY_INFLATION = 0.03;
const YEARS = 25;
const KWH_PER_KWP_YEAR = 1500;
const CO2_KG_PER_KWH = 0.475;

const SEASON = [1.05, 0.95, 1.0, 0.98, 1.02, 1.08, 1.1, 1.05, 0.95, 0.92, 0.97, 1.03];
const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

function fmtMoney(n: number) {
  return '$' + Math.round(n).toLocaleString('en-US');
}

interface PayloadEntry {
  dataKey: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: PayloadEntry[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl bg-ns-navy-deep border border-white/10 px-4 py-3 shadow-lg">
      <p className="font-body text-white/60 text-[12px] mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center gap-2 mb-1 last:mb-0">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
          <span className="font-body text-white/70 text-[12px]">
            {p.dataKey === 'sinSolar' ? 'Sin solar' : 'Con solar'}:
          </span>
          <span className="font-display font-extrabold text-white text-[13px]">
            {fmtMoney(p.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

interface MetricCardProps {
  Icon: ComponentType<SVGProps<SVGSVGElement> & { className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
  accent: 'success' | 'orange';
}

function MetricCard({ Icon, label, value, accent }: MetricCardProps) {
  const accentBg = accent === 'success' ? 'bg-ns-success/10' : 'bg-ns-orange/10';
  const accentFg = accent === 'success' ? 'text-ns-success' : 'text-ns-orange';
  return (
    <div className="rounded-2xl border border-ns-border bg-white p-5 shadow-sm flex items-center gap-4">
      <div className={`shrink-0 w-12 h-12 rounded-xl ${accentBg} flex items-center justify-center`}>
        <Icon className={`w-6 h-6 ${accentFg}`} strokeWidth={2} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-body text-ns-muted text-[12px] leading-tight mb-1">{label}</p>
        <p className="font-display font-extrabold text-ns-navy text-[20px] leading-tight truncate">
          {value}
        </p>
      </div>
    </div>
  );
}

interface SavingsResultsProps {
  monthlyBill?: number;
  kitPower?: number;
}

const SavingsResults = forwardRef<HTMLElement, SavingsResultsProps>(function SavingsResults(
  { monthlyBill = 80, kitPower = 6 },
  ref,
) {
  const { monthly, totalSavings25y, annualKwh, co2Tons } = useMemo(() => {
    const bill = Number(monthlyBill) > 0 ? Number(monthlyBill) : 80;
    const power = Number(kitPower) > 0 ? Number(kitPower) : 6;

    const monthly = MONTHS.map((m, i) => ({
      mes: m,
      sinSolar: Math.round(bill * SEASON[i]),
      conSolar: Math.round(bill * SEASON[i] * (1 - OFFSET_PCT)),
    }));

    const totalSavings25y = Math.round(
      Array.from({ length: YEARS }).reduce<number>(
        (acc, _, y) => acc + bill * 12 * OFFSET_PCT * Math.pow(1 + YEARLY_INFLATION, y),
        0,
      ),
    );

    const annualKwh = Math.round(power * KWH_PER_KWP_YEAR);
    const co2Tons = +(annualKwh * CO2_KG_PER_KWH / 1000).toFixed(1);

    return { monthly, totalSavings25y, annualKwh, co2Tons };
  }, [monthlyBill, kitPower]);

  const goToQuote = () => {
    document.getElementById('cotiza')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      ref={ref}
      data-screen-label="Ahorro"
      className="bg-ns-bg-alt border-t border-ns-border ns-section"
    >
      <div className="ns-container py-14 flex flex-col gap-10">
        <div className="text-center">
          <span className="ns-eyebrow">TU AHORRO</span>
          <h2 className="ns-display-h-md mt-3">Compara tu gasto actual vs. energía solar</h2>
        </div>

        <div className="grid grid-cols-12 gap-6 max-tablet:grid-cols-1">
          <div className="col-span-7 max-tablet:col-span-1 rounded-2xl border border-ns-border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4 max-tablet:flex-col max-tablet:items-start max-tablet:gap-3">
              <p className="font-display font-semibold text-ns-navy text-[15px]">Gasto mensual</p>
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-2 font-body text-ns-muted text-[12px]">
                  <span className="w-2.5 h-2.5 rounded-full bg-ns-navy" />
                  Sin energía solar
                </span>
                <span className="inline-flex items-center gap-2 font-body text-ns-muted text-[12px]">
                  <span className="w-2.5 h-2.5 rounded-full bg-ns-orange" />
                  Con energía solar
                </span>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthly} barGap={2} barCategoryGap="20%" margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis
                  dataKey="mes"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontFamily: 'Inter', fontSize: 11, fill: '#9ca3af' }}
                />
                <YAxis
                  tickFormatter={(v: number) => '$' + v}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontFamily: 'Inter', fontSize: 11, fill: '#9ca3af' }}
                  width={45}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(242,140,40,0.06)' }} />
                <Bar dataKey="sinSolar" fill="#1b2a4a" radius={0} />
                <Bar dataKey="conSolar" fill="#f28c28" radius={0} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="col-span-5 max-tablet:col-span-1 flex flex-col gap-4">
            <MetricCard
              Icon={BanknotesIcon}
              label="Ahorro total en 25 años"
              value={fmtMoney(totalSavings25y)}
              accent="orange"
            />
            <MetricCard
              Icon={CloudIcon}
              label="Reducción de CO₂"
              value={`${co2Tons} toneladas`}
              accent="success"
            />
            <MetricCard
              Icon={SunIcon}
              label="Energía que generarás"
              value={`${annualKwh.toLocaleString('en-US')} kWh/año`}
              accent="orange"
            />
            <button
              type="button"
              onClick={goToQuote}
              className="ns-btn ns-btn-primary mt-1"
            >
              Ver más beneficios
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

export default SavingsResults;
