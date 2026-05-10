interface ProjectItem {
  title: string;
  desc: string;
  img: string;
}

export default function NSProjects() {
  const items: ProjectItem[] = [
    { title: 'Energía limpia para el hogar',  desc: 'Sistemas residenciales que reducen su planilla eléctrica y le dan independencia.',  img: '/assets/instalacion-panel-2.jpg' },
    { title: 'Sustentabilidad empresarial',   desc: 'Soluciones solares para comercios y empresas que buscan eficiencia y ahorro.',      img: '/assets/instalacion-panel-3.jpg' },
    { title: 'Energía solar para todos',      desc: 'Proyectos industriales e institucionales que impulsan un Ecuador más sostenible.',  img: '/assets/instalacion-panel-1.jpg' },
  ];

  return (
    <section className="ns-section" id="proyectos" data-screen-label="Proyectos">
      <div className="ns-container">
        <span className="ns-eyebrow">NUESTROS PROYECTOS</span>
        <h2 className="ns-display-h-md">PROYECTOS</h2>
        <div className="grid grid-cols-3 max-tablet:grid-cols-2 max-[600px]:grid-cols-1 gap-7 mt-8">
          {items.map(p => (
            <article key={p.title} className="group flex flex-col gap-3">
              <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${p.img})` }}
                />
              </div>
              <h3 className="font-display font-extrabold text-[22px] text-ns-navy m-0 mt-1">{p.title}</h3>
              <p className="font-body text-[14px] leading-[1.55] text-ns-muted m-0">{p.desc}</p>
              <a href="#cotiza" className="ns-link">Ver más →</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
