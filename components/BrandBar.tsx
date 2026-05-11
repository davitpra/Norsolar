interface Brand {
  name: string;
  style?: React.CSSProperties;
}

const brands: Brand[] = [
  { name: "Trinasolar" },
  { name: "ECOFLOW", style: { letterSpacing: "0.18em" } },
  { name: "K2 Systems", style: { fontStyle: "italic" } },
  { name: "BLOCKSOLAR", style: { letterSpacing: "0.04em" } },
  { name: "UNIRAC", style: { letterSpacing: "0.06em" } },
];

const track = [...brands, ...brands];

export default function NSBrandBar() {
  return (
    <section className="py-10 pb-10 bg-ns-bg-alt overflow-hidden">
      <div className="ns-container mb-8">
        <span className="ns-eyebrow">
          TRABAJAMOS CON LAS MEJORES MARCAS DEL MERCADO
        </span>
      </div>

      <div
        className="relative group "
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div
          className="flex w-max group-hover:[animation-play-state:paused]"
          style={{ animation: "nsMarquee 26s linear infinite" }}
        >
          {track.map((b, i) => (
            <div key={i} className="flex items-center shrink-0">
              <span
                className="font-display font-extrabold text-[22px] text-ns-navy/40 hover:text-ns-navy transition-colors duration-300 cursor-default select-none px-10"
                style={b.style}
              >
                {b.name}
              </span>
              <span className="text-ns-orange/30 text-[8px] shrink-0">◆</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
