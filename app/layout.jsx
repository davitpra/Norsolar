import './globals.css';

export const metadata = {
  title: 'Norsolar — Energía Solar en Ecuador',
  description: 'Expertos en soluciones fotovoltaicas para hogares, comercios e industrias en Ecuador. Ahorre hasta un 90% en su planilla eléctrica.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <a
          href="#inicio"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-ns-orange focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-display focus:font-semibold focus:text-[14px] focus:no-underline"
        >
          Saltar al contenido principal
        </a>
        {children}
      </body>
    </html>
  );
}
