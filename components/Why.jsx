export default function NSWhy() {
  const features = [
    { icon: 'sun',    title: 'Experiencia comprobada', body: '+250 proyectos instalados en Ecuador' },
    { icon: 'wrench', title: 'Soluciones a medida',    body: 'Residencial, comercial e industrial' },
    { icon: 'shield', title: 'Certificación y garantía', body: 'Productos con hasta 25 años de garantía' },
    { icon: 'trend',  title: 'Retorno de inversión',   body: 'Recupere su inversión en 3–4 años' },
  ];

  return (
    <section className="ns-section" id="nosotros" data-screen-label="Por qué Norsolar">
      <div className="ns-container grid grid-cols-2 max-tablet:grid-cols-1 gap-x-14 gap-y-8">

        {/* Left column: text + callout */}
        <div className="col-start-1 row-start-1 max-tablet:row-auto row-span-2 self-start">
          <span className="ns-eyebrow">POR QUÉ NORSOLAR</span>
          <h2 className="ns-display-h">¿POR QUÉ<br />NORSOLAR ES<br />DIFERENTE?</h2>
          <p className="ns-body-lg">
            Combinamos experiencia local, tecnología de clase mundial y atención
            personalizada para entregar proyectos solares que realmente generan resultados.
          </p>
          <div className="flex items-center gap-3.5 bg-white border border-[#ECEFF3] rounded-[14px] p-4 px-5 mt-1.5 shadow-[0_4px_12px_rgba(15,26,46,0.04)] max-w-[420px]">
            <div className="w-10 h-10 rounded-full bg-[rgba(242,140,40,0.12)] text-ns-orange flex items-center justify-center shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <div>
              <div className="font-display font-extrabold text-[14px] text-ns-navy mb-0.5">Regulación ARCERNNR 001/2021</div>
              <div className="font-body text-[12px] text-ns-muted leading-[1.5]">Respaldo legal para generación distribuida y autoconsumo en Ecuador.</div>
            </div>
          </div>
        </div>

        {/* Right top: image */}
        <div
          className="max-tablet:col-start-1 col-start-2 row-start-1 bg-cover bg-center rounded-2xl min-h-[380px] max-tablet:min-h-[280px] shadow-[0_12px_32px_rgba(15,26,46,0.12)]"
          style={{ backgroundImage: 'url(/assets/equipo-trabajando.jpg)' }}
        />

        {/* Right bottom: feature cards */}
        <div className="max-tablet:col-start-1 col-start-2 row-start-2 grid grid-cols-2 max-[600px]:grid-cols-1 gap-3.5">
          {features.map(f => (
            <div
              key={f.title}
              className="bg-white border border-[#ECEFF3] rounded-[14px] p-5 shadow-[0_4px_12px_rgba(15,26,46,0.04)] transition-[transform,box-shadow] duration-[220ms] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(15,26,46,0.10)]"
            >
              <div className="w-[42px] h-[42px] rounded-xl bg-ns-orange-soft text-ns-orange flex items-center justify-center mb-3.5">
                {f.icon === 'sun'    && <svg className="w-[22px] h-[22px] fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" /><path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" /></svg>}
                {f.icon === 'wrench' && <svg className="w-[22px] h-[22px] fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>}
                {f.icon === 'shield' && <svg className="w-[22px] h-[22px] fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>}
                {f.icon === 'trend'  && <svg className="w-[22px] h-[22px] fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 17l6-6 4 4 8-8" /><path d="M14 7h7v7" /></svg>}
              </div>
              <h4 className="font-display font-extrabold text-[17px] text-ns-navy m-0 mb-1.5">{f.title}</h4>
              <p className="font-body text-[13px] leading-[1.5] text-ns-muted m-0">{f.body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
