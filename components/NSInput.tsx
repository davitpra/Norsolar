"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import type { CalculateResponse, CustomerType } from "@/lib/solar/types";

const TIPOS: { label: string; value: CustomerType }[] = [
  { label: "Residencial", value: "residencial" },
  { label: "Comercial", value: "comercial" },
  { label: "Industrial", value: "industrial" },
];

interface CityOption {
  id: string;
  name: string;
  region: string;
}

interface TariffResponse {
  distributor: string;
  voltage_level: string;
  suggested_rate: number;
  rate_basis: 'escalonada_avg' | 'flat';
}

interface NSInputProps {
  onCalculate?: (response: CalculateResponse) => void;
  tipo?: CustomerType;
  onTipoChange?: (tipo: CustomerType) => void;
}

export default function NSInput({ onCalculate, tipo: tipoProp, onTipoChange }: NSInputProps) {
  const [cities, setCities] = useState<CityOption[]>([]);
  const [ciudad, setCiudad] = useState("Ibarra");
  const [tipoInternal, setTipoInternal] = useState<CustomerType>("residencial");
  const tipo = tipoProp ?? tipoInternal;
  const setTipo = (next: CustomerType) => {
    if (onTipoChange) onTipoChange(next);
    else setTipoInternal(next);
  };
  const [consumo, setConsumo] = useState(300);
  const [tarifa, setTarifa] = useState(0.10);
  const [distributor, setDistributor] = useState<string | null>(null);
  const [voltageLevel, setVoltageLevel] = useState<string | null>(null);
  const [tariffSource, setTariffSource] = useState<"auto" | "manual">("auto");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const calcDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tariffDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tariffSourceRef = useRef<"auto" | "manual">("auto");

  // Keep ref in sync with state so the tariff effect reads the latest value without resubscribing.
  useEffect(() => {
    tariffSourceRef.current = tariffSource;
  }, [tariffSource]);

  // Load cities on mount
  useEffect(() => {
    fetch("/api/solar/cities")
      .then((r) => r.json())
      .then((data) => {
        if (data.cities) setCities(data.cities);
      })
      .catch(() => {
        setCities([
          { id: "ibarra", name: "Ibarra", region: "sierra" },
          { id: "quito", name: "Quito", region: "sierra" },
          { id: "guayaquil", name: "Guayaquil", region: "costa" },
          { id: "cuenca", name: "Cuenca", region: "sierra" },
          { id: "ambato", name: "Ambato", region: "sierra" },
          { id: "manta", name: "Manta", region: "costa" },
        ]);
      });
  }, []);

  // Auto-fetch tariff when city/type/consumo change (debounced 300ms)
  useEffect(() => {
    if (!ciudad || !tipo) return;
    if (tariffDebounceRef.current) clearTimeout(tariffDebounceRef.current);
    tariffDebounceRef.current = setTimeout(() => {
      const params = new URLSearchParams({
        city: ciudad,
        type: tipo,
        consumption: String(consumo),
      });
      fetch(`/api/solar/tariff?${params}`)
        .then((r) => (r.ok ? r.json() : Promise.reject(r)))
        .then((data: TariffResponse) => {
          setDistributor(data.distributor || null);
          setVoltageLevel(data.voltage_level);
          if (tariffSourceRef.current === "auto" && data.suggested_rate > 0) {
            setTarifa(data.suggested_rate);
          }
        })
        .catch(() => {
          setDistributor(null);
        });
    }, 300);
    return () => {
      if (tariffDebounceRef.current) clearTimeout(tariffDebounceRef.current);
    };
  }, [ciudad, tipo, consumo]);

  // Debounced auto-calculate (existing flow)
  useEffect(() => {
    if (!ciudad || !tipo || consumo <= 0 || tarifa <= 0) return;
    if (calcDebounceRef.current) clearTimeout(calcDebounceRef.current);
    calcDebounceRef.current = setTimeout(() => {
      runCalculation(ciudad, tipo, consumo, tarifa);
    }, 400);
    return () => {
      if (calcDebounceRef.current) clearTimeout(calcDebounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ciudad, tipo, consumo, tarifa]);

  async function runCalculation(
    city: string,
    type: CustomerType,
    monthly_consumption_kwh: number,
    electricity_tariff_usd: number,
  ) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/solar/calculate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ city, type, monthly_consumption_kwh, electricity_tariff_usd }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `HTTP ${res.status}`);
      }
      const data: CalculateResponse = await res.json();
      onCalculate?.(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al calcular");
    } finally {
      setLoading(false);
    }
  }

  const handleCityChange = (next: string) => {
    setCiudad(next);
    setTariffSource("auto");
  };

  const handleTipoChange = (next: CustomerType) => {
    setTipo(next);
    setTariffSource("auto");
  };

  const handleTarifaChange = (next: number) => {
    setTarifa(Math.max(0, next));
    setTariffSource("manual");
  };

  const restoreSuggested = () => {
    setTariffSource("auto");
    // Trigger immediate refetch of tariff
    const params = new URLSearchParams({
      city: ciudad,
      type: tipo,
      consumption: String(consumo),
    });
    fetch(`/api/solar/tariff?${params}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((data: TariffResponse) => {
        if (data.suggested_rate > 0) setTarifa(data.suggested_rate);
      })
      .catch(() => {});
  };

  const factura = consumo * tarifa;

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
                  onChange={(e) => handleCityChange(e.target.value)}
                >
                  {cities.length > 0
                    ? cities.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))
                    : <option value={ciudad}>{ciudad}</option>}
                </select>
                {distributor && (
                  <p className="font-body text-[11px] text-ns-muted m-0 leading-tight">
                    Distribuidora: <span className="font-medium text-ns-navy">{distributor}</span>
                  </p>
                )}
              </div>

              {/* Tipo de cliente */}
              <div className="flex flex-col gap-2">
                <label className="font-body text-[12px] font-medium text-ns-muted">
                  Tipo de cliente
                </label>
                <select
                  className="ns-input w-full"
                  value={tipo}
                  onChange={(e) => handleTipoChange(e.target.value as CustomerType)}
                >
                  {TIPOS.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
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
                    type="number"
                    min={0}
                    step={0.001}
                    className="ns-input w-full pl-7 pr-18"
                    value={tarifa}
                    onChange={(e) => handleTarifaChange(Number(e.target.value))}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-body text-[11px] text-ns-muted pointer-events-none select-none">
                    USD/kWh
                  </span>
                </div>
                {tipo === "industrial" && voltageLevel === "medio_voltaje" && (
                  <p className="font-body text-[11px] text-ns-muted m-0 leading-tight">
                    Asume medio voltaje. Para alto voltaje,{" "}
                    <a href="#cotiza" className="text-ns-orange hover:underline">contáctenos</a>.
                  </p>
                )}
                {tariffSource === "manual" && (
                  <button
                    type="button"
                    onClick={restoreSuggested}
                    className="font-body text-[11px] text-ns-orange hover:underline text-left m-0 p-0 bg-transparent border-0 cursor-pointer"
                  >
                    Restablecer tarifa sugerida
                  </button>
                )}
              </div>
            </div>

            {/* Bottom row: factura + estado */}
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
              <div className="flex items-center gap-3">
                {error && (
                  <span className="font-body text-[12px] text-red-500">{error}</span>
                )}
                {loading && (
                  <span className="flex items-center gap-1.5 font-body text-[13px] text-ns-muted">
                    <ArrowPathIcon className="w-4 h-4 animate-spin" />
                    Calculando…
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
