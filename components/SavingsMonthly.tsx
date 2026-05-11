"use client";

import { forwardRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { KitOption } from "@/lib/solar/types";

function fmtKwh(n: number) {
  return n.toLocaleString("es-EC", { maximumFractionDigits: 0 }) + " kWh";
}

interface PayloadEntry {
  dataKey: string;
  value: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: PayloadEntry[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const gen = payload.find((p) => p.dataKey === "generation_kwh")?.value ?? 0;
  const cons = payload.find((p) => p.dataKey === "consumption_kwh")?.value ?? 0;
  const coverage = cons > 0 ? Math.min(Math.round((gen / cons) * 100), 100) : 0;
  return (
    <div className="rounded-xl bg-white border border-ns-border px-4 py-3 shadow-lg">
      <p className="font-body text-ns-muted text-[12px] mb-2">{label}</p>
      <div className="flex items-center gap-2 mb-1">
        <span className="w-2.5 h-2.5 rounded-full bg-ns-orange" />
        <span className="font-body text-ns-muted text-[12px]">Generación:</span>
        <span className="font-display font-extrabold text-ns-navy text-[13px]">
          {fmtKwh(gen)}
        </span>
      </div>
      <div className="flex items-center gap-2 mb-1">
        <span className="w-2.5 h-2.5 rounded-full bg-[#9ca3af]" />
        <span className="font-body text-ns-muted text-[12px]">Consumo:</span>
        <span className="font-display font-extrabold text-ns-navy text-[13px]">
          {fmtKwh(cons)}
        </span>
      </div>
      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-ns-border">
        <span className="font-body text-ns-muted text-[12px]">Cobertura:</span>
        <span className="font-display font-extrabold text-ns-orange text-[13px]">
          {coverage}%
        </span>
      </div>
    </div>
  );
}

interface StatRowProps {
  label: string;
  value: string;
  highlight?: boolean;
}

function StatRow({ label, value, highlight }: StatRowProps) {
  if (highlight) {
    return (
      <div className="rounded-xl bg-ns-orange/10 border border-ns-orange/20 px-5 py-4">
        <p className="font-body text-ns-orange text-[12px] uppercase tracking-[0.08em] font-semibold mb-1">
          {label}
        </p>
        <p
          className="font-display font-extrabold text-ns-orange leading-none m-0"
          style={{ fontSize: "clamp(24px, 2.4vw, 30px)" }}
        >
          {value}
        </p>
      </div>
    );
  }
  return (
    <div className="rounded-xl border border-ns-border bg-white px-5 py-4">
      <p className="font-body text-ns-muted text-[12px] uppercase tracking-[0.08em] mb-1">
        {label}
      </p>
      <p
        className="font-display font-extrabold text-ns-navy leading-none m-0"
        style={{ fontSize: "clamp(22px, 2.2vw, 28px)" }}
      >
        {value}
      </p>
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="rounded-xl border border-ns-border bg-white px-5 py-4 animate-pulse flex flex-col gap-2">
      <div className="h-3 w-32 bg-ns-border rounded" />
      <div className="h-7 w-24 bg-ns-border rounded" />
    </div>
  );
}

interface SavingsMonthlyProps {
  kit?: KitOption | null;
}

const SavingsMonthly = forwardRef<HTMLDivElement, SavingsMonthlyProps>(
  function SavingsMonthly({ kit }, ref) {
    const chart = kit?.comparison_chart ?? [];
    const generation = kit?.generation;
    const coverage = kit?.savings?.coverage_percentage ?? 0;

    const goToQuote = () => {
      document
        .getElementById("cotiza")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
      <div ref={ref} className="pt-10">
        <div className="mb-8">
          <span className="ns-eyebrow">PRODUCCIÓN SOLAR 12 MESES</span>
          <h2 className="ns-display-h-md mt-1 mb-0">
            Generación mensual de su kit en kWh
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-6 max-tablet:grid-cols-1">
          {/* Chart */}
          <div className="col-span-8 max-tablet:col-span-1 flex flex-col gap-3">
            {/* Legend */}
            <div className="flex items-center gap-5">
              <span className="inline-flex items-center gap-2 font-body text-ns-muted text-[12px]">
                <span className="w-3 h-3 rounded-sm bg-ns-orange" />
                Generación (kWh)
              </span>
              <span className="inline-flex items-center gap-2 font-body text-ns-muted text-[12px]">
                <span className="w-3 h-3 rounded-sm bg-[#9ca3af]" />
                Consumo (kWh)
              </span>
            </div>

            {chart.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={chart}
                  barGap={2}
                  barCategoryGap="22%"
                  margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e5e7eb"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tick={{
                      fontFamily: "Inter",
                      fontSize: 11,
                      fill: "#9ca3af",
                    }}
                  />
                  <YAxis
                    tickFormatter={(v: number) => v + " kWh"}
                    tickLine={false}
                    axisLine={false}
                    tick={{
                      fontFamily: "Inter",
                      fontSize: 11,
                      fill: "#9ca3af",
                    }}
                    width={60}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "rgba(0,0,0,0.03)" }}
                  />
                  <Bar
                    dataKey="generation_kwh"
                    fill="#f28c28"
                    radius={[3, 3, 0, 0]}
                  />
                  <Bar
                    dataKey="consumption_kwh"
                    fill="#9ca3af"
                    radius={[3, 3, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-70 animate-pulse bg-ns-border rounded-xl" />
            )}

            <p className="font-body text-ns-muted text-[12px] flex items-start gap-1.5 mt-1">
              <span className="shrink-0 mt-px">&#9432;</span>
              La generación varía mes a mes según la radiación solar estacional
              de su ciudad.
            </p>
          </div>

          {/* Metrics */}
          <div className="col-span-4 max-tablet:col-span-1 flex flex-col justify-center gap-4">
            {generation ? (
              <>
                <StatRow
                  label="Generación promedio mensual"
                  value={fmtKwh(generation.monthly_kwh)}
                />
                <StatRow
                  label="Generación anual total"
                  value={fmtKwh(generation.annual_kwh)}
                />
                <StatRow
                  label="Cobertura del consumo"
                  value={Math.round(coverage) + "%"}
                  highlight
                />
              </>
            ) : (
              <>
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
              </>
            )}

            <button
              type="button"
              onClick={goToQuote}
              className="ns-btn ns-btn-primary w-full justify-center mt-2"
            >
              Quiero este ahorro
            </button>
          </div>
        </div>
      </div>
    );
  },
);

export default SavingsMonthly;
