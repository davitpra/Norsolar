'use client';

import { useState } from 'react';

export default function NSProcess({ onCotizar }) {
  const steps = [
    { n: '01', title: 'Consulta gratuita',       desc: 'Analizamos su consumo y diseñamos la solución ideal.',   img: '/assets/equipo-trabajando.jpg' },
    { n: '02', title: 'Diseño personalizado',    desc: 'Ingeniería a medida para su techo y necesidades.',       img: '/assets/instalacion.jpg' },
    { n: '03', title: 'Instalación profesional', desc: 'Productos certificados, sin complicaciones.',             img: '/assets/instalacion-panel-1.jpg' },
    { n: '04', title: 'Monitoreo 24/7',          desc: 'Controle su producción desde el celular.',               img: '/assets/paneles-techo.jpg' },
  ];
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx(i => Math.max(0, i - 1));
  const next = () => setIdx(i => Math.min(steps.length - 1, i + 1));

  return (
    <section className="ns-section bg-ns-bg-alt" data-screen-label="Proceso">
      <div className="ns-container">
        <span className="ns-eyebrow">EL PROCESO</span>
        <h2 className="ns-display-h max-w-[900px]">IR A SOLAR ES MÁS FÁCIL DE LO QUE PIENSA</h2>

        <div className="grid grid-cols-4 max-tablet:grid-cols-2 max-[600px]:grid-cols-1 gap-[18px] mt-10">
          {steps.map((s, i) => (
            <article
              key={s.n}
              className={`relative h-[320px] rounded-2xl overflow-hidden bg-cover bg-center flex flex-col justify-end p-6 text-white cursor-pointer transition-[transform,box-shadow] duration-[280ms] hover:-translate-y-1${
                i === idx ? ' outline outline-2 outline-ns-orange outline-offset-2' : ''
              }`}
              style={{ backgroundImage: `url(${s.img})` }}
              onClick={() => setIdx(i)}
            >
              {/* gradient overlay */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(180deg, rgba(15,26,46,0.15) 0%, rgba(15,26,46,0.95) 100%)' }}
              />
              <span className="relative font-display font-extrabold text-[56px] leading-none text-ns-orange mb-auto self-start">{s.n}</span>
              <h3 className="relative font-display font-extrabold text-[22px] leading-[1.1] m-0 mb-2">{s.title}</h3>
              <p className="relative font-body text-[13px] leading-[1.5] m-0 opacity-90">{s.desc}</p>
            </article>
          ))}
        </div>

        <div className="mt-7 flex justify-between items-center">
          <div className="flex gap-[18px] items-center">
            <button className="ns-btn-ghost-dark" onClick={prev} disabled={idx === 0}>← Anterior</button>
            <span className="font-display font-semibold text-[12px] tracking-[0.18em] text-ns-muted px-2">
              {String(idx + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
            </span>
            <button className="ns-btn-ghost-dark" onClick={next} disabled={idx === steps.length - 1}>Siguiente →</button>
          </div>
          <button className="ns-btn ns-btn-primary" onClick={onCotizar}>Empieza Ahora</button>
        </div>
      </div>
    </section>
  );
}
