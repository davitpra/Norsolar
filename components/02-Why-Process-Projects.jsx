/* global React */
const { useState: useStateB } = React;

// ============== WHY NORSOLAR ==============
function NSWhy() {
  const features = [
    { icon: "sun", title: "Experiencia comprobada", body: "+250 proyectos instalados en Ecuador" },
    { icon: "wrench", title: "Soluciones a medida", body: "Residencial, comercial e industrial" },
    { icon: "shield", title: "Certificación y garantía", body: "Productos con hasta 25 años de garantía" },
    { icon: "trend", title: "Retorno de inversión", body: "Recupere su inversión en 3–4 años" },
  ];
  return (
    <section className="ns-section ns-why" id="nosotros" data-screen-label="Por qué Norsolar">
      <div className="ns-container ns-why-grid">
        <div className="ns-why-text">
          <span className="ns-eyebrow">POR QUÉ NORSOLAR</span>
          <h2 className="ns-display-h">¿POR QUÉ<br/>NORSOLAR ES<br/>DIFERENTE?</h2>
          <p className="ns-body-lg">
            Combinamos experiencia local, tecnología de clase mundial y atención
            personalizada para entregar proyectos solares que realmente generan
            resultados.
          </p>
          <div className="ns-arcernnr">
            <div className="ns-arcernnr-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
            </div>
            <div>
              <div className="ns-arcernnr-title">Regulación ARCERNNR 001/2021</div>
              <div className="ns-arcernnr-sub">Respaldo legal para generación distribuida y autoconsumo en Ecuador.</div>
            </div>
          </div>
        </div>
        <div className="ns-why-image" style={{ backgroundImage: "url(assets/equipo-trabajando.jpg)" }} />
        <div className="ns-feature-grid">
          {features.map(f => (
            <div key={f.title} className="ns-feature-card">
              <div className="ns-feature-icon">
                {f.icon === "sun" && <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"/></svg>}
                {f.icon === "wrench" && <svg viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>}
                {f.icon === "shield" && <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>}
                {f.icon === "trend" && <svg viewBox="0 0 24 24"><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg>}
              </div>
              <h4>{f.title}</h4>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============== PROCESS ==============
function NSProcess({ onCotizar }) {
  const steps = [
    { n: "01", title: "Consulta gratuita", desc: "Analizamos su consumo y diseñamos la solución ideal.", img: "assets/equipo-trabajando.jpg" },
    { n: "02", title: "Diseño personalizado", desc: "Ingeniería a medida para su techo y necesidades.", img: "assets/instalacion.jpg" },
    { n: "03", title: "Instalación profesional", desc: "Productos certificados, sin complicaciones.", img: "assets/instalacion-panel-1.jpg" },
    { n: "04", title: "Monitoreo 24/7", desc: "Controle su producción desde el celular.", img: "assets/paneles-techo.jpg" },
  ];
  const [idx, setIdx] = useStateB(0);
  const prev = () => setIdx(i => Math.max(0, i - 1));
  const next = () => setIdx(i => Math.min(steps.length - 1, i + 1));
  return (
    <section className="ns-section ns-section-alt ns-process" data-screen-label="Proceso">
      <div className="ns-container">
        <span className="ns-eyebrow">EL PROCESO</span>
        <h2 className="ns-display-h">IR A SOLAR ES MÁS FÁCIL DE LO QUE PIENSA</h2>
        <div className="ns-process-grid">
          {steps.map((s, i) => (
            <article
              key={s.n}
              className={`ns-process-step ${i === idx ? "is-active" : ""}`}
              style={{ backgroundImage: `url(${s.img})` }}
              onClick={() => setIdx(i)}
            >
              <span className="ns-process-num">{s.n}</span>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </article>
          ))}
        </div>
        <div className="ns-process-foot">
          <div className="ns-process-pager">
            <button className="ns-btn-ghost-dark" onClick={prev} disabled={idx === 0}>← Anterior</button>
            <span className="ns-process-counter">{String(idx + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}</span>
            <button className="ns-btn-ghost-dark" onClick={next} disabled={idx === steps.length - 1}>Siguiente →</button>
          </div>
          <button className="ns-btn ns-btn-primary" onClick={onCotizar}>Empieza Ahora</button>
        </div>
      </div>
    </section>
  );
}

// ============== PROJECTS ==============
function NSProjects() {
  const items = [
    { title: "Energía limpia para el hogar", desc: "Sistemas residenciales que reducen su planilla eléctrica y le dan independencia.", img: "assets/instalacion-panel-2.jpg" },
    { title: "Sustentabilidad empresarial", desc: "Soluciones solares para comercios y empresas que buscan eficiencia y ahorro.", img: "assets/paneles-techo.jpg" },
    { title: "Energía solar para todos", desc: "Proyectos industriales e institucionales que impulsan un Ecuador más sostenible.", img: "assets/instalacion-panel-3.jpg" },
  ];
  return (
    <section className="ns-section ns-projects" id="proyectos" data-screen-label="Proyectos">
      <div className="ns-container">
        <span className="ns-eyebrow">NUESTROS PROYECTOS</span>
        <h2 className="ns-display-h">PROYECTOS</h2>
        <div className="ns-projects-grid">
          {items.map(p => (
            <article key={p.title} className="ns-project-card">
              <div className="ns-project-img-wrap">
                <div className="ns-project-img" style={{ backgroundImage: `url(${p.img})` }} />
              </div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <a href="#cotiza" className="ns-link">Ver más →</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { NSWhy, NSProcess, NSProjects });
