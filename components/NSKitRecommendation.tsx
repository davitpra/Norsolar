"use client";

import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import type { CalculateResponse, RecommendedKit } from "@/lib/solar/types";

interface NSKitRecommendationProps {
  recommendation?: CalculateResponse["recommended_kit"] | null;
}

function kitSubtitle(kit: RecommendedKit): string {
  if (kit.inverter_type === "hybrid") return "Sistema híbrido con respaldo de batería";
  if (kit.inverter_type === "off_grid") return "Sistema aislado (off-grid)";
  return "Sistema conectado a red";
}

function kitFeatures(kit: RecommendedKit): string[] {
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
  recommendation,
}: NSKitRecommendationProps) {
  const kit = recommendation ?? null;
  const mesualidad = kit ? Math.round(kit.price_usd / 36) : 0;

  return (
    <section className="ns-section bg-ns-bg-alt">
      <div className="ns-container">
        <div className="mb-10">
          <span className="ns-eyebrow">SU KIT RECOMENDADO</span>
          <h2 className="ns-display-h-md mt-1 mb-0">
            Nuestro sistema ideal para usted
          </h2>
        </div>

        {!kit ? (
          <SkeletonCard />
        ) : (
          <div className="rounded-2xl border border-ns-border bg-white shadow-sm overflow-hidden grid grid-cols-[420px_1fr] max-tablet:grid-cols-1">
            {/* Left: image */}
            <div className="relative min-h-80">
              <Image
                src={kit.image_url ?? "/assets/instalacion-panel-1.jpg"}
                alt={kit.name}
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
              <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-ns-orange text-white font-display font-semibold text-[11px] tracking-[0.12em] uppercase px-3 py-1.5 rounded-full shadow-md">
                ★ Más elegido
              </span>
            </div>

            {/* Right: details */}
            <div className="grid grid-cols-2 max-tablet:grid-cols-1 gap-0">
              {/* Features column */}
              <div className="p-8 max-tablet:p-6 flex flex-col justify-center">
                <span className="font-display font-semibold text-[11px] tracking-[0.18em] uppercase text-ns-orange mb-3">
                  KIT RECOMENDADO PARA USTED
                </span>
                <h3
                  className="font-display font-extrabold text-ns-navy leading-tight m-0 mb-1"
                  style={{ fontSize: "clamp(22px, 2.4vw, 32px)" }}
                >
                  {kit.name}
                </h3>
                <p className="font-body text-ns-muted text-[14px] mb-6 m-0 mt-1">
                  {kitSubtitle(kit)}
                </p>

                <ul className="flex flex-col gap-3 m-0 p-0 list-none">
                  {kitFeatures(kit).map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <CheckCircleIcon className="w-5 h-5 text-ns-success shrink-0 mt-px" />
                      <span className="font-body text-ns-navy text-[14px] leading-snug">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Roof area info */}
                <p className="font-body text-ns-muted text-[13px] mt-5 m-0">
                  Área de techo requerida:{" "}
                  <span className="font-semibold text-ns-navy">
                    {kit.roof_area_m2} m²
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
                    ${kit.price_usd.toLocaleString("es-EC")}
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
    </section>
  );
}
