export default function NSFooter() {
  return (
    <footer className="bg-ns-navy-deep text-white pt-20 relative overflow-hidden" id="contacto" data-screen-label="Footer">

      {/* Watermark */}
      <div
        className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 font-display font-extrabold tracking-[-0.02em] text-white/[0.04] whitespace-nowrap pointer-events-none leading-none select-none"
        style={{ fontSize: 'clamp(60px, 12vw, 180px)' }}
      >
        RENEWABLE · ENERGY
      </div>

      {/* Main grid */}
      <div className="ns-container grid grid-cols-[1.6fr_1fr_1fr_1.3fr_0.8fr] max-tablet:grid-cols-2 max-[600px]:grid-cols-1 gap-8 relative z-[2]">

        {/* Brand */}
        <div>
          <img src="/assets/logo-dark-bg.png" alt="Norsolar" className="h-9 mb-4" />
          <p className="font-body text-[13px] leading-[1.6] text-white/65 m-0 mb-[22px] max-w-[280px]">
            Impulsamos un futuro sostenible con soluciones solares fotovoltaicas de alta calidad en todo el Ecuador.
          </p>
          <div className="flex gap-2.5">
            {[
              { mark: 'ISO',  text: '9001\n2015' },
              { mark: 'ANDE', text: 'Socio\nActivo' },
              { mark: 'IESS', text: 'Empresa\nEcuatoriana' },
            ].map(s => (
              <div key={s.mark} className="flex flex-col items-center border border-white/15 rounded-[10px] py-2 px-3 min-w-[64px]">
                <span className="font-display font-extrabold text-[13px] text-ns-orange tracking-[0.04em]">{s.mark}</span>
                <span className="font-body text-[9px] text-white/60 text-center leading-[1.2] mt-0.5" style={{ whiteSpace: 'pre-line' }}>{s.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Soluciones */}
        <div>
          <h4 className="font-display font-semibold text-[12px] tracking-[0.18em] uppercase text-ns-orange m-0 mb-3.5">SOLUCIONES</h4>
          <ul className="p-0 m-0 list-none">
            {['Sistemas Residenciales','Sistemas Comerciales','Sistemas Industriales','Baterías y Almacenamiento','Mantenimiento'].map(item => (
              <li key={item}><a href="#" className="font-body text-[13px] leading-[1.9] text-white/70 no-underline hover:text-ns-orange">{item}</a></li>
            ))}
          </ul>
        </div>

        {/* Empresa */}
        <div>
          <h4 className="font-display font-semibold text-[12px] tracking-[0.18em] uppercase text-ns-orange m-0 mb-3.5">EMPRESA</h4>
          <ul className="p-0 m-0 list-none">
            {['Nosotros','Certificaciones','Blog','Políticas','Trabaja con nosotros'].map(item => (
              <li key={item}><a href="#" className="font-body text-[13px] leading-[1.9] text-white/70 no-underline hover:text-ns-orange">{item}</a></li>
            ))}
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h4 className="font-display font-semibold text-[12px] tracking-[0.18em] uppercase text-ns-orange m-0 mb-3.5">CONTACTO</h4>
          <ul className="p-0 m-0 list-none">
            {[
              { icon: <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />, extra: <circle cx="12" cy="10" r="3" />, text: 'Ibarra, Imbabura, Ecuador\nAv. Jaime Rivadeneira 14-50' },
              { icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />, text: '096 123 4567' },
              { icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="M22 6l-10 7L2 6" /></>, text: 'info@norsolar.ec' },
              { icon: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>, text: 'Lun – Vie: 08h00 – 17h00\nSáb: 08h00 – 12h00' },
            ].map((item, i) => (
              <li key={i} className="flex gap-2 mb-1.5 leading-[1.4]">
                <span className="text-ns-orange shrink-0 mt-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {item.icon}{item.extra}
                  </svg>
                </span>
                <span className="font-body text-[13px] text-white/70" style={{ whiteSpace: 'pre-line' }}>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Síguenos */}
        <div>
          <h4 className="font-display font-semibold text-[12px] tracking-[0.18em] uppercase text-ns-orange m-0 mb-3.5">SÍGUENOS</h4>
          <div className="flex gap-2">
            {[
              { label: 'Facebook',  icon: <path d="M9 8H6v4h3v12h5V12h3.6l.4-4h-4V6c0-1 .3-2 1.7-2H18V0h-3.4C11.3 0 9 2 9 5z" />, fill: true },
              { label: 'Instagram', icon: <><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" /></>, fill: false },
              { label: 'LinkedIn',  icon: <path d="M4 7v14h4V7zm2-2.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zM10 7h4v2c.7-1 2.2-2 4-2 4 0 6 2.7 6 6.5V21h-4v-7c0-2-.7-3.5-2.5-3.5S15 12 15 14v7h-4z" />, fill: true },
              { label: 'YouTube',   icon: <path d="M23 7s-.2-1.5-.9-2.2c-.8-.9-1.7-.9-2.2-1C16.4 3.5 12 3.5 12 3.5s-4.4 0-7.9.3c-.5.1-1.4.1-2.2 1C1.2 5.5 1 7 1 7S.7 8.7.7 10.5v1.7C.7 14 1 15.7 1 15.7s.2 1.5.9 2.2c.8.9 1.9.9 2.4 1 1.7.2 7.7.3 7.7.3s4.4 0 7.9-.3c.5-.1 1.4-.1 2.2-1 .7-.7.9-2.2.9-2.2s.3-1.7.3-3.5v-1.7C23.3 8.7 23 7 23 7zm-13.5 7V8.4l5.7 2.8z" />, fill: true },
            ].map(s => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="w-9 h-9 rounded-full bg-white/8 flex items-center justify-center text-white transition-colors duration-200 hover:bg-ns-orange"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill={s.fill ? 'currentColor' : 'none'} stroke={s.fill ? 'none' : 'currentColor'} strokeWidth="2">
                  {s.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="mt-14 border-t border-white/8 py-[18px]">
        <div className="flex justify-between font-body text-[12px] text-white/50 px-8 mx-auto max-w-[1240px]">
          <span>© 2025 Norsolar Ecuador. Todos los derechos reservados.</span>
          <span>
            <a href="#" className="hover:text-ns-orange transition-colors">Términos y Condiciones</a>
            &nbsp;·&nbsp;
            <a href="#" className="hover:text-ns-orange transition-colors">Política de Privacidad</a>
          </span>
        </div>
      </div>

    </footer>
  );
}
