const socials = [
  {
    label: 'Facebook',
    href: '#',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M9 8H6v4h3v12h5V12h3.6l.4-4h-4V6c0-1 .3-2 1.7-2H18V0h-3.4C11.3 0 9 2 9 5z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M4 7v14h4V7zm2-2.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zM10 7h4v2c.7-1 2.2-2 4-2 4 0 6 2.7 6 6.5V21h-4v-7c0-2-.7-3.5-2.5-3.5S15 12 15 14v7h-4z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M23 7s-.2-1.5-.9-2.2c-.8-.9-1.7-.9-2.2-1C16.4 3.5 12 3.5 12 3.5s-4.4 0-7.9.3c-.5.1-1.4.1-2.2 1C1.2 5.5 1 7 1 7S.7 8.7.7 10.5v1.7C.7 14 1 15.7 1 15.7s.2 1.5.9 2.2c.8.9 1.9.9 2.4 1 1.7.2 7.7.3 7.7.3s4.4 0 7.9-.3c.5-.1 1.4-.1 2.2-1 .7-.7.9-2.2.9-2.2s.3-1.7.3-3.5v-1.7C23.3 8.7 23 7 23 7zm-13.5 7V8.4l5.7 2.8z" />
      </svg>
    ),
  },
];

export default function NSFooter() {
  return (
    <footer className="bg-ns-navy-deep text-white" id="contacto" data-screen-label="Footer">
      <div className="ns-container flex items-center justify-between py-5 gap-4 flex-wrap">

        {/* Logo */}
        <img src="/assets/logo-dark-bg.png" alt="Norsolar" className="h-8" />

        {/* Copyright */}
        <span className="font-body text-[12px] text-white/55 text-center">
          © 2025 Norsolar Ecuador. Todos los derechos reservados.
        </span>

        {/* Social icons */}
        <div className="flex gap-4">
          {socials.map(({ label, href, svg }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="text-white/60 hover:text-ns-orange transition-colors duration-200"
            >
              {svg}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}
