'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { KITS } from '@/lib/kits';

export default function NSKitsCarousel() {
  const [active, setActive] = useState(0);

  const goTo = useCallback((i) => setActive(i), []);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % KITS.length), 5000);
    return () => clearInterval(id);
  }, []);

  const kit = KITS[active];

  return (
    <div className="rounded-2xl border border-ns-border bg-white p-8 shadow-sm flex flex-col gap-5">

      {/* Header */}
      <div>
        <p className="font-body text-[11px] tracking-widest text-ns-muted uppercase mb-1">
          KIT {active + 1} DE {KITS.length}
        </p>
        <p className="font-display font-extrabold text-ns-navy text-[17px] leading-snug" aria-live="polite">
          {kit.nombre}
        </p>
      </div>

      {/* Imagen */}
      <div className="relative w-full aspect-4/3 overflow-hidden rounded-xl">
        {kit.id === 'hibrido' && (
          <span className="absolute top-3 right-3 z-10 bg-ns-orange text-white font-display font-semibold text-[11px] tracking-wide uppercase px-2.5 py-1 rounded-full">
            Con batería
          </span>
        )}
        <Image
          src="/assets/solucion/kit-solar.png"
          alt={`Imagen del ${kit.nombre}`}
          fill
          className="object-contain"
          sizes="(max-width: 960px) 100vw, 33vw"
        />
      </div>

      {/* Potencia + Precio */}
      <div className="flex items-center justify-between border border-ns-border rounded-xl px-4 py-3">
        <div>
          <p className="font-body text-[11px] text-ns-muted uppercase tracking-wide">Potencia</p>
          <p className="font-display font-extrabold text-ns-navy text-[18px]">{kit.potencia} kWp</p>
        </div>
        <div className="text-right">
          <p className="font-body text-[11px] text-ns-muted uppercase tracking-wide">Desde</p>
          <p className="font-display font-extrabold text-ns-orange text-[18px]">
            ${kit.precio.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Componentes */}
      <ul className="flex flex-col gap-3">
        {[kit.paneles, kit.inversor, kit.bateria].filter(Boolean).map((item) => (
          <li key={item} className="flex items-center gap-3">
            <CheckCircleIcon className="w-5 h-5 text-ns-success shrink-0" />
            <span className="font-body text-ns-navy text-[14px]">{item}</span>
          </li>
        ))}
      </ul>

      {/* Producción + Ahorro */}
      <div className="grid grid-cols-2 gap-3 mt-auto">
        <div className="bg-[#F7F8FA] rounded-xl p-3 text-center">
          <p className="font-body text-[11px] text-ns-muted uppercase tracking-wide">Producción</p>
          <p className="font-display font-extrabold text-ns-navy text-[15px]">{kit.produccion} kWh/mes</p>
        </div>
        <div className="bg-[#F0FDF4] rounded-xl p-3 text-center">
          <p className="font-body text-[11px] text-ns-muted uppercase tracking-wide">Ahorro est.</p>
          <p className="font-display font-extrabold text-ns-success text-[15px]">
            ${kit.ahorroMin}–${kit.ahorroMax}/mes
          </p>
        </div>
      </div>

      {/* Dots */}
      <div className="flex gap-2 justify-center">
        {KITS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ver kit ${i + 1}`}
            className={`h-2 rounded-full border-0 cursor-pointer p-0 transition-all duration-[240ms]${
              i === active ? ' w-7 bg-ns-orange' : ' w-2 bg-[rgba(15,26,46,0.18)]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
