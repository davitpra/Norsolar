'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const componentes = [
  { titulo: 'Paneles Solares', marcas: 'Trina Solar / LONGi' },
  { titulo: 'Inversor Híbrido', marcas: 'Growatt / Huawei' },
  { titulo: 'Batería de Litio', marcas: 'Growatt / Pylontech' },
];

const ciudades = [
  'Ibarra', 'Quito', 'Guayaquil', 'Cuenca', 'Ambato',
  'Riobamba', 'Loja', 'Esmeraldas', 'Manta', 'Santo Domingo',
];

const TARIFAS = {
  residencial: { min: 0.09, max: 0.11 },
  comercial:   { min: 0.10, max: 0.13 },
};

function calcularAhorro(consumo, tipo) {
  if (!consumo || consumo <= 0) return null;
  const t = TARIFAS[tipo];
  const min = Math.round(consumo * t.min);
  const max = Math.round(consumo * t.max);
  return { min, max };
}

export default function NSSolution() {
  const [tipo, setTipo] = useState('residencial');
  const [consumo, setConsumo] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [ahorro, setAhorro] = useState(null);

  const handleCalcular = () => {
    const val = parseFloat(consumo);
    setAhorro(calcularAhorro(val, tipo));
  };

  return (
    <section className="ns-section bg-white">
      <div className="ns-container">

        {/* Header */}
        <div className="mb-12">
          <span className="ns-eyebrow">LA SOLUCIÓN</span>
          <h2 className="ns-display-h-md mt-4">
            Sistemas Solares Inteligentes
          </h2>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 gap-6 tablet:grid-cols-3">

          {/* Card 1 — Componentes */}
          <div className="rounded-2xl border border-ns-border bg-white p-8 shadow-sm flex flex-col gap-6">
            <p className="font-display font-semibold text-ns-navy text-center text-[15px] tracking-wide uppercase">
              Componentes de calidad
            </p>
            <div className="relative w-full aspect-4/3 overflow-hidden rounded-xl">
              <Image
                src="/assets/solucion/kit-solar.png"
                alt="Kit solar: panel, inversor Growatt y datalogger"
                fill
                className="object-contain"
                sizes="(max-width: 960px) 100vw, 33vw"
              />
            </div>
            <ul className="flex flex-col gap-4 mt-2">
              {componentes.map(({ titulo, marcas }) => (
                <li key={titulo} className="flex items-start gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-ns-success shrink-0 mt-0.5" />
                  <div>
                    <p className="font-display font-semibold text-ns-navy text-[15px] leading-snug">
                      {titulo}
                    </p>
                    <p className="font-body text-ns-muted text-[13px]">{marcas}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2 — ¿Cómo funciona? */}
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

          {/* Card 3 — Calculadora */}
          <div className="rounded-2xl bg-ns-navy-deep p-8 shadow-sm flex flex-col gap-5">
            <div className="text-center">
              <p className="font-display font-extrabold text-white text-[20px] leading-snug">
                Calcule su ahorro
              </p>
              <p className="font-body text-white/60 text-[13px] mt-1">
                Cotice en 1 minuto
              </p>
            </div>

            {/* Tipo de cliente */}
            <div className="flex flex-col gap-1.5">
              <label className="font-body text-white/70 text-[13px]">
                Tipo de cliente
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['residencial', 'comercial'].map((t) => (
                  <button
                    key={t}
                    onClick={() => { setTipo(t); setAhorro(null); }}
                    className={`rounded-lg border py-2 text-[13px] font-display font-semibold capitalize transition-colors ${
                      tipo === t
                        ? 'border-ns-orange bg-ns-orange text-white'
                        : 'border-white/20 bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    {t === 'residencial' ? 'Residencial' : 'Comercial'}
                  </button>
                ))}
              </div>
            </div>

            {/* Consumo */}
            <div className="flex flex-col gap-1.5">
              <label className="font-body text-white/70 text-[13px]">
                Consumo mensual (KWh)
              </label>
              <input
                type="number"
                min="0"
                placeholder="Ej: 350"
                value={consumo}
                onChange={(e) => { setConsumo(e.target.value); setAhorro(null); }}
                className="ns-input bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-ns-orange"
              />
            </div>

            {/* Ciudad */}
            <div className="flex flex-col gap-1.5">
              <label className="font-body text-white/70 text-[13px]">
                Ciudad
              </label>
              <select
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
                className="ns-input bg-white/10 border-white/20 text-white focus:border-ns-orange [&>option]:text-ns-navy"
              >
                <option value="" disabled>Seleccione</option>
                {ciudades.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Resultado */}
            {ahorro && (
              <div className="text-center py-2">
                <p className="font-body text-white/70 text-[13px]">
                  Su ahorro estimado mensual
                </p>
                <p className="font-display font-extrabold text-ns-success text-[32px] leading-tight mt-1">
                  ${ahorro.min} – ${ahorro.max}
                </p>
              </div>
            )}

            {/* CTA */}
            <button
              onClick={handleCalcular}
              disabled={!consumo || parseFloat(consumo) <= 0}
              className="ns-btn ns-btn-primary ns-btn-block mt-auto disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Calcular Ahorro
            </button>

            <p className="font-body text-white/40 text-[11px] text-center">
              * Cálculo referencial basado en tarifas CNEL 2024
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
