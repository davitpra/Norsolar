export default function NSBrandBar() {
  const brands = [
    { name: 'Trinasolar', cls: 'lowercase' },
    { name: 'ECOFLOW',    cls: 'tracking-[0.18em] uppercase text-[18px]' },
    { name: 'K2 Systems', cls: 'lowercase italic' },
    { name: 'BLOCKSOLAR', cls: 'tracking-[0.04em] uppercase text-[18px]' },
    { name: 'UNIRAC',     cls: 'tracking-[0.06em] uppercase text-[20px]' },
  ];

  return (
    <section className="py-14 pb-16 bg-ns-bg-alt">
      <div className="ns-container">
        <span className="ns-eyebrow">TRABAJAMOS CON LAS MEJORES MARCAS DEL MERCADO</span>
        <div className="grid grid-cols-5 max-tablet:grid-cols-3 max-[600px]:grid-cols-2 gap-8 items-center mt-7 opacity-75">
          {brands.map((b, i) => (
            <div
              key={b.name}
              className={`font-display font-extrabold text-[22px] text-ns-navy tracking-[-0.01em] text-center grayscale hover:grayscale-0 hover:opacity-100 transition-[filter,opacity] duration-[240ms] relative ${b.cls}${
                i < brands.length - 1
                  ? " after:content-[''] after:absolute after:right-[-16px] after:top-1/4 after:h-1/2 after:w-px after:bg-[rgba(15,26,46,0.10)]"
                  : ''
              }`}
            >
              {b.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
