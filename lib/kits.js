export const TARIFAS = {
  residencial: { min: 0.09, max: 0.11 },
  comercial:   { min: 0.10, max: 0.13 },
  industrial:  { min: 0.08, max: 0.12 },
};

// Kits estándar (excluye híbrido para recomendación automática)
export const KITS = [
  {
    id: 'k150',
    nombre: 'Kit 150 kWh/mes',
    consumo: 150,
    potencia: 1.25,
    precio: 1500,
    paneles: '2× Panel 660W',
    inversor: 'Inversor 1.5 kW',
    bateria: null,
    produccion: 150,
    ahorroMin: 14,
    ahorroMax: 17,
  },
  {
    id: 'k345',
    nombre: 'Kit 345 kWh/mes',
    consumo: 345,
    potencia: 2.9,
    precio: 3500,
    paneles: '5× Panel 660W',
    inversor: 'Inversor 3 kW',
    bateria: null,
    produccion: 345,
    ahorroMin: 31,
    ahorroMax: 45,
  },
  {
    id: 'k576',
    nombre: 'Kit 576 kWh/mes',
    consumo: 576,
    potencia: 4.8,
    precio: 5800,
    paneles: '8× Panel 660W',
    inversor: 'Inversor 5 kW',
    bateria: null,
    produccion: 576,
    ahorroMin: 52,
    ahorroMax: 75,
  },
  {
    id: 'k806',
    nombre: 'Kit 806 kWh/mes',
    consumo: 806,
    potencia: 6.7,
    precio: 8100,
    paneles: '11× Panel 660W',
    inversor: 'Inversor 6 kW',
    bateria: null,
    produccion: 806,
    ahorroMin: 72,
    ahorroMax: 105,
  },
  {
    id: 'k1152',
    nombre: 'Kit 1152 kWh/mes',
    consumo: 1152,
    potencia: 9.6,
    precio: 11500,
    paneles: '15× Panel 660W',
    inversor: 'Inversor 10 kW',
    bateria: null,
    produccion: 1152,
    ahorroMin: 104,
    ahorroMax: 150,
  },
  {
    id: 'hibrido',
    nombre: 'Kit Híbrido',
    consumo: 576,
    potencia: 4.8,
    precio: 8500,
    paneles: '8× Panel 660W',
    inversor: 'Inversor Híbrido 5 kW',
    bateria: 'Batería 5 kWh',
    produccion: 576,
    ahorroMin: 52,
    ahorroMax: 75,
  },
];

const STANDARD_KITS = KITS.filter((k) => k.id !== 'hibrido');

export function recommendKit(consumoUsuario) {
  const match = STANDARD_KITS.find((k) => k.consumo >= consumoUsuario);
  return match ?? STANDARD_KITS[STANDARD_KITS.length - 1];
}

export function computeSavingsProjection({ consumo, tipo, kit, tariff }) {
  const tarifa = TARIFAS[tipo] ?? TARIFAS.residencial;
  const tarifaPromedio = tariff != null ? tariff : (tarifa.min + tarifa.max) / 2;
  const tariffMin = tariff != null ? tariff : tarifa.min;
  const tariffMax = tariff != null ? tariff : tarifa.max;
  const produccionEfectiva = Math.min(kit.produccion, consumo);
  const monthlySavings = produccionEfectiva * tarifaPromedio;

  const yearlyData = [];
  let acumulado = 0;
  let roiYears = null;

  for (let y = 1; y <= 25; y++) {
    const inflacion = Math.pow(1.03, y - 1);
    const degradacion = 1 - 0.005 * (y - 1);
    const ahorroAnual = monthlySavings * 12 * inflacion * degradacion;
    const prevAcumulado = acumulado;
    acumulado += ahorroAnual;

    if (roiYears === null && acumulado >= kit.precio) {
      // interpolate to find exact fractional year
      const fraccion = (kit.precio - prevAcumulado) / (acumulado - prevAcumulado);
      roiYears = parseFloat((y - 1 + fraccion).toFixed(1));
    }

    yearlyData.push({ year: y, ahorroAnual: Math.round(ahorroAnual), acumulado: Math.round(acumulado) });
  }

  return {
    monthlySavings: Math.round(monthlySavings),
    monthlyRange: {
      min: Math.round(consumo * tariffMin),
      max: Math.round(consumo * tariffMax),
    },
    yearlyData,
    roiYears,
    totalSavings25y: Math.round(acumulado),
  };
}
