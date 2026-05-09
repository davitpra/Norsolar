'use client';

import { forwardRef } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, ResponsiveContainer,
} from 'recharts';

function fmt(n) {
  return '$' + n.toLocaleString('en-US');
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl bg-ns-navy-deep border border-white/10 px-4 py-3 shadow-lg">
      <p className="font-body text-white/60 text-[12px] mb-1">Año {label}</p>
      <p className="font-display font-extrabold text-ns-success text-[16px]">
        {fmt(payload[0].value)}
      </p>
      <p className="font-body text-white/50 text-[11px]">ahorro acumulado</p>
    </div>
  );
}

const SavingsResults = forwardRef(function SavingsResults({ resultado }, ref) {
  if (!resultado) return null;

  const { kit, monthlySavings, yearlyData, roiYears, totalSavings25y } = resultado;

  return (
    <section ref={ref} className="bg-ns-bg-alt border-t border-ns-border">
      <div className="ns-container py-14 flex flex-col gap-10">

        {/* Eyebrow */}
        <div>
          <span className="ns-eyebrow">TU SOLUCIÓN</span>
          <h2 className="ns-display-h-md mt-3">Proyección de ahorro solar</h2>
        </div>

        {/* Kit + métricas */}
        <div className="grid grid-cols-1 gap-6 tablet:grid-cols-3">

          {/* Kit recomendado */}
          <div className="rounded-2xl border border-ns-border bg-white p-6 shadow-sm flex flex-col gap-4">
            <div>
              <p className="font-body text-[11px] text-ns-muted uppercase tracking-widest mb-1">
                Kit recomendado
              </p>
              <p className="font-display font-extrabold text-ns-navy text-[17px] leading-snug">
                {kit.nombre}
              </p>
            </div>
            <div className="flex items-center justify-between border border-ns-border rounded-xl px-4 py-3">
              <div>
                <p className="font-body text-[11px] text-ns-muted uppercase tracking-wide">Potencia</p>
                <p className="font-display font-extrabold text-ns-navy text-[18px]">{kit.potencia} kWp</p>
              </div>
              <div className="text-right">
                <p className="font-body text-[11px] text-ns-muted uppercase tracking-wide">Desde</p>
                <p className="font-display font-extrabold text-ns-orange text-[18px]">
                  {fmt(kit.precio)}
                </p>
              </div>
            </div>
            <ul className="flex flex-col gap-2.5">
              {[kit.paneles, kit.inversor, kit.bateria].filter(Boolean).map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-ns-success shrink-0" />
                  <span className="font-body text-ns-navy text-[14px]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ahorro mensual */}
          <div className="rounded-2xl border border-ns-border bg-white p-6 shadow-sm flex flex-col items-center justify-center gap-2 text-center">
            <p className="font-body text-ns-muted text-[13px] uppercase tracking-widest">
              Ahorro mensual estimado
            </p>
            <p className="font-display font-extrabold text-ns-success text-[52px] leading-none">
              {fmt(monthlySavings)}
            </p>
            <p className="font-body text-ns-muted text-[13px]">por mes el primer año</p>
          </div>

          {/* ROI + 25 años */}
          <div className="rounded-2xl border border-ns-border bg-white p-6 shadow-sm flex flex-col gap-4 justify-center">
            <div className="rounded-xl bg-ns-navy-deep p-5 text-center">
              <p className="font-body text-white/60 text-[12px] uppercase tracking-widest mb-1">
                Tiempo de recuperación
              </p>
              <p className="font-display font-extrabold text-ns-orange text-[40px] leading-none">
                {roiYears ? `${roiYears}` : '—'}
              </p>
              <p className="font-body text-white/60 text-[13px] mt-1">años</p>
            </div>
            <div className="rounded-xl bg-[#F0FDF4] border border-ns-success/20 p-5 text-center">
              <p className="font-body text-ns-muted text-[12px] uppercase tracking-widest mb-1">
                Ahorro total a 25 años
              </p>
              <p className="font-display font-extrabold text-ns-success text-[28px] leading-none">
                {fmt(totalSavings25y)}
              </p>
            </div>
          </div>
        </div>

        {/* Gráfico */}
        <div className="rounded-2xl border border-ns-border bg-white p-6 shadow-sm">
          <p className="font-display font-semibold text-ns-navy text-[15px] mb-6">
            Ahorro acumulado en 25 años
          </p>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={yearlyData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="gradOrange" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f28c28" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#f28c28" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis
                dataKey="year"
                tick={{ fontFamily: 'Inter', fontSize: 12, fill: '#9ca3af' }}
                tickLine={false}
                axisLine={false}
                label={{ value: 'Año', position: 'insideBottomRight', offset: -4, fill: '#9ca3af', fontSize: 11 }}
              />
              <YAxis
                tickFormatter={(v) => '$' + (v / 1000).toFixed(0) + 'k'}
                tick={{ fontFamily: 'Inter', fontSize: 12, fill: '#9ca3af' }}
                tickLine={false}
                axisLine={false}
                width={55}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#f28c28', strokeWidth: 1, strokeDasharray: '4 4' }} />
              {roiYears && (
                <ReferenceLine
                  x={Math.round(roiYears)}
                  stroke="#22c55e"
                  strokeDasharray="4 4"
                  label={{ value: `ROI ≈ ${roiYears}a`, position: 'top', fill: '#22c55e', fontSize: 11, fontFamily: 'Inter', fontWeight: 600 }}
                />
              )}
              <ReferenceLine
                y={kit.precio}
                stroke="#1b2a4a"
                strokeDasharray="4 4"
                strokeOpacity={0.4}
                label={{ value: 'Inversión inicial', position: 'insideTopRight', fill: '#1b2a4a', fontSize: 11, fontFamily: 'Inter', fillOpacity: 0.6 }}
              />
              <Area
                type="monotone"
                dataKey="acumulado"
                stroke="#f28c28"
                strokeWidth={2.5}
                fill="url(#gradOrange)"
                dot={false}
                activeDot={{ r: 5, fill: '#f28c28', stroke: '#fff', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Disclaimer */}
        <p className="font-body text-ns-muted text-[11px] text-center max-w-2xl mx-auto">
          * Proyección referencial basada en tarifas CNEL 2024, inflación tarifaria 3%/año y degradación de paneles 0.5%/año.
          Los valores reales pueden variar según ubicación, consumo y condiciones del mercado.
        </p>
      </div>
    </section>
  );
});

export default SavingsResults;
