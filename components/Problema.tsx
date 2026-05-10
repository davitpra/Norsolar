import Image from 'next/image';

interface Problema {
  img: string;
  alt: string;
  titulo: string;
  descripcion: string;
}

const problemas: Problema[] = [
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
        <div className="mb-12">
          <span className="ns-eyebrow">EL PROBLEMA</span>
          <h2 className="ns-display-h-md mt-4">
            inestabilidad eléctrica y costos crecientes
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 tablet:grid-cols-3">
          {problemas.map(({ img, alt, titulo, descripcion }) => (
            <div
              key={titulo}
              className="overflow-hidden rounded-2xl bg-white shadow-sm border border-ns-border"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden">
                <Image
                  src={img}
                  alt={alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 960px) 100vw, 33vw"
                />
              </div>
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
