/* global React */
const { useState, useEffect, useRef } = React;

// ============== HEADER ==============
function Header({ active = "INICIO" }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = ["INICIO", "NOSOTROS", "SOLUCIONES", "PROYECTOS", "CONTACTO"];
  return (
    <header className={`ns-header ${scrolled ? "scrolled" : ""}`}>
      <div className="ns-header-inner">
        <a href="#top" className="ns-logo">
          <img src="../../assets/logo-dark-bg.png" alt="Norsolar" />
        </a>
        <nav className="ns-nav">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className={l === active ? "active" : ""}>{l}</a>
          ))}
        </nav>
        <a href="#cotiza" className="ns-btn ns-btn-primary ns-btn-sm">Cotiza Gratis</a>
      </div>
    </header>
  );
}

// ============== HERO ==============
function Hero() {
  return (
    <section className="ns-hero" id="top">
      <div className="ns-hero-bg" style={{ backgroundImage: "url(../../assets/hero-andino.png)" }} />
      <div className="ns-hero-overlay" />
      <div className="ns-container ns-hero-inner">
        <div className="ns-hero-text">
          <span className="ns-eyebrow ns-eyebrow-onDark">ENERGÍA SOLAR EN ECUADOR</span>
          <h1 className="ns-hero-title">INSTALACIÓN DE<br/>PANELES SOLARES</h1>
          <p className="ns-hero-sub">
            Expertos en soluciones fotovoltaicas para hogares,<br/>
            comercios e industrias en Ecuador.<br/>
            Ahorre hasta un 90% en su planilla eléctrica.
          </p>
          <div className="ns-hero-ctas">
            <a href="#cotiza" className="ns-btn ns-btn-primary">Calcula tu Ahorro</a>
            <a href="#proyectos" className="ns-btn ns-btn-outline-light">Ver Proyectos</a>
          </div>
        </div>
        <div className="ns-hero-stat">
          <div className="ns-hero-stat-trend">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg>
          </div>
          <div className="ns-hero-stat-num">325%</div>
          <div className="ns-hero-stat-lbl">más demanda<br/>en 2024</div>
        </div>
      </div>
    </section>
  );
}

// ============== BRAND BAR ==============
function BrandBar() {
  const brands = ["Trinasolar", "ECOFLOW", "K2 Systems", "BLOCKSOLAR", "UNIRAC"];
  return (
    <section className="ns-brandbar">
      <div className="ns-container">
        <span className="ns-eyebrow">TRABAJAMOS CON LAS MEJORES MARCAS DEL MERCADO</span>
        <div className="ns-brandbar-row">
          {brands.map(b => (
            <div key={b} className="ns-brandbar-item">{b}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.NSHeader = Header;
window.NSHero = Hero;
window.NSBrandBar = BrandBar;
