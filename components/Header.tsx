'use client';

import { useState, useEffect } from 'react';

interface HeaderProps {
  active?: string;
}

export default function NSHeader({ active = 'INICIO' }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['INICIO', 'NOSOTROS', 'SOLUCIONES', 'PROYECTOS', 'CONTACTO'];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-100 transition-[background,backdrop-filter] duration-240 ease-in-out${
        scrolled ? ' bg-[rgba(15,26,46,0.85)] backdrop-blur-md shadow-[0_4px_20px_rgba(15,26,46,0.18)]' : ''
      }`}
    >
      <div className="max-w-310 mx-auto h-20 px-8 flex items-center justify-between">
        <a href="#inicio">
          <img src="/assets/logo-dark-bg.png" alt="Norsolar" className="h-9.5 block" />
        </a>
        <nav className="hidden tablet:flex gap-8" aria-label="Navegación principal">
          {links.map(l => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              aria-current={l === active ? 'page' : undefined}
              className={`font-display font-semibold text-[12px] tracking-[0.18em] uppercase no-underline py-1.5 border-b-[1.5px] border-transparent transition-[color,border-color] duration-[180ms]${
                l === active ? ' text-ns-orange border-ns-orange' : ' text-white/85 hover:text-white'
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
