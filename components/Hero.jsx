'use client';

import { useState, useEffect } from 'react';

export default function NSHero() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = 325;
    const dur = 1400;
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      className="relative min-h-[720px] h-screen max-h-[880px] flex items-center text-white overflow-hidden"
      id="top"
      data-screen-label="Hero"
    >
      <div
        className="absolute inset-0 bg-cover bg-center z-[1]"
        style={{ backgroundImage: 'url(/assets/hero-andino.png)' }}
      />
      <div
        className="absolute inset-0 z-[2]"
        style={{ background: 'linear-gradient(95deg, rgba(15,26,46,0.85) 0%, rgba(15,26,46,0.55) 50%, rgba(15,26,46,0.15) 100%)' }}
      />
      <div className="ns-container relative z-[3] grid grid-cols-[1fr_auto] max-tablet:grid-cols-1 items-center w-full pt-20 gap-8">
        <div className="max-w-[720px]">
          <span className="ns-eyebrow">ENERGÍA SOLAR EN ECUADOR</span>
          <h1
            className="font-display font-extrabold uppercase text-white tracking-[-0.025em] leading-[0.95] mt-3.5 mb-7 max-[600px]:text-[48px]"
            style={{ fontSize: 'clamp(56px, 8vw, 110px)' }}
          >
            INSTALACIÓN DE<br />PANELES SOLARES
          </h1>
          <p className="font-body text-[18px] leading-[1.65] text-white/90 m-0 mb-8">
            Expertos en soluciones fotovoltaicas para hogares,<br />
            comercios e industrias en Ecuador.<br />
            Ahorre hasta un 90% en su planilla eléctrica.
          </p>
          <div className="flex gap-3 flex-wrap">
            <a href="#cotiza" className="ns-btn ns-btn-primary">Calcula tu Ahorro</a>
            <a href="#proyectos" className="ns-btn ns-btn-outline-light">Ver Proyectos</a>
          </div>
        </div>
        <div
          className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 w-[200px] max-tablet:w-[180px] shadow-[0_24px_60px_rgba(15,26,46,0.18)] text-ns-navy text-left relative"
          style={{ animation: 'nsFloat 6s ease-in-out infinite' }}
        >
          <div className="absolute top-4 right-4 w-[30px] h-[30px] bg-ns-orange-soft text-ns-orange rounded-lg flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 17l6-6 4 4 8-8" /><path d="M14 7h7v7" />
            </svg>
          </div>
          <div className="font-display font-extrabold text-[56px] tracking-[-0.02em] leading-none text-ns-navy mt-1">
            {count}%
          </div>
          <div className="font-body text-[13px] text-ns-muted mt-1.5 leading-[1.4]">
            más demanda<br />en 2024
          </div>
        </div>
      </div>
    </section>
  );
}
