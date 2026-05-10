'use client';

import { useState } from 'react';
import { BoltIcon, SunIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';
import type { ComponentType, SVGProps } from 'react';
import type { CustomerType } from '@/lib/solar/types';

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
}

interface QuoteFormProps {
  id?: string;
  calculationId?: string;
  prefill?: {
    ciudad?: string;
    tipo?: CustomerType;
    consumo?: number;
  };
  // Legacy prop kept for Solution.tsx compatibility
  onCalculate?: (value: number) => void;
}

export default function NSQuoteForm({ id, calculationId, prefill }: QuoteFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({
    nombre: '',
    telefono: '',
    correo: '',
    ciudad: prefill?.ciudad ?? '',
    tipo: prefill?.tipo ?? '',
  });

  const upd = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          contact_name: form.nombre,
          email: form.correo,
          phone: form.telefono || undefined,
          city: form.ciudad || 'Ibarra',
          customer_type: (form.tipo.toLowerCase() as CustomerType) || 'residencial',
          monthly_consumption_kwh: prefill?.consumo,
          source: 'landing',
          calculation_id: calculationId,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
      setLeadId(data.id);
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Error al enviar');
    } finally {
      setSubmitting(false);
    }
  };

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
              No espere al<br />próximo apagón
            </h2>
            <p className="font-body text-[16px] leading-[1.65] text-white/70 m-0 mb-8 max-w-[440px]">
              Da el primer paso hacia la independencia energética. Calcule su ahorro y reciba su propuesta personalizada.
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
                <h3 className="font-display font-extrabold text-ns-navy m-0 mb-2 text-[20px]">¡Solicitud recibida!</h3>
                <p className="font-body text-ns-muted text-[14px] m-0 mb-3">
                  Nuestro equipo le contactará en menos de 48 horas, {form.nombre || 'estimado/a'}.
                </p>
                {leadId && (
                  <p className="font-body text-ns-muted text-[11px] m-0">
                    Referencia:{' '}
                    <span className="font-mono text-ns-navy">{leadId.slice(0, 8).toUpperCase()}</span>
                  </p>
                )}
              </div>
            ) : (
              <>
                <p className="font-display font-extrabold text-ns-navy text-[18px] m-0 mb-5 leading-snug">
                  Reciba su cotización gratuita
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
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="q-ciudad" className="sr-only">Ciudad</label>
                      <select id="q-ciudad" className="ns-input w-full" value={form.ciudad} onChange={upd('ciudad')} required>
                        <option value="">Ciudad</option>
                        <option>Ibarra</option><option>Quito</option><option>Guayaquil</option>
                        <option>Cuenca</option><option>Ambato</option><option>Manta</option>
                        <option>Loja</option><option>Riobamba</option><option>Otra</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="q-tipo" className="sr-only">Tipo de solución</label>
                      <select id="q-tipo" className="ns-input w-full" value={form.tipo} onChange={upd('tipo')} required>
                        <option value="">Solución</option>
                        <option>Residencial</option><option>Comercial</option>
                        <option>Industrial</option>
                      </select>
                    </div>
                  </div>
                  {submitError && (
                    <p className="font-body text-red-500 text-[12px] m-0">{submitError}</p>
                  )}
                  <button
                    type="submit"
                    className="ns-btn ns-btn-primary ns-btn-block mt-1"
                    disabled={submitting}
                  >
                    {submitting ? 'Enviando…' : 'Quiero mi cotización gratuita'}
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
