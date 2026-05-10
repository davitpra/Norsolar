"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { KITS } from "@/lib/kits";
import type { CalculateResponse, AlternativeKit, RecommendedKit } from "@/lib/solar/types";

interface NSKitsCarouselProps {
  result?: CalculateResponse | null;
}

interface CardKit {
  id: string;
  name: string;
  power_kwp: number;
  price_usd: number;
  coverage_percentage: number;
  roi_years: number;
  recommended?: boolean;
}

function fallbackKits(): CardKit[] {
  const base = KITS.filter((k) => k.id !== "hibrido");
  const mid = Math.floor(base.length / 2);
  return base.map((k, i) => ({
    id: k.id,
    name: k.nombre,
    power_kwp: k.potencia,
    price_usd: k.precio,
    coverage_percentage: 80,
    roi_years: 7,
    recommended: i === mid,
  }));
}

function buildKitList(
  recommended: RecommendedKit,
  alternatives: AlternativeKit[],
): CardKit[] {
  const rec: CardKit = {
    id: recommended.id,
    name: recommended.name,
    power_kwp: recommended.power_kwp,
    price_usd: recommended.price_usd,
    coverage_percentage: 100,
    roi_years: 0,
    recommended: true,
  };
  const alts: CardKit[] = alternatives.map((a) => ({ ...a, recommended: false }));
  return [...alts, rec].sort((a, b) => a.power_kwp - b.power_kwp).map((k) => ({
    ...k,
    recommended: k.id === recommended.id,
  }));
}

function deriveFeatures(kit: CardKit): string[] {
  const panels = Math.max(1, Math.round(kit.power_kwp / 0.66));
  const isHybrid = kit.name.toLowerCase().includes("híbrido") || kit.name.toLowerCase().includes("hibrido");
  const inverter = isHybrid ? "Inversor híbrido" : "Inversor On-Grid";
  return [
    `${panels} paneles solar 660W`,
    inverter,
    `Cobertura solar: ${Math.round(kit.coverage_percentage)}%`,
  ];
}

interface KitCardProps {
  kit: CardKit;
  recommended: boolean;
}

function KitCard({ kit, recommended }: KitCardProps) {
  const monthly = Math.round(kit.price_usd / 36);
  const features = deriveFeatures(kit);

  return (
    <div
      className={`flex flex-col rounded-2xl border bg-white overflow-hidden transition-shadow duration-200 ${
        recommended
          ? "border-ns-orange shadow-md ring-1 ring-ns-orange/30"
          : "border-ns-border shadow-sm"
      }`}
    >
      {/* Top: image + info side by side */}
      <div className="flex gap-0 p-4 pb-3">
        {/* Small image */}
        <div className="relative w-27.5 shrink-0 rounded-xl overflow-hidden self-stretch min-h-25">
          <Image
            src="/assets/instalacion-panel-1.jpg"
            alt={kit.name}
            fill
            className="object-cover"
            sizes="110px"
          />
          {recommended && (
            <span className="absolute top-2 left-0 right-0 mx-auto w-fit inline-flex bg-ns-orange text-white font-display font-semibold text-[9px] tracking-widest uppercase px-2 py-1 rounded-full shadow">
              Recomendado
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center pl-4 flex-1 min-w-0">
          <p className="font-display font-extrabold text-ns-navy text-[15px] leading-snug m-0 mb-3">
            {kit.name}
          </p>
          <ul className="flex flex-col gap-1.5 m-0 p-0 list-none">
            {features.map((feat) => (
              <li key={feat} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-ns-orange shrink-0 mt-1.25" />
                <span className="font-body text-ns-muted text-[12px] leading-snug">
                  {feat}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom: price + CTA */}
      <div className="flex items-center justify-between border-t border-ns-border px-4 py-3 mt-auto">
        <div>
          <p
            className="font-display font-extrabold text-ns-navy leading-none m-0"
            style={{ fontSize: "clamp(18px, 1.8vw, 22px)" }}
          >
            ${kit.price_usd.toLocaleString("es-EC")}
          </p>
          <p className="font-body text-ns-muted text-[11px] mt-0.5 m-0">
            Desde ${monthly}/mes
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            document
              .getElementById("cotiza")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="font-display font-semibold text-[12px] text-ns-orange hover:text-ns-orange-hover transition-colors underline underline-offset-2"
        >
          Ver detalles
        </button>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="flex flex-col rounded-2xl border border-ns-border bg-white overflow-hidden animate-pulse">
      <div className="flex gap-0 p-4 pb-3">
        <div className="w-27.5 min-h-25 rounded-xl bg-ns-border shrink-0" />
        <div className="flex flex-col gap-2.5 pl-4 flex-1 justify-center">
          <div className="h-4 w-28 bg-ns-border rounded" />
          <div className="h-3 w-36 bg-ns-border rounded" />
          <div className="h-3 w-32 bg-ns-border rounded" />
          <div className="h-3 w-28 bg-ns-border rounded" />
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-ns-border px-4 py-3">
        <div className="flex flex-col gap-1.5">
          <div className="h-5 w-20 bg-ns-border rounded" />
          <div className="h-3 w-24 bg-ns-border rounded" />
        </div>
        <div className="h-4 w-16 bg-ns-border rounded" />
      </div>
    </div>
  );
}

const VISIBLE = 3;

export default function NSKitsCarousel({ result }: NSKitsCarouselProps) {
  const kits: CardKit[] =
    result?.recommended_kit && result.alternative_kits?.length > 0
      ? buildKitList(result.recommended_kit, result.alternative_kits)
      : fallbackKits();

  const maxIndex = Math.max(0, kits.length - VISIBLE);
  const [start, setStart] = useState(0);

  const prev = useCallback(
    () => setStart((s) => Math.max(0, s - 1)),
    []
  );
  const next = useCallback(
    () => setStart((s) => Math.min(maxIndex, s + 1)),
    [maxIndex]
  );

  const visible = kits.slice(start, start + VISIBLE);
  const dotCount = maxIndex + 1;

  return (
    <section className="ns-section bg-ns-bg-alt">
      <div className="ns-container">
        {/* Header */}
        <div className="flex items-end justify-between mb-10 max-tablet:flex-col max-tablet:items-start max-tablet:gap-4">
          <div>
            <span className="ns-eyebrow">OTRAS OPCIONES PARA USTED</span>
            <h2 className="ns-display-h-md mt-1 mb-0">
              Kits alternativos recomendados
            </h2>
          </div>
          {/* Arrow controls */}
          {dotCount > 1 && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={prev}
                disabled={start === 0}
                aria-label="Kit anterior"
                className="w-10 h-10 rounded-full border border-ns-border bg-white flex items-center justify-center shadow-sm transition-opacity disabled:opacity-30 hover:border-ns-orange hover:text-ns-orange"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                disabled={start === maxIndex}
                aria-label="Siguiente kit"
                className="w-10 h-10 rounded-full border border-ns-border bg-white flex items-center justify-center shadow-sm transition-opacity disabled:opacity-30 hover:border-ns-orange hover:text-ns-orange"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-3 max-tablet:grid-cols-1 gap-5">
          {result === undefined ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            visible.map((kit) => (
              <KitCard key={kit.id} kit={kit} recommended={!!kit.recommended} />
            ))
          )}
        </div>

        {/* Dot pagination */}
        {dotCount > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: dotCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => setStart(i)}
                aria-label={`Página ${i + 1}`}
                className={`h-2 rounded-full border-0 cursor-pointer p-0 transition-all duration-200 ${
                  i === start
                    ? "w-7 bg-ns-orange"
                    : "w-2 bg-ns-navy/20"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
