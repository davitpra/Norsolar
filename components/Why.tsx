'use client';

import { useState } from 'react';
import {
  SparklesIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import type { ComponentType, SVGProps } from 'react';

const ICON_MAP = {
  leaf: SparklesIcon,
  shield: ShieldCheckIcon,
  support: UserGroupIcon,
  money: CurrencyDollarIcon,
} as const;

type IconKey = keyof typeof ICON_MAP;

interface Feature {
  title: string;
  desc: string;
  icon: IconKey;
  more: string;
}

const FEATURES: Feature[] = [
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
  {
    title: 'Ahorro garantizado',
    desc: 'Reducción significativa en su factura de electricidad.',
    icon: 'money',
    more: 'Ecuador cuenta con radiación solar privilegiada por estar en la línea ecuatorial. Aproveche ese recurso ilimitado',
  },
];

interface FeatureCardProps {
  icon: IconKey;
  title: string;
  desc: string;
  more: string;
}

function FeatureCard({ icon, title, desc, more }: FeatureCardProps) {
  const [open, setOpen] = useState(false);
  const Icon = ICON_MAP[icon] as ComponentType<SVGProps<SVGSVGElement> & { className?: string }>;
  return (
    <div className="group relative bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:bg-white/[0.08] hover:border-ns-orange/30 hover:-translate-y-1">
      <div className="relative w-10 h-10 rounded-xl bg-ns-orange/15 text-ns-orange flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-ns-orange/25">
        <Icon className="w-[22px] h-[22px]" />
      </div>

      <h3 className="relative font-display font-extrabold text-[15px] text-white m-0 mb-2 leading-tight">{title}</h3>
      <p className="relative font-body text-[13px] leading-[1.55] text-white/60 m-0 mb-3">{desc}</p>

      <button
        onClick={() => setOpen((v) => !v)}
        className="relative flex items-center gap-1 text-ns-orange font-body text-[12px] font-semibold cursor-pointer bg-transparent border-none p-0 mb-0"
      >
        {open ? 'Ver menos' : 'Ver más'}
        <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>

      <div
        className="relative overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? '200px' : '0px', opacity: open ? 1 : 0 }}
      >
        <p className="font-body text-[12px] leading-[1.6] text-white/45 m-0 pt-3">{more}</p>
      </div>

      <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-ns-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
    </div>
  );
}

export default function NSWhy() {
  return (
    <section
      className="ns-section relative overflow-hidden"
      id="nosotros"
      data-screen-label="Por qué Norsolar"
      style={{ background: 'linear-gradient(160deg, #0F1A2E 0%, #1B2A4A 100%)' }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-6 -left-4 font-display font-extrabold uppercase leading-none text-white/[0.03] whitespace-nowrap"
        style={{ fontSize: 'clamp(120px, 18vw, 220px)', letterSpacing: '-0.04em' }}
      >
        NORSOLAR
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 w-[520px] h-[520px] rounded-full opacity-[0.07]"
        style={{ background: 'radial-gradient(circle, #F28C28 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
      />

      <div className="ns-container relative">

        <div className="grid grid-cols-2 max-tablet:grid-cols-1 gap-12 items-center mb-16">

          <div>
            <span className="ns-eyebrow">POR QUÉ NORSOLAR</span>
            <h2
              className="font-display font-extrabold uppercase text-white m-0 mb-6 leading-[0.95] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(40px, 5.2vw, 68px)' }}
            >
              ¿POR QUÉ<br />
              <span className="text-ns-orange">NORSOLAR</span><br />
              ES DIFERENTE?
            </h2>
            <p className="font-body text-[17px] leading-[1.7] text-white/60 m-0 mb-8 max-w-[440px]">
              Combinamos experiencia local, tecnología de clase mundial y atención
              personalizada para entregar proyectos solares que realmente generan resultados.
            </p>

            <a href="#contacto" className="ns-btn ns-btn-primary self-start">
              Cotiza gratis online
            </a>
          </div>

          <div className="relative max-tablet:mt-2">
            <div
              aria-hidden="true"
              className="absolute rounded-2xl border border-ns-orange/30"
              style={{ inset: 0, transform: 'translate(12px, 12px)' }}
            />
            <div
              className="relative rounded-2xl bg-cover bg-center overflow-hidden"
              style={{
                backgroundImage: 'url(/assets/equipo.png)',
                minHeight: 'clamp(280px, 38vw, 460px)',
              }}
            >
              <div
                className="absolute inset-0 rounded-2xl"
                style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(15,26,46,0.82) 100%)' }}
              />

              <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 bg-[rgba(15,26,46,0.88)] backdrop-blur-md border border-white/[0.12] rounded-[12px] p-3.5">
                <div className="w-9 h-9 rounded-full bg-ns-orange/20 text-ns-orange flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <div className="font-display font-extrabold text-[12px] text-white mb-0.5 leading-none">Regulación ARCERNNR 001/2021</div>
                  <div className="font-body text-[11px] text-white/50 leading-[1.4]">Respaldo legal para generación distribuida y autoconsumo en Ecuador.</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-white/[0.08] pt-12 grid grid-cols-4 max-tablet:grid-cols-2 max-[600px]:grid-cols-1 gap-4 items-start">
          {FEATURES.map((feature) => <FeatureCard key={feature.title} {...feature} />)}
        </div>

      </div>
    </section>
  );
}
