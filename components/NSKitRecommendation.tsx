"use client";

import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { recommendKit } from "@/lib/kits";
import type { Kit } from "@/lib/kits";

interface NSKitRecommendationProps {
  consumo?: number;
  tipo?: string;
}

function kitDisplayName(kit: Kit, tipo: string): string {
  const kw = `${kit.potencia % 1 === 0 ? kit.potencia : kit.potencia.toFixed(1)} kW`;
  if (tipo === "comercial") return `Kit Comercial ${kw}`;
  if (tipo === "industrial") return `Kit Industrial ${kw}`;
  return `Kit Hogar ${kw}`;
}

function kitSubtitle(tipo: string): string {
  if (tipo === "comercial") return "Sistema inteligente para su negocio";
  if (tipo === "industrial") return "Sistema industrial de alta potencia";
  return "Sistema inteligente para su hogar";
}

function kitFeatures(kit: Kit): string[] {
  const list: string[] = [kit.paneles, kit.inversor];
  if (kit.bateria) list.push(kit.bateria);
  list.push("Incluye instalación y puesta en marcha");
  list.push("Garantía 25 años en paneles");
  return list;
}

export default function NSKitRecommendation({
  consumo = 345,
  tipo = "residencial",
}: NSKitRecommendationProps) {
  const kit: Kit = recommendKit(consumo);
  const mesualidad = Math.round(kit.precio / 36);

  return (
    <section className="ns-section bg-ns-bg-alt">
      <div className="ns-container">
        <div className="mb-10">
          <span className="ns-eyebrow">SU KIT RECOMENDADO</span>
          <h2 className="ns-display-h-md mt-1 mb-0">
            Nuestro sistema ideal para usted
          </h2>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-ns-border bg-white shadow-sm overflow-hidden grid grid-cols-[420px_1fr] max-tablet:grid-cols-1">

          {/* Left: image */}
          <div className="relative min-h-[320px]">
            <Image
              src="/assets/instalacion-panel-1.jpg"
              alt="Panel solar instalado en techo residencial"
              fill
              className="object-cover"
              sizes="(max-width: 960px) 100vw, 420px"
            />
            {/* Dark overlay for badge legibility */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(15,26,46,0.35) 0%, rgba(15,26,46,0.0) 40%)",
              }}
            />
            {/* Badge */}
            <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-ns-orange text-white font-display font-semibold text-[11px] tracking-[0.12em] uppercase px-3 py-1.5 rounded-full shadow-md">
              ★ Más elegido
            </span>
          </div>

          {/* Right: details */}
          <div className="grid grid-cols-[1fr_auto] max-tablet:grid-cols-1 gap-0">

            {/* Features column */}
            <div className="p-8 max-tablet:p-6 flex flex-col justify-center">
              <span className="font-display font-semibold text-[11px] tracking-[0.18em] uppercase text-ns-orange mb-3">
                KIT RECOMENDADO PARA USTED
              </span>
              <h3
                className="font-display font-extrabold text-ns-navy leading-tight m-0 mb-1"
                style={{ fontSize: "clamp(22px, 2.4vw, 32px)" }}
              >
                {kitDisplayName(kit, tipo)}
              </h3>
              <p className="font-body text-ns-muted text-[14px] mb-6 m-0 mt-1">
                {kitSubtitle(tipo)}
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
            </div>

            {/* Pricing column */}
            <div className="w-56 max-tablet:w-full border-l max-tablet:border-l-0 max-tablet:border-t border-ns-border bg-ns-bg-alt flex flex-col p-6 max-tablet:p-6 gap-0">
              {/* Price block */}
              <div className="mb-5">
                <p className="font-body text-ns-muted text-[11px] uppercase tracking-[0.12em] m-0 mb-1">
                  Inversión del sistema
                </p>
                <p
                  className="font-display font-extrabold text-ns-navy m-0 leading-none"
                  style={{ fontSize: "clamp(28px, 3vw, 38px)" }}
                >
                  ${kit.precio.toLocaleString("es-EC")}
                </p>
                <p className="font-body text-ns-muted text-[11px] mt-1 m-0">
                  IVA incluido
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-ns-border mb-5" />

              {/* Financing */}
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

              {/* CTA */}
              <button
                type="button"
                className="ns-btn ns-btn-primary w-full justify-center text-[13px] py-3 mb-3"
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
      </div>
    </section>
  );
}
