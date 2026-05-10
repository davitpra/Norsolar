"use client";

import { useState, useMemo } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

const CIUDADES = [
  "Ibarra, Imbabura",
  "Quito, Pichincha",
  "Guayaquil, Guayas",
  "Cuenca, Azuay",
  "Otavalo, Imbabura",
  "Otra",
];

const TIPOS = ["Residencial", "Comercial", "Industrial"];

interface NSInputProps {
  onCalculate?: (consumo: number, tarifa: number, tipo: string) => void;
}

export default function NSInput({ onCalculate }: NSInputProps) {
  const [ciudad, setCiudad] = useState("Ibarra, Imbabura");
  const [tipo, setTipo] = useState("Residencial");
  const [consumo, setConsumo] = useState(300);
  const [tarifa, setTarifa] = useState(0.11);
  const [key, setKey] = useState(0);

  const factura = useMemo(() => consumo * tarifa, [consumo, tarifa]);

  const recalcular = () => {
    setKey((k) => k + 1);
    onCalculate?.(consumo, tarifa, tipo);
  };

  return (
    <section className="bg-white border-y border-ns-border">
      <div className="ns-container py-14 max-tablet:py-10">
        <div className="grid grid-cols-[400px_1fr] max-tablet:grid-cols-1 gap-12 items-center">
          {/* Left: copy */}
          <div>
            <span className="ns-eyebrow">INGRESE SUS DATOS</span>
            <h2
              className="font-display font-extrabold text-ns-navy leading-[1.1] tracking-[-0.02em] mt-3 mb-4 m-0"
              style={{ fontSize: "clamp(26px, 2.8vw, 38px)" }}
            >
              Calcule su kit ideal
              <br />
              en menos de 30 segundos
            </h2>
            <p className="font-body text-ns-muted text-[15px] leading-[1.65] m-0">
              Responda 4 datos y obtenga su recomendación personalizada con
              ahorro real.
            </p>
          </div>

          {/* Right: inputs */}
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-4 max-tablet:grid-cols-2 gap-4">
              {/* Ciudad */}
              <div className="flex flex-col gap-2">
                <label className="font-body text-[12px] font-medium text-ns-muted">
                  Ciudad
                </label>
                <select
                  className="ns-input w-full"
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                >
                  {CIUDADES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Tipo de cliente */}
              <div className="flex flex-col gap-2">
                <label className="font-body text-[12px] font-medium text-ns-muted">
                  Tipo de cliente
                </label>
                <select
                  className="ns-input w-full"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                >
                  {TIPOS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Consumo mensual */}
              <div className="flex flex-col gap-2">
                <label className="font-body text-[12px] font-medium text-ns-muted">
                  Consumo mensual
                </label>
                <div className="relative">
                  <input
                    key={`consumo-${key}`}
                    type="number"
                    min={0}
                    step={10}
                    className="ns-input w-full pr-12"
                    value={consumo}
                    onChange={(e) =>
                      setConsumo(Math.max(0, Number(e.target.value)))
                    }
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-body text-[12px] text-ns-muted pointer-events-none select-none">
                    kWh
                  </span>
                </div>
              </div>

              {/* Tarifa eléctrica */}
              <div className="flex flex-col gap-2">
                <label className="font-body text-[12px] font-medium text-ns-muted">
                  Tarifa eléctrica
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-body text-[13px] text-ns-navy pointer-events-none select-none">
                    $
                  </span>
                  <input
                    key={`tarifa-${key}`}
                    type="number"
                    min={0}
                    step={0.01}
                    className="ns-input w-full pl-7 pr-18"
                    value={tarifa}
                    onChange={(e) =>
                      setTarifa(Math.max(0, Number(e.target.value)))
                    }
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-body text-[11px] text-ns-muted pointer-events-none select-none">
                    USD/kWh
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom row: factura + recalcular */}
            <div className="flex items-center justify-between max-tablet:flex-col max-tablet:items-start max-tablet:gap-3">
              <p className="font-body text-ns-muted text-[13px] m-0">
                Factura mensual actual aprox.:{" "}
                <span className="font-display font-semibold text-ns-navy text-[14px]">
                  $
                  {factura.toLocaleString("es-EC", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </p>
              <button
                type="button"
                onClick={recalcular}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] border border-ns-border bg-white font-display font-semibold text-[13px] text-ns-navy cursor-pointer transition-colors duration-200 hover:border-ns-orange hover:text-ns-orange"
              >
                Recalcular
                <ArrowPathIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
