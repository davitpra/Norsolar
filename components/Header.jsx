'use client';

import { useState, useEffect } from 'react';

export default function NSHeader({ active = 'INICIO' }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['INICIO', 'NOSOTROS', 'SOLUCIONES', 'PROYECTOS', 'CONTACTO'];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-[background,backdrop-filter] duration-[240ms] ease-in-out${
        scrolled ? ' bg-[rgba(15,26,46,0.85)] backdrop-blur-[12px] shadow-[0_4px_20px_rgba(15,26,46,0.18)]' : ''
      }`}
    >
      <div className="max-w-[1240px] mx-auto h-20 px-8 flex items-center justify-between">
        <a href="#top">
          <img src="/assets/logo-dark-bg.png" alt="Norsolar" className="h-[38px] block" />
        </a>
        <nav className="hidden tablet:flex gap-8">
          {links.map(l => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className={`font-display font-semibold text-[12px] tracking-[0.18em] uppercase no-underline py-1.5 border-b-[1.5px] border-transparent transition-[color,border-color] duration-[180ms]${
                l === active ? ' text-ns-orange' : ' text-white/85 hover:text-white'
              }`}
            >
              {l}
            </a>
          ))}
        </nav>
        <a href="#cotiza" className="ns-btn ns-btn-primary ns-btn-sm">Cotiza Gratis</a>
      </div>
    </header>
  );
}
