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
      <body>{children}</body>
    </html>
  );
}
