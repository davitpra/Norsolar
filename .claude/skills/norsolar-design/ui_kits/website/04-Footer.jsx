/* global React */

// ============== FOOTER ==============
function Footer() {
  return (
    <footer className="ns-footer" id="contacto">
      <div className="ns-container ns-footer-inner">
        <div className="ns-footer-brand">
          <img src="../../assets/logo-dark-bg.png" alt="Norsolar" />
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
            <li><span>📍</span> Ibarra, Imbabura, Ecuador<br/>Av. Jaime Rivadeneira 14-50</li>
            <li><span>☎</span> 096 123 4567</li>
            <li><span>✉</span> info@norsolar.ec</li>
            <li><span>⏱</span> Lun – Vie: 08h00 – 17h00<br/>Sáb: 08h00 – 12h00</li>
          </ul>
        </div>
        <div className="ns-footer-col">
          <h4>SÍGUENOS</h4>
          <div className="ns-social">
            <a href="#"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8H6v4h3v12h5V12h3.6l.4-4h-4V6c0-1 .3-2 1.7-2H18V0h-3.4C11.3 0 9 2 9 5z"/></svg></a>
            <a href="#"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="5"/></svg></a>
            <a href="#"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M4 7v14h4V7zm2-2.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zM10 7h4v2c.7-1 2.2-2 4-2 4 0 6 2.7 6 6.5V21h-4v-7c0-2-.7-3.5-2.5-3.5S15 12 15 14v7h-4z"/></svg></a>
            <a href="#"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23 4.5a9 9 0 0 1-2.6 1.3 4.6 4.6 0 0 0-7.9 4.2A13 13 0 0 1 1 3.4a4.6 4.6 0 0 0 1.4 6.2A4.5 4.5 0 0 1 .9 9v.1a4.6 4.6 0 0 0 3.7 4.5 4.6 4.6 0 0 1-2.1.1 4.6 4.6 0 0 0 4.3 3.2 9.3 9.3 0 0 1-5.7 2 9.5 9.5 0 0 1-1.1 0A13 13 0 0 0 7.3 21c8.4 0 13-7 13-13v-.6c.9-.6 1.7-1.4 2.4-2.3z"/></svg></a>
          </div>
        </div>
      </div>
      <div className="ns-footer-bottom">
        <div className="ns-container ns-footer-bottom-inner">
          <span>© 2025 Norsolar Ecuador. Todos los derechos reservados.</span>
          <span><a href="#">Términos y Condiciones</a> &nbsp;·&nbsp; <a href="#">Política de Privacidad</a></span>
        </div>
      </div>
    </footer>
  );
}

// ============== WHATSAPP FAB ==============
function WhatsAppFab() {
  return (
    <a href="https://wa.me/593961234567" className="ns-wa-fab" aria-label="WhatsApp">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.7.9-.9 1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.2-.5 0-.2 0-.4-.1-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.4-.2.3-.9.9-.9 2.2 0 1.3 1 2.5 1.1 2.7.1.2 1.9 2.9 4.6 4 .6.3 1.1.5 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.2-.3-.3-.6-.4z"/><path d="M20.5 3.5C18.3 1.2 15.3 0 12.1 0 5.5 0 .2 5.4.2 12c0 2.1.5 4.2 1.6 6L0 24l6.2-1.6c1.7.9 3.7 1.4 5.7 1.4 6.6 0 11.9-5.4 11.9-11.9 0-3.2-1.2-6.2-3.3-8.4zM12.1 21.7c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.7 1 1-3.6-.2-.4c-1-1.6-1.5-3.4-1.5-5.3 0-5.5 4.5-9.9 9.9-9.9 2.6 0 5.1 1 7 2.9 1.9 1.9 2.9 4.4 2.9 7 .1 5.5-4.4 9.9-9.9 9.9z"/></svg>
    </a>
  );
}

window.NSFooter = Footer;
window.NSWhatsAppFab = WhatsAppFab;
