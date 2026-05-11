"use client";

import {
  CalendarDaysIcon,
  BanknotesIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import type { KitOption } from "@/lib/solar/types";

interface NSSavingsResultsProps {
  kit: KitOption | null;
}

interface StatCardProps {
  icon: React.ElementType;
  value: string;
  label: string;
  sublabel: string;
}

function StatCard({ icon: Icon, value, label, sublabel }: StatCardProps) {
  return (
    <div className="flex flex-col gap-3 bg-white rounded-2xl border border-ns-border p-6 shadow-sm">
      <div className="w-10 h-10 rounded-xl bg-ns-orange/10 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-ns-orange" />
      </div>
      <div>
        <p
          className="font-display font-extrabold text-ns-navy leading-none m-0"
          style={{ fontSize: "clamp(26px, 2.8vw, 36px)" }}
        >
          {value}
        </p>
        <p className="font-display font-semibold text-ns-muted text-[12px] uppercase tracking-[0.1em] mt-1 m-0">
          {label}
        </p>
      </div>
      <p className="font-body text-ns-muted text-[13px] leading-snug m-0">
        {sublabel}
      </p>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="flex flex-col gap-3 bg-white rounded-2xl border border-ns-border p-6 shadow-sm animate-pulse">
      <div className="w-10 h-10 rounded-xl bg-ns-border" />
      <div className="flex flex-col gap-2">
        <div className="h-9 w-28 bg-ns-border rounded" />
        <div className="h-3 w-20 bg-ns-border rounded" />
      </div>
      <div className="h-3 w-36 bg-ns-border rounded" />
    </div>
  );
}

function SkeletonBar() {
  return (
    <div className="mt-8 rounded-2xl border border-ns-border bg-white p-6 animate-pulse">
      <div className="flex justify-between mb-3">
        <div className="h-4 w-48 bg-ns-border rounded" />
        <div className="h-4 w-10 bg-ns-border rounded" />
      </div>
      <div className="h-3 w-full bg-ns-border rounded-full" />
    </div>
  );
}

export default function NSSavingsResults({ kit }: NSSavingsResultsProps) {
  const s = kit?.savings;
  const coverage = s?.coverage_percentage ?? 0;

  const fmt = (n: number) =>
    n.toLocaleString("es-EC", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="pt-10">
      <div className="mb-10">
        <span className="ns-eyebrow">SU AHORRO ESTIMADO</span>
        <h2 className="ns-display-h-md mt-1 mb-0">
          Así se ve su ahorro con energía solar
        </h2>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 max-tablet:grid-cols-2 gap-4">
        {!s ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <StatCard
              icon={CalendarDaysIcon}
              value={`$${fmt(s.monthly_usd)}`}
              label="Ahorro mensual"
              sublabel={`${Math.round(s.coverage_percentage)}% de su factura eléctrica`}
            />
            <StatCard
              icon={BanknotesIcon}
              value={`$${fmt(s.annual_usd)}`}
              label="Ahorro anual"
              sublabel="Cada año con su sistema solar"
            />
            <StatCard
              icon={ArrowTrendingUpIcon}
              value={`$${Math.round(s.total_25_years_usd).toLocaleString("es-EC")}`}
              label="Ahorro a 25 años"
              sublabel="Valor acumulado del proyecto"
            />
            <StatCard
              icon={ClockIcon}
              value={`${s.roi_years.toFixed(1)} años`}
              label="Retorno de inversión"
              sublabel="ROI del proyecto"
            />
          </>
        )}
      </div>

      {/* Coverage progress bar */}
      {!s ? (
        <SkeletonBar />
      ) : (
        <div className="mt-6 rounded-2xl border border-ns-border bg-white p-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="font-display font-semibold text-ns-navy text-[14px]">
                Cobertura solar:{" "}
                <span className="text-ns-orange">
                  {Math.round(coverage)}% de su consumo
                </span>
              </span>
              <p className="font-body text-ns-muted text-[12px] mt-0.5 m-0">
                Su sistema cubre el {Math.round(coverage)}% de su consumo
                eléctrico. El {100 - Math.round(coverage)}% restante se toma de
                la red.
              </p>
            </div>
            <span
              className="font-display font-extrabold text-ns-orange shrink-0 ml-6"
              style={{ fontSize: "clamp(20px, 2vw, 28px)" }}
            >
              {Math.round(coverage)}%
            </span>
          </div>
          <div className="h-3 w-full bg-ns-border rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${Math.min(coverage, 100)}%`,
                background: "linear-gradient(90deg, #1B2A4A 0%, #F28C28 100%)",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
