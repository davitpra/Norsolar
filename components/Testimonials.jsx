'use client';

import { useState, useEffect } from 'react';

const testimonials = [
  { name: 'María Fernanda R.', role: 'Hogar — Ibarra',     text: 'Gracias a Norsolar redujimos nuestra planilla casi a cero. Excelente asesoría y cumplieron todo lo prometido.' },
  { name: 'Carlos Andrade',    role: 'Gerente — Comercio', text: 'La instalación fue rápida y profesional. Ahora nuestra empresa tiene ahorros significativos cada mes.' },
  { name: 'Ing. Laura Pérez',  role: 'Industria — Quito',  text: 'Norsolar nos brindó una solución a la medida y monitoreo 24/7. Totalmente recomendados.' },
  { name: 'Andrés Salazar',    role: 'Hogar — Otavalo',    text: 'El equipo fue puntual, limpio y muy profesional. Ya estamos generando energía y se nota en la planilla.' },
];

export default function NSTestimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive(i => (i + 1) % Math.max(1, testimonials.length - 2)), 5000);
    return () => clearInterval(id);
  }, []);

  const visible = testimonials
    .slice(active, active + 3)
    .concat(testimonials.slice(0, Math.max(0, active + 3 - testimonials.length)))
    .slice(0, 3);

  return (
    <section className="ns-section bg-white" data-screen-label="Testimonios">
      <div className="ns-container grid grid-cols-[1fr_2fr] max-tablet:grid-cols-1 gap-10 items-start">

        {/* Left: stats */}
        <div>
          <span className="ns-eyebrow">TESTIMONIOS</span>
          <h2 className="ns-display-h-md">TU MEJOR<br />OPCIÓN EN<br />ENERGÍA SOLAR</h2>
        </div>

        {/* Right: cards + dots */}
        <div className="flex flex-col gap-[18px]">
          <div className="grid grid-cols-3 max-tablet:grid-cols-2 max-[600px]:grid-cols-1 gap-[18px]">
            {visible.map(item => (
              <article
                key={item.name}
                className="bg-white border border-[#ECEFF3] rounded-[14px] p-[22px] flex flex-col gap-3.5"
              >
                <div className="flex justify-between items-center">
                  <span className="font-display font-extrabold text-[36px] text-ns-navy leading-[0.5]">&ldquo;</span>
                  <span className="text-ns-orange text-[13px] tracking-[1px]">★★★★★</span>
                </div>
                <p className="font-body text-[13px] leading-[1.55] text-ns-navy m-0">{item.text}</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 rounded-full shrink-0" style={{ background: 'linear-gradient(135deg, #F28C28, #1B2A4A)' }} />
                  <div>
                    <div className="font-display font-semibold text-[13px] text-ns-navy">{item.name}</div>
                    <div className="font-body text-[11px] text-ns-muted">{item.role}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="flex gap-2 justify-center mt-2">
            {Array.from({ length: Math.max(1, testimonials.length - 2) }).map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Ir a slide ${i + 1}`}
                className={`h-2 rounded-full border-0 cursor-pointer p-0 transition-all duration-[240ms]${
                  i === active ? ' w-7 bg-ns-orange' : ' w-2 bg-[rgba(15,26,46,0.18)]'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
