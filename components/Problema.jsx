import Image from 'next/image';

const problemas = [
  {
    img: '/assets/problema/factura.png',
    alt: 'Planilla eléctrica CNEL con valor alto',
    titulo: 'Tarifas cada vez más altas',
    descripcion:
      'El aumento constante de tarifas impacta su economía familiar y la de su negocio.',
  },
  {
    img: '/assets/problema/generador.png',
    alt: 'Generador a gasolina encendido con humo',
    titulo: 'Generadores: costosos e incómodos',
    descripcion:
      'Ruidosos, contaminantes y con gastos constantes de combustible y mantenimiento.',
  },
  {
    img: '/assets/problema/noticia.png',
    alt: 'Titular de El Universo sobre apagones en Ecuador',
    titulo: 'Inestabilidad eléctrica',
    descripcion:
      'Cortes de luz inesperados que afectan su comodidad, productividad y seguridad.',
  },
];

export default function NSProblema() {
  return (
    <section className="ns-section bg-ns-bg-alt">
      <div className="ns-container">
        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <span className="ns-eyebrow">EL PROBLEMA</span>
          <h2 className="ns-display-h-md mt-4">
            Altas tarifas e inestabilidad eléctrica
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-8 tablet:grid-cols-3">
          {problemas.map(({ img, alt, titulo, descripcion }) => (
            <div
              key={titulo}
              className="overflow-hidden rounded-2xl bg-white shadow-sm border border-ns-border"
            >
              {/* Image */}
              <div className="relative aspect-4/3 w-full overflow-hidden">
                <Image
                  src={img}
                  alt={alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 960px) 100vw, 33vw"
                />
              </div>
              {/* Body */}
              <div className="p-6">
                <h3 className="font-display font-semibold text-ns-navy text-[18px] leading-snug mb-2">
                  {titulo}
                </h3>
                <p className="font-body text-ns-muted text-[15px] leading-[1.65]">
                  {descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
