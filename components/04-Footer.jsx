/* global React */

function NSFooter() {
  return (
    <footer className="ns-footer" id="contacto" data-screen-label="Footer">
      <div className="ns-footer-watermark">RENEWABLE · ENERGY</div>
      <div className="ns-container ns-footer-inner">
        <div className="ns-footer-brand">
          <img src="assets/logo-dark-bg.png" alt="Norsolar" />
          <p>Impulsamos un futuro sostenible con soluciones solares fotovoltaicas de alta calidad en todo el Ecuador.</p>
          <div className="ns-footer-seals">
            <div className="ns-seal">
              <span className="ns-seal-mark">ISO</span>
              <span className="ns-seal-text">9001<br/>2015</span>
            </div>
            <div className="ns-seal">
              <span className="ns-seal-mark">ANDE</span>
              <span className="ns-seal-text">Socio<br/>Activo</span>
            </div>
            <div className="ns-seal">
              <span className="ns-seal-mark">IESS</span>
              <span className="ns-seal-text">Empresa<br/>Ecuatoriana</span>
            </div>
          </div>
        </div>
        <div className="ns-footer-col">
          <h4>SOLUCIONES</h4>
          <ul>
            <li><a href="#">Sistemas Residenciales</a></li>
            <li><a href="#">Sistemas Comerciales</a></li>
            <li><a href="#">Sistemas Industriales</a></li>
            <li><a href="#">Baterías y Almacenamiento</a></li>
            <li><a href="#">Mantenimiento</a></li>
          </ul>
        </div>
        <div className="ns-footer-col">
          <h4>EMPRESA</h4>
          <ul>
            <li><a href="#">Nosotros</a></li>
            <li><a href="#">Certificaciones</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Políticas</a></li>
            <li><a href="#">Trabaja con nosotros</a></li>
          </ul>
        </div>
        <div className="ns-footer-col">
          <h4>CONTACTO</h4>
          <ul className="ns-footer-contact">
            <li>
              <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
              <span>Ibarra, Imbabura, Ecuador<br/>Av. Jaime Rivadeneira 14-50</span>
            </li>
            <li>
              <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>
              <span>096 123 4567</span>
            </li>
            <li>
              <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg></span>
              <span>info@norsolar.ec</span>
            </li>
            <li>
              <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></span>
              <span>Lun – Vie: 08h00 – 17h00<br/>Sáb: 08h00 – 12h00</span>
            </li>
          </ul>
        </div>
        <div className="ns-footer-col">
          <h4>SÍGUENOS</h4>
          <div className="ns-social">
            <a href="#" aria-label="Facebook"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8H6v4h3v12h5V12h3.6l.4-4h-4V6c0-1 .3-2 1.7-2H18V0h-3.4C11.3 0 9 2 9 5z"/></svg></a>
            <a href="#" aria-label="Instagram"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg></a>
            <a href="#" aria-label="LinkedIn"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M4 7v14h4V7zm2-2.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zM10 7h4v2c.7-1 2.2-2 4-2 4 0 6 2.7 6 6.5V21h-4v-7c0-2-.7-3.5-2.5-3.5S15 12 15 14v7h-4z"/></svg></a>
            <a href="#" aria-label="YouTube"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23 7s-.2-1.5-.9-2.2c-.8-.9-1.7-.9-2.2-1C16.4 3.5 12 3.5 12 3.5s-4.4 0-7.9.3c-.5.1-1.4.1-2.2 1C1.2 5.5 1 7 1 7S.7 8.7.7 10.5v1.7C.7 14 1 15.7 1 15.7s.2 1.5.9 2.2c.8.9 1.9.9 2.4 1 1.7.2 7.7.3 7.7.3s4.4 0 7.9-.3c.5-.1 1.4-.1 2.2-1 .7-.7.9-2.2.9-2.2s.3-1.7.3-3.5v-1.7C23.3 8.7 23 7 23 7zm-13.5 7V8.4l5.7 2.8z"/></svg></a>
          </div>
        </div>
      </div>
      <div className="ns-footer-bottom">
        <div className="ns-footer-bottom-inner">
          <span>© 2025 Norsolar Ecuador. Todos los derechos reservados.</span>
          <span><a href="#">Términos y Condiciones</a> &nbsp;·&nbsp; <a href="#">Política de Privacidad</a></span>
        </div>
      </div>
    </footer>
  );
}

function NSWhatsAppFab() {
  return (
    <a href="https://wa.me/593961234567" className="ns-wa-fab" aria-label="WhatsApp">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.7.9-.9 1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.2-.5 0-.2 0-.4-.1-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.4-.2.3-.9.9-.9 2.2 0 1.3 1 2.5 1.1 2.7.1.2 1.9 2.9 4.6 4 .6.3 1.1.5 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.2-.3-.3-.6-.4z"/><path d="M20.5 3.5C18.3 1.2 15.3 0 12.1 0 5.5 0 .2 5.4.2 12c0 2.1.5 4.2 1.6 6L0 24l6.2-1.6c1.7.9 3.7 1.4 5.7 1.4 6.6 0 11.9-5.4 11.9-11.9 0-3.2-1.2-6.2-3.3-8.4zM12.1 21.7c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.7 1 1-3.6-.2-.4c-1-1.6-1.5-3.4-1.5-5.3 0-5.5 4.5-9.9 9.9-9.9 2.6 0 5.1 1 7 2.9 1.9 1.9 2.9 4.4 2.9 7 .1 5.5-4.4 9.9-9.9 9.9z"/></svg>
    </a>
  );
}

Object.assign(window, { NSFooter, NSWhatsAppFab });
