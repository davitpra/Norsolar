'use client';

import { useState } from 'react';

const reasons = [
  {
    title: 'Sustentabilidad certificada',
    desc: 'Energía limpia que reduce emisiones y cuida el planeta.',
    icon: 'leaf',
    more: 'Cada kWh solar evita ~0.5 kg de CO₂. Un sistema residencial promedio neutraliza más de 2.5 toneladas de emisiones al año.',
  },
  {
    title: 'Solución a largo plazo',
    desc: 'Equipos de alta calidad con hasta 25 años de garantía.',
    icon: 'shield',
    more: 'Trabajamos con paneles tier-1 y inversores de marcas certificadas internacionalmente. Vida útil de hasta 30 años con mantenimiento mínimo.',
  },
  {
    title: 'Servicio al cliente excepcional',
    desc: 'Acompañamiento antes, durante y después de su proyecto.',
    icon: 'support',
    more: 'Asesoría técnica, ingeniería personalizada, instalación certificada y monitoreo 24/7 desde su celular. Soporte directo con nuestro equipo en Ibarra.',
  },
];

export default function NSWhyChoose() {
  const [open, setOpen] = useState(0);

  return (
    <section className="ns-section" data-screen-label="Mejor opción">
      <div className="ns-container grid grid-cols-[1fr_1.4fr] max-tablet:grid-cols-1 gap-14 items-start">

        {/* Left */}
        <div>
          <span className="ns-eyebrow">POR QUÉ ELEGIR ENERGÍA SOLAR</span>
          <h2 className="ns-display-h">TU MEJOR OPCIÓN<br />EN ENERGÍA SOLAR</h2>
          <div className="flex items-center gap-3.5 bg-white border border-[#ECEFF3] rounded-[14px] p-[18px] px-5 max-w-[420px] mt-3">
            <div className="w-11 h-11 rounded-full bg-ns-orange-soft text-ns-orange flex items-center justify-center shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
              </svg>
            </div>
            <p className="font-body text-[13px] leading-[1.55] text-ns-muted m-0">
              Ecuador cuenta con radiación solar privilegiada por estar en la línea ecuatorial. Aproveche ese recurso ilimitado.
            </p>
          </div>
        </div>

        {/* Right: accordion */}
        <div className="flex flex-col">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className={`bg-white border border-[#ECEFF3] rounded-[14px] mb-3 transition-[transform,box-shadow] duration-[220ms] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(15,26,46,0.10)]`}
            >
              <button
                className="grid grid-cols-[auto_1fr_auto] items-center gap-[18px] p-[22px] px-6 cursor-pointer w-full text-left bg-transparent border-0"
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? -1 : i)}
              >
                <div className="w-11 h-11 bg-ns-orange-soft rounded-xl flex items-center justify-center text-ns-orange">
                  {r.icon === 'leaf'    && <svg className="w-[22px] h-[22px] fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M11 20A7 7 0 0 1 4 13c0-4 3-8 8-11 5 3 8 7 8 11a7 7 0 0 1-7 7z" /><path d="M11 20v-9" /></svg>}
                  {r.icon === 'shield'  && <svg className="w-[22px] h-[22px] fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>}
                  {r.icon === 'support' && <svg className="w-[22px] h-[22px] fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M9 9h.01M15 9h.01M9 15c1 1 4 1 6 0" /></svg>}
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-[16px] text-ns-navy m-0 mb-1">{r.title}</h3>
                  <p className="font-body text-[13px] text-ns-muted m-0 leading-[1.5]">{r.desc}</p>
                </div>
                <span className="inline-flex items-center gap-2" aria-hidden="true">
                  <span className="ns-link">Ver más</span>
                  <svg
                    className={`text-ns-orange transition-transform duration-[240ms]${open === i ? ' rotate-180' : ''}`}
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </button>
              <div
                className={`overflow-hidden transition-[max-height] duration-[360ms] ${open === i ? 'max-h-[200px]' : 'max-h-0'}`}
                style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
              >
                <p className="font-body text-[14px] leading-[1.7] text-ns-muted m-0 px-6 pb-[22px] pl-[86px]">{r.more}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
