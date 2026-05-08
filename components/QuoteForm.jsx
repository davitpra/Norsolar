'use client';

import { useState } from 'react';

export default function NSQuoteForm({ id }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    nombre: '', correo: '', telefono: '',
    ciudad: '', tipo: '', consumo: '', mensaje: '',
  });

  const upd = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = (e) => { e.preventDefault(); setSubmitted(true); };

  return (
    <section
      className="relative bg-ns-navy-deep text-white rounded-3xl mx-8 py-20 px-16 max-tablet:py-14 max-tablet:px-7 max-tablet:mx-4"
      id={id || 'cotiza'}
      data-screen-label="Cotizador"
    >
      <div className="grid grid-cols-[1fr_1.4fr] max-tablet:grid-cols-1 gap-14 items-start">

        {/* Left: info */}
        <div>
          <span className="ns-eyebrow">COTIZA TU PROYECTO</span>
          <h2
            className="font-display font-extrabold text-white tracking-[-0.015em] leading-none m-0 mt-2 mb-4"
            style={{ fontSize: 'clamp(36px, 4vw, 52px)' }}
          >
            Cotice ahora y<br />obtenga una<br />estimación<br />gratuita
          </h2>
          <div className="w-20 h-[3px] bg-ns-orange rounded-full mt-3.5 mb-[18px]" />
          <p className="font-body text-[15px] leading-[1.6] text-white/70 m-0 mb-6">
            Conecte con nuestro equipo para discutir su proyecto. Sin compromiso.
          </p>
          <a href="https://wa.me/593961234567" className="inline-flex items-center gap-3 font-body text-[14px] text-white no-underline">
            <span className="w-9 h-9 bg-[#25D366] rounded-full flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.7.9-.9 1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.2-.5 0-.2 0-.4-.1-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.4-.2.3-.9.9-.9 2.2 0 1.3 1 2.5 1.1 2.7.1.2 1.9 2.9 4.6 4 .6.3 1.1.5 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.2-.3-.3-.6-.4z" />
                <path d="M20.5 3.5C18.3 1.2 15.3 0 12.1 0 5.5 0 .2 5.4.2 12c0 2.1.5 4.2 1.6 6L0 24l6.2-1.6c1.7.9 3.7 1.4 5.7 1.4 6.6 0 11.9-5.4 11.9-11.9 0-3.2-1.2-6.2-3.3-8.4zM12.1 21.7c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.7 1 1-3.6-.2-.4c-1-1.6-1.5-3.4-1.5-5.3 0-5.5 4.5-9.9 9.9-9.9 2.6 0 5.1 1 7 2.9 1.9 1.9 2.9 4.4 2.9 7 .1 5.5-4.4 9.9-9.9 9.9z" />
              </svg>
            </span>
            o escríbanos por WhatsApp
          </a>
        </div>

        {/* Right: form */}
        <form className="flex flex-col gap-3" onSubmit={submit}>
          {submitted ? (
            <div className="bg-[rgba(34,197,94,0.08)] border border-[rgba(34,197,94,0.3)] rounded-[14px] p-8 text-center text-white">
              <div className="text-ns-success mb-3">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" />
                </svg>
              </div>
              <h3 className="font-display font-extrabold m-0 mb-2">¡Cotización recibida!</h3>
              <p className="m-0 text-white/80 font-body text-[14px]">Nuestro equipo lo contactará en menos de 24 horas, {form.nombre || 'estimado/a'}.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 max-tablet:grid-cols-1 gap-3">
                <input className="ns-input" placeholder="Nombre completo"    value={form.nombre}   onChange={upd('nombre')}   required />
                <input className="ns-input" type="email" placeholder="Correo electrónico" value={form.correo} onChange={upd('correo')} required />
                <input className="ns-input" placeholder="Teléfono"           value={form.telefono} onChange={upd('telefono')} required />
              </div>
              <div className="grid grid-cols-2 max-tablet:grid-cols-1 gap-3">
                <select className="ns-input" value={form.ciudad} onChange={upd('ciudad')} required>
                  <option value="">Ciudad</option>
                  <option>Ibarra</option><option>Quito</option><option>Guayaquil</option>
                  <option>Cuenca</option><option>Otavalo</option><option>Otra</option>
                </select>
                <select className="ns-input" value={form.tipo} onChange={upd('tipo')} required>
                  <option value="">Tipo de solución</option>
                  <option>Residencial</option><option>Comercial</option>
                  <option>Industrial</option><option>Baterías y almacenamiento</option>
                </select>
              </div>
              <input className="ns-input ns-input-full" placeholder="Consumo mensual aproximado ($)" value={form.consumo} onChange={upd('consumo')} />
              <textarea className="ns-input ns-input-full resize-y min-h-[80px]" placeholder="Mensaje (opcional)" rows="3" value={form.mensaje} onChange={upd('mensaje')} />
              <button type="submit" className="ns-btn ns-btn-primary ns-btn-block">Enviar Cotización</button>
            </>
          )}
        </form>

      </div>
    </section>
  );
}
