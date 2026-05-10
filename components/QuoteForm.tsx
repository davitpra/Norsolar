'use client';

import { useState } from 'react';
import { BoltIcon, SunIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';
import type { ComponentType, SVGProps } from 'react';

interface Badge {
  Icon: ComponentType<SVGProps<SVGSVGElement> & { className?: string }>;
  label: string;
}

const BADGES: Badge[] = [
  { Icon: BoltIcon,        label: 'Ahorra ahora' },
  { Icon: SunIcon,         label: 'Energía limpia' },
  { Icon: ShieldCheckIcon, label: 'Protección solar' },
];

interface FormState {
  nombre: string;
  telefono: string;
  correo: string;
  ciudad: string;
  tipo: string;
  factura: string;
}

interface QuoteFormProps {
  id?: string;
  onCalculate?: (value: number) => void;
}

export default function NSQuoteForm({ id, onCalculate }: QuoteFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>({
    nombre: '', telefono: '', correo: '', ciudad: '', tipo: '', factura: '',
  });

  const upd = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const updFactura = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setForm((f) => ({ ...f, factura: v }));
    const parsed = Number(v);
    if (!Number.isNaN(parsed) && parsed > 0) onCalculate?.(parsed);
  };

  const submit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <section
      id={id || 'cotiza'}
      data-screen-label="Cotizador"
      className="relative overflow-hidden"
      style={{ minHeight: 520 }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/hero-paneles.jpg')" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(95deg, rgba(15,26,46,0.92) 0%, rgba(15,26,46,0.75) 55%, rgba(15,26,46,0.45) 100%)',
        }}
      />

      <div className="relative ns-container py-20 max-tablet:py-14">
        <div className="grid grid-cols-[1fr_420px] max-tablet:grid-cols-1 gap-14 items-center">

          <div>
            <span className="ns-eyebrow">NO TE QUEDES SIN ENERGÍA</span>
            <h2
              className="font-display font-extrabold text-white tracking-[-0.02em] leading-none m-0 mt-3 mb-5"
              style={{ fontSize: 'clamp(36px, 4.5vw, 60px)' }}
            >
              No esperes al<br />próximo apagón
            </h2>
            <p className="font-body text-[16px] leading-[1.65] text-white/70 m-0 mb-8 max-w-[440px]">
              Da el primer paso hacia la independencia energética. Calcula tu ahorro y recibe tu propuesta personalizada.
            </p>

            <div className="flex flex-wrap gap-3">
              {BADGES.map(({ Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-body text-[13px] font-semibold text-white border border-white/20 bg-white/10 backdrop-blur-sm"
                >
                  <Icon className="w-4 h-4 text-ns-orange" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-7 max-tablet:p-5">
            {submitted ? (
              <div className="text-center py-8">
                <div className="text-ns-success mb-3 flex justify-center">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" />
                  </svg>
                </div>
                <h3 className="font-display font-extrabold text-ns-navy m-0 mb-2 text-[20px]">¡Cotización recibida!</h3>
                <p className="font-body text-ns-muted text-[14px] m-0">
                  Nuestro equipo lo contactará en menos de 24 horas, {form.nombre || 'estimado/a'}.
                </p>
              </div>
            ) : (
              <>
                <p className="font-display font-extrabold text-ns-navy text-[18px] m-0 mb-5 leading-snug">
                  Recibe tu cotización gratuita
                </p>
                <form className="flex flex-col gap-3" onSubmit={submit}>
                  <input
                    className="ns-input"
                    placeholder="Nombre completo"
                    value={form.nombre}
                    onChange={upd('nombre')}
                    required
                  />
                  <input
                    className="ns-input"
                    placeholder="Teléfono / WhatsApp"
                    value={form.telefono}
                    onChange={upd('telefono')}
                    required
                  />
                  <input
                    className="ns-input"
                    type="email"
                    placeholder="Correo electrónico"
                    value={form.correo}
                    onChange={upd('correo')}
                    required
                  />
                  <input
                    className="ns-input"
                    type="number"
                    inputMode="decimal"
                    placeholder="Factura mensual actual ($)"
                    value={form.factura}
                    onChange={updFactura}
                    min="0"
                    step="1"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="q-ciudad" className="sr-only">Ciudad</label>
                      <select id="q-ciudad" className="ns-input w-full" value={form.ciudad} onChange={upd('ciudad')} required>
                        <option value="">Ciudad</option>
                        <option>Ibarra</option><option>Quito</option><option>Guayaquil</option>
                        <option>Cuenca</option><option>Otavalo</option><option>Otra</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="q-tipo" className="sr-only">Tipo de solución</label>
                      <select id="q-tipo" className="ns-input w-full" value={form.tipo} onChange={upd('tipo')} required>
                        <option value="">Solución</option>
                        <option>Residencial</option><option>Comercial</option>
                        <option>Industrial</option><option>Baterías</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="ns-btn ns-btn-primary ns-btn-block mt-1">
                    Quiero mi cotización gratuita
                  </button>
                  <p className="font-body text-ns-muted text-[11px] text-center m-0 leading-snug">
                    Sin compromiso. Sus datos están protegidos y no serán compartidos.
                  </p>
                </form>
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
