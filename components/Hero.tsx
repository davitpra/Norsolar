"use client";

import { useState, useEffect, useRef } from "react";

export default function NSHero() {
  const [count, setCount] = useState(325);
  const prefersReducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (prefersReducedMotion.current) return;
    const target = 325;
    const dur = 1400;
    const start = performance.now();
    let raf: number;
    setCount(0);
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  void count;

  return (
    <section
      className="relative min-h-180 h-screen max-h-240 flex items-center text-white overflow-hidden"
      id="top"
      data-screen-label="Hero"
    >
      <div
        className="absolute inset-0 bg-cover bg-center z-1"
        style={{ backgroundImage: "url(/assets/hero-andino.png)" }}
      />
      <div
        className="absolute inset-0 z-2"
        style={{
          background:
            "linear-gradient(95deg, rgba(15,26,46,0.85) 0%, rgba(15,26,46,0.55) 50%, rgba(15,26,46,0.15) 100%)",
        }}
      />
      <div className="ns-container relative z-3 grid grid-cols-[1fr_auto] max-tablet:grid-cols-1 items-center w-full pt-12 gap-4">
        <div className="max-w-180">
          <span className="ns-eyebrow">ENERGÍA SOLAR EN ECUADOR</span>
          <h1
            className="font-display font-extrabold uppercase text-white tracking-tight leading-[0.90] mt-3.5 mb-7 max-[700px]:text-[40px]"
            style={{ fontSize: "clamp(40px, 8vw, 90px)" }}
          >
            INSTALACIÓN DE
            <br />
            PANELES SOLARES
          </h1>
          <p className="font-body text-[18px] leading-[1.65] text-white/90 m-0 mb-8">
            Expertos en soluciones fotovoltaicas para hogares,
            <br />
            comercios e industrias en Ecuador.
            <br />
            Ahorre hasta un 90% en su planilla eléctrica.
          </p>
          <div className="flex gap-3 flex-wrap">
            <a href="#cotiza" className="ns-btn ns-btn-primary">
              Calcula tu Ahorro
            </a>
            <a href="#proyectos" className="ns-btn ns-btn-outline-light">
              Ver Proyectos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
