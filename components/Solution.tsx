"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import NSKitsCarousel from "./KitsCarousel";
import SavingsResults from "./SavingsMonthly";
import { recommendKit, computeSavingsProjection } from "@/lib/kits";
import type { Kit, SavingsProjection } from "@/lib/kits";

const ciudades = [
  "Ibarra",
  "Quito",
  "Guayaquil",
  "Cuenca",
  "Ambato",
  "Riobamba",
  "Loja",
  "Esmeraldas",
  "Manta",
  "Santo Domingo",
];

type Resultado = SavingsProjection & { kit: Kit };

export default function NSSolution() {
  const [tipo, setTipo] = useState("residencial");
  const [consumo, setConsumo] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [tarifa, setTarifa] = useState("");
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const resultsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (resultado) {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [resultado]);

  const handleCalcular = () => {
    const val = parseFloat(consumo);
    const tar = parseFloat(tarifa);
    if (!val || val <= 0 || !tar || tar <= 0) return;
    const kit = recommendKit(val);
    const projection = computeSavingsProjection({
      consumo: val,
      tipo,
      kit,
      tariff: tar,
    });
    setResultado({ kit, ...projection });
  };

  return (
    <>
      <section className="ns-section bg-white">
        <div className="ns-container">
          <div className="mb-12">
            <span className="ns-eyebrow">LA SOLUCIÓN</span>
            <h2 className="ns-display-h-md mt-4">
              Sistemas Solares Inteligentes
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 tablet:grid-cols-3">
            <NSKitsCarousel />

            <div className="rounded-2xl border border-ns-border bg-white p-8 shadow-sm flex flex-col gap-4">
              <p className="font-display font-semibold text-ns-navy text-center text-[15px] tracking-wide uppercase">
                ¿Cómo funciona?
              </p>
              <div className="relative flex-1 min-h-90">
                <Image
                  src="/assets/solucion/esquema.jpg"
                  alt="Esquema de flujo: panel solar → inversor → batería → hogar"
                  fill
                  className="object-contain"
                  sizes="(max-width: 960px) 100vw, 33vw"
                />
              </div>
            </div>

            <div className="rounded-2xl bg-ns-navy-deep p-8 shadow-sm flex flex-col gap-5">
              <div className="text-center">
                <p className="font-display font-extrabold text-white text-[20px] leading-snug">
                  Calcule su ahorro
                </p>
                <p className="font-body text-white/60 text-[13px] mt-1">
                  Cotice en 1 minuto
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-body text-white/70 text-[13px]">
                  Tipo de cliente
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: "residencial", label: "Residencial" },
                    { value: "comercial", label: "Comercial" },
                    { value: "industrial", label: "Industrial" },
                  ].map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => {
                        setTipo(value);
                        setResultado(null);
                      }}
                      className={`rounded-lg border py-2 text-[12px] font-display font-semibold transition-colors ${
                        tipo === value
                          ? "border-ns-orange bg-ns-orange text-white"
                          : "border-white/20 bg-white/10 text-white/70 hover:bg-white/20"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-body text-white/70 text-[13px]">
                  Consumo mensual (KWh)
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="Ej: 350"
                  value={consumo}
                  onChange={(e) => {
                    setConsumo(e.target.value);
                    setResultado(null);
                  }}
                  className="ns-input bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-ns-orange"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-body text-white/70 text-[13px]">
                  Tarifa eléctrica (USD/kWh)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Ej: 0.18"
                  value={tarifa}
                  onChange={(e) => {
                    setTarifa(e.target.value);
                    setResultado(null);
                  }}
                  className="ns-input bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-ns-orange"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-body text-white/70 text-[13px]">
                  Ciudad
                </label>
                <select
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                  className="ns-input bg-white/10 border-white/20 text-white focus:border-ns-orange [&>option]:text-ns-navy"
                >
                  <option value="" disabled>
                    Seleccione
                  </option>
                  {ciudades.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {resultado && (
                <div className="text-center py-2">
                  <p className="font-body text-white/70 text-[13px]">
                    Su ahorro estimado mensual
                  </p>
                  <p className="font-display font-extrabold text-ns-success text-[32px] leading-tight mt-1">
                    ${resultado.monthlyRange.min} – $
                    {resultado.monthlyRange.max}
                  </p>
                  <p className="font-body text-white/50 text-[12px] mt-1">
                    ↓ Ver proyección completa abajo
                  </p>
                </div>
              )}

              <button
                onClick={handleCalcular}
                disabled={
                  !consumo ||
                  parseFloat(consumo) <= 0 ||
                  !tarifa ||
                  parseFloat(tarifa) <= 0
                }
                className="ns-btn ns-btn-primary ns-btn-block mt-auto disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Calcular Ahorro
              </button>

              <p className="font-body text-white/40 text-[11px] text-center">
                * Cálculo referencial. Ingrese la tarifa de su planilla.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SavingsResults
        ref={resultsRef}
        monthlyBill={
          resultado ? parseFloat(consumo) * parseFloat(tarifa) : undefined
        }
        kitPower={resultado?.kit?.potencia}
      />
    </>
  );
}
