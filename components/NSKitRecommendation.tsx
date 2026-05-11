"use client";

import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import type { KitOption } from "@/lib/solar/types";

interface NSKitRecommendationProps {
  kit?: KitOption | null;
  kits?: KitOption[];
  recommendedKitId?: string | null;
  onSelectKit?: (id: string) => void;
}

function kitSubtitle(kit: KitOption): string {
  if (kit.inverter_type === "hybrid")
    return "Sistema híbrido con respaldo de batería";
  if (kit.inverter_type === "off_grid") return "Sistema aislado (off-grid)";
  return "Sistema conectado a red";
}

function kitFeatures(kit: KitOption): string[] {
  const list: string[] = [
    `${kit.num_panels} paneles ${kit.panel_watts}W ${kit.panel_brand}`,
    `Inversor ${kit.inverter_brand} (${kit.inverter_type === "hybrid" ? "Híbrido" : kit.inverter_type === "off_grid" ? "Aislado" : "Conectado a red"})`,
  ];
  if (kit.includes_battery && kit.battery_kwh) {
    list.push(`Batería ${kit.battery_kwh} kWh incluida`);
  }
  list.push("Incluye instalación y puesta en marcha");
  list.push("Garantía 25 años en paneles");
  return list;
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-ns-border bg-white shadow-sm overflow-hidden animate-pulse">
      <div className="h-[320px] bg-ns-border" />
      <div className="p-8 flex flex-col gap-4">
        <div className="h-4 w-32 bg-ns-border rounded" />
        <div className="h-8 w-56 bg-ns-border rounded" />
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-4 w-full bg-ns-border rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function NSKitRecommendation({
  kit,
  kits = [],
  recommendedKitId,
  onSelectKit,
}: NSKitRecommendationProps) {
  const currentKit = kit ?? null;
  const mesualidad = currentKit ? Math.round(currentKit.price_usd / 36) : 0;
  const isRecommended = currentKit?.id === recommendedKitId;

  const currentIndex = kits.findIndex((k) => k.id === currentKit?.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < kits.length - 1;

  const recommendedKit = kits.find((k) => k.id === recommendedKitId);

  return (
    <div className="pt-10">
      <div className="mb-10 flex items-end justify-between gap-4 max-tablet:flex-col max-tablet:items-start">
        <div>
          <span className="ns-eyebrow">
            {isRecommended ? "SU KIT RECOMENDADO" : "ESTÁ VIENDO OTRO KIT"}
          </span>
          <h2 className="ns-display-h-md mt-1 mb-0">
            {isRecommended
              ? "Nuestro sistema ideal para usted"
              : "Compare con otras opciones"}
          </h2>
          {!isRecommended && recommendedKit && (
            <p className="font-body text-ns-muted text-[13px] mt-2 m-0">
              Recomendado para usted:{" "}
              <span className="text-ns-navy font-semibold">
                {recommendedKit.name}
              </span>
              {" — "}
              <button
                type="button"
                onClick={() => onSelectKit?.(recommendedKit.id)}
                className="text-ns-orange underline underline-offset-2 hover:text-ns-orange-hover transition-colors font-semibold"
              >
                Volver al recomendado
              </button>
            </p>
          )}
        </div>

        {/* Prev/Next arrows */}
        {kits.length > 1 && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() =>
                hasPrev && onSelectKit?.(kits[currentIndex - 1].id)
              }
              disabled={!hasPrev}
              aria-label="Kit anterior"
              className="w-10 h-10 rounded-full border border-ns-border bg-white flex items-center justify-center shadow-sm transition-opacity disabled:opacity-30 hover:border-ns-orange hover:text-ns-orange"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <span className="font-body text-ns-muted text-[12px] min-w-[48px] text-center">
              {currentIndex + 1} / {kits.length}
            </span>
            <button
              type="button"
              onClick={() =>
                hasNext && onSelectKit?.(kits[currentIndex + 1].id)
              }
              disabled={!hasNext}
              aria-label="Siguiente kit"
              className="w-10 h-10 rounded-full border border-ns-border bg-white flex items-center justify-center shadow-sm transition-opacity disabled:opacity-30 hover:border-ns-orange hover:text-ns-orange"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {!currentKit ? (
        <SkeletonCard />
      ) : (
        <div className="rounded-2xl border border-ns-border bg-white shadow-sm overflow-hidden grid grid-cols-[420px_1fr] max-tablet:grid-cols-1">
          {/* Left: image */}
          <div className="relative min-h-80">
            <Image
              src={currentKit.image_url ?? "/assets/instalacion-panel-1.jpg"}
              alt={currentKit.name}
              fill
              className="object-cover"
              sizes="(max-width: 800px) 100vw, 420px"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(15,26,46,0.35) 0%, rgba(15,26,46,0.0) 40%)",
              }}
            />
            {isRecommended && (
              <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-ns-orange text-white font-display font-semibold text-[11px] tracking-[0.12em] uppercase px-3 py-1.5 rounded-full shadow-md">
                ★ Más elegido
              </span>
            )}
            {!isRecommended && (
              <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-ns-navy text-white font-display font-semibold text-[11px] tracking-[0.12em] uppercase px-3 py-1.5 rounded-full shadow-md">
                Viendo ahora
              </span>
            )}
          </div>

          {/* Right: details */}
          <div className="grid grid-cols-2 max-tablet:grid-cols-1 gap-0">
            {/* Features column */}
            <div className="p-8 max-tablet:p-6 flex flex-col justify-center">
              <span className="font-display font-semibold text-[11px] tracking-[0.18em] uppercase text-ns-orange mb-3">
                {isRecommended
                  ? "KIT RECOMENDADO PARA USTED"
                  : `${currentKit.power_kwp} kWp · OTRA OPCIÓN`}
              </span>
              <h3
                className="font-display font-extrabold text-ns-navy leading-tight m-0 mb-1"
                style={{ fontSize: "clamp(22px, 2.4vw, 32px)" }}
              >
                {currentKit.name}
              </h3>
              <p className="font-body text-ns-muted text-[14px] mb-6 m-0 mt-1">
                {kitSubtitle(currentKit)}
              </p>

              <ul className="flex flex-col gap-3 m-0 p-0 list-none">
                {kitFeatures(currentKit).map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <CheckCircleIcon className="w-5 h-5 text-ns-success shrink-0 mt-px" />
                    <span className="font-body text-ns-navy text-[14px] leading-snug">
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="font-body text-ns-muted text-[13px] mt-5 m-0">
                Área de techo requerida:{" "}
                <span className="font-semibold text-ns-navy">
                  {currentKit.roof_area_m2} m²
                </span>
              </p>
            </div>

            {/* Pricing column */}
            <div className="w-full max-tablet:w-full border-l max-tablet:border-l-0 max-tablet:border-t border-ns-border bg-ns-bg-alt flex flex-col p-6 max-tablet:p-6 gap-0">
              <div className="mb-5">
                <p className="font-body text-ns-muted text-[11px] uppercase tracking-[0.12em] m-0 mb-1">
                  Inversión del sistema
                </p>
                <p
                  className="font-display font-extrabold text-ns-navy m-0 leading-none"
                  style={{ fontSize: "clamp(28px, 3vw, 38px)" }}
                >
                  ${currentKit.price_usd.toLocaleString("es-EC")}
                </p>
                <p className="font-body text-ns-muted text-[11px] mt-1 m-0">
                  IVA incluido
                </p>
              </div>

              <div className="border-t border-ns-border mb-5" />

              <div className="mb-6">
                <p
                  className="font-display font-extrabold text-ns-orange m-0 leading-none"
                  style={{ fontSize: "clamp(20px, 2vw, 26px)" }}
                >
                  Desde ${mesualidad}/mes
                </p>
                <p className="font-body text-ns-muted text-[11px] mt-1 m-0">
                  Financiamiento propio
                </p>
              </div>

              <button
                type="button"
                className="ns-btn ns-btn-primary w-full justify-center text-[13px] py-3 mb-3"
                onClick={() =>
                  document
                    .getElementById("cotiza")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Elegir este kit
              </button>

              <a
                href="#cotiza"
                className="inline-flex items-center justify-center gap-1 font-display font-semibold text-[12px] text-ns-orange hover:text-ns-orange-hover transition-colors"
              >
                Ver ficha técnica completa
                <ChevronRightIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
