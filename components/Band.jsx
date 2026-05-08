import {
  BoltIcon,
  SparklesIcon,
  ShieldExclamationIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/solid';

const items = [
  {
    icon: <BoltIcon className="w-7 h-7 text-white" />,
    title: 'Ahorra hasta 90%',
    sub: 'en tu planilla eléctrica',
  },
  {
    icon: <SparklesIcon className="w-7 h-7 text-white" />,
    title: 'Energía limpia',
    sub: 'y sostenible',
  },
  {
    icon: <ShieldExclamationIcon className="w-7 h-7 text-white" />,
    title: 'Protección ante',
    sub: 'apagones',
  },
  {
    icon: <ShieldCheckIcon className="w-7 h-7 text-white" />,
    title: 'Garantía hasta',
    sub: '25 años',
  },
];

export default function NSBand() {
  return (
    <div className="bg-ns-navy-deep">
      <div className="ns-container">
        <div className="flex items-center max-tablet:grid max-tablet:grid-cols-2 max-tablet:gap-0">
          {items.map((item, i) => (
            <div
              key={item.title}
              className={`flex-1 flex items-center gap-4 py-6 px-6
                ${i < items.length - 1
                  ? 'border-r border-white/10 max-tablet:border-r-0 max-tablet:border-b'
                  : ''
                }
                ${i === 2 ? 'max-tablet:border-r border-r-white/10' : ''}
              `}
            >
              <div className="shrink-0">{item.icon}</div>
              <div>
                <p className="font-display font-semibold text-white text-[15px] leading-tight">
                  {item.title}
                </p>
                <p className="font-body text-white/50 text-[13px] leading-snug mt-0.5">
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
