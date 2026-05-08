/* global React */
const { useState: useStateF, useEffect: useEffectF } = React;

// ============== QUOTE FORM ==============
function NSQuoteForm({ id }) {
  const [submitted, setSubmitted] = useStateF(false);
  const [form, setForm] = useStateF({
    nombre: "", correo: "", telefono: "",
    ciudad: "", tipo: "", consumo: "", mensaje: ""
  });
  const upd = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return (
    <section className="ns-section ns-quote-section" id={id || "cotiza"} data-screen-label="Cotizador">
      <div className="ns-container ns-quote-inner">
        <div className="ns-quote-left">
          <span className="ns-eyebrow ns-eyebrow-onDark">COTIZA TU PROYECTO</span>
          <h2 className="ns-quote-title">Cotice ahora y<br/>obtenga una<br/>estimación<br/>gratuita</h2>
          <div className="ns-quote-rule" />
          <p className="ns-quote-sub">Conecte con nuestro equipo para discutir su proyecto. Sin compromiso.</p>
          <a href="https://wa.me/593961234567" className="ns-quote-wa">
            <span className="ns-quote-wa-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.7.9-.9 1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.2-.5 0-.2 0-.4-.1-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.4-.2.3-.9.9-.9 2.2 0 1.3 1 2.5 1.1 2.7.1.2 1.9 2.9 4.6 4 .6.3 1.1.5 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.2-.3-.3-.6-.4z"/><path d="M20.5 3.5C18.3 1.2 15.3 0 12.1 0 5.5 0 .2 5.4.2 12c0 2.1.5 4.2 1.6 6L0 24l6.2-1.6c1.7.9 3.7 1.4 5.7 1.4 6.6 0 11.9-5.4 11.9-11.9 0-3.2-1.2-6.2-3.3-8.4zM12.1 21.7c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.7 1 1-3.6-.2-.4c-1-1.6-1.5-3.4-1.5-5.3 0-5.5 4.5-9.9 9.9-9.9 2.6 0 5.1 1 7 2.9 1.9 1.9 2.9 4.4 2.9 7 .1 5.5-4.4 9.9-9.9 9.9z"/></svg>
            </span>
            o escríbanos por WhatsApp
          </a>
        </div>
        <form className="ns-quote-form" onSubmit={submit}>
          {submitted ? (
            <div className="ns-quote-success">
              <div className="ns-success-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
              </div>
              <h3>¡Cotización recibida!</h3>
              <p>Nuestro equipo lo contactará en menos de 24 horas, {form.nombre || "estimado/a"}.</p>
            </div>
          ) : (
            <>
              <div className="ns-form-row">
                <input className="ns-input" placeholder="Nombre completo" value={form.nombre} onChange={upd("nombre")} required />
                <input className="ns-input" type="email" placeholder="Correo electrónico" value={form.correo} onChange={upd("correo")} required />
                <input className="ns-input" placeholder="Teléfono" value={form.telefono} onChange={upd("telefono")} required />
              </div>
              <div className="ns-form-row">
                <select className="ns-input" value={form.ciudad} onChange={upd("ciudad")} required>
                  <option value="">Ciudad</option>
                  <option>Ibarra</option><option>Quito</option><option>Guayaquil</option><option>Cuenca</option><option>Otavalo</option><option>Otra</option>
                </select>
                <select className="ns-input" value={form.tipo} onChange={upd("tipo")} required>
                  <option value="">Tipo de solución</option>
                  <option>Residencial</option><option>Comercial</option><option>Industrial</option><option>Baterías y almacenamiento</option>
                </select>
              </div>
              <input className="ns-input ns-input-full" placeholder="Consumo mensual aproximado ($)" value={form.consumo} onChange={upd("consumo")} />
              <textarea className="ns-input ns-input-full" placeholder="Mensaje (opcional)" rows="3" value={form.mensaje} onChange={upd("mensaje")} />
              <button type="submit" className="ns-btn ns-btn-primary ns-btn-block">Enviar Cotización</button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

// ============== TESTIMONIALS ==============
function NSTestimonials() {
  const t = [
    { name: "María Fernanda R.", role: "Hogar — Ibarra", text: "Gracias a Norsolar redujimos nuestra planilla casi a cero. Excelente asesoría y cumplieron todo lo prometido." },
    { name: "Carlos Andrade", role: "Gerente — Comercio", text: "La instalación fue rápida y profesional. Ahora nuestra empresa tiene ahorros significativos cada mes." },
    { name: "Ing. Laura Pérez", role: "Industria — Quito", text: "Norsolar nos brindó una solución a la medida y monitoreo 24/7. Totalmente recomendados." },
    { name: "Andrés Salazar", role: "Hogar — Otavalo", text: "El equipo fue puntual, limpio y muy profesional. Ya estamos generando energía y se nota en la planilla." },
  ];
  const [active, setActive] = useStateF(0);
  useEffectF(() => {
    const id = setInterval(() => setActive(i => (i + 1) % Math.max(1, t.length - 2)), 5000);
    return () => clearInterval(id);
  }, []);
  const visible = t.slice(active, active + 3).concat(t.slice(0, Math.max(0, active + 3 - t.length))).slice(0, 3);
  return (
    <section className="ns-section ns-section-alt ns-testimonials" data-screen-label="Testimonios">
      <div className="ns-container ns-testimonials-inner">
        <div className="ns-testimonials-left">
          <span className="ns-eyebrow">TESTIMONIOS</span>
          <h2 className="ns-display-h">TU MEJOR<br/>OPCIÓN EN<br/>ENERGÍA SOLAR</h2>
          <div className="ns-stat-large">
            <div className="ns-stat-num">250+</div>
            <div className="ns-stat-lbl">Proyectos completados<br/>en todo Ecuador</div>
          </div>
          <div className="ns-stat-large">
            <div className="ns-stat-num">+90%</div>
            <div className="ns-stat-lbl">Satisfacción<br/>del cliente</div>
          </div>
          <div className="ns-stars">★ ★ ★ ★ ★</div>
        </div>
        <div className="ns-testimonials-col">
          <div className="ns-testimonials-grid">
            {visible.map(item => (
              <article key={item.name} className="ns-testimonial-card">
                <div className="ns-testimonial-head">
                  <span className="ns-quote-mark">&ldquo;</span>
                  <span className="ns-stars-sm">★★★★★</span>
                </div>
                <p>{item.text}</p>
                <div className="ns-testimonial-person">
                  <div className="ns-avatar" />
                  <div>
                    <div className="ns-tname">{item.name}</div>
                    <div className="ns-trole">{item.role}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="ns-testimonials-dots">
            {Array.from({ length: Math.max(1, t.length - 2) }).map((_, i) => (
              <button key={i} className={`ns-dot ${i === active ? "is-active" : ""}`} onClick={() => setActive(i)} aria-label={`Ir a slide ${i + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============== WHY-CHOOSE LIST ==============
function NSWhyChoose() {
  const reasons = [
    { title: "Sustentabilidad certificada", desc: "Energía limpia que reduce emisiones y cuida el planeta.", icon: "leaf",
      more: "Cada kWh solar evita ~0.5 kg de CO₂. Un sistema residencial promedio neutraliza más de 2.5 toneladas de emisiones al año." },
    { title: "Solución a largo plazo", desc: "Equipos de alta calidad con hasta 25 años de garantía.", icon: "shield",
      more: "Trabajamos con paneles tier-1 y inversores de marcas certificadas internacionalmente. Vida útil de hasta 30 años con mantenimiento mínimo." },
    { title: "Servicio al cliente excepcional", desc: "Acompañamiento antes, durante y después de su proyecto.", icon: "support",
      more: "Asesoría técnica, ingeniería personalizada, instalación certificada y monitoreo 24/7 desde su celular. Soporte directo con nuestro equipo en Ibarra." },
  ];
  const [open, setOpen] = useStateF(0);
  return (
    <section className="ns-section ns-whychoose" data-screen-label="Mejor opción">
      <div className="ns-container ns-whychoose-inner">
        <div className="ns-whychoose-left">
          <span className="ns-eyebrow">POR QUÉ ELEGIR ENERGÍA SOLAR</span>
          <h2 className="ns-display-h">TU MEJOR OPCIÓN<br/>EN ENERGÍA SOLAR</h2>
          <div className="ns-callout">
            <div className="ns-callout-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"/></svg>
            </div>
            <p>Ecuador cuenta con radiación solar privilegiada por estar en la línea ecuatorial. Aproveche ese recurso ilimitado.</p>
          </div>
        </div>
        <div className="ns-whychoose-list">
          {reasons.map((r, i) => (
            <div key={r.title} className={`ns-whychoose-row ${open === i ? "is-open" : ""}`}>
              <div className="ns-whychoose-row-head" onClick={() => setOpen(open === i ? -1 : i)}>
                <div className="ns-whychoose-icon">
                  {r.icon === "leaf" && <svg viewBox="0 0 24 24"><path d="M11 20A7 7 0 0 1 4 13c0-4 3-8 8-11 5 3 8 7 8 11a7 7 0 0 1-7 7z"/><path d="M11 20v-9"/></svg>}
                  {r.icon === "shield" && <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>}
                  {r.icon === "support" && <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9 9h.01M15 9h.01M9 15c1 1 4 1 6 0"/></svg>}
                </div>
                <div className="ns-whychoose-text">
                  <h4>{r.title}</h4>
                  <p>{r.desc}</p>
                </div>
                <button className="ns-whychoose-toggle" aria-label="Toggle">
                  <span className="ns-link">Read More</span>
                  <svg className="ns-chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                </button>
              </div>
              <div className="ns-whychoose-more">
                <p>{r.more}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { NSQuoteForm, NSTestimonials, NSWhyChoose });
