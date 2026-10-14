import type { IDCardValidationResult } from './types.js';

/** Official / commonly issued Romanian CI series (județe, București, temporary). */
export const ID_CARD_SERIES = [
  'AB',
  'AR',
  'AG',
  'BC',
  'BH',
  'BN',
  'BR',
  'BT',
  'BV',
  'BZ',
  'CJ',
  'CL',
  'CS',
  'CT',
  'CV',
  'DB',
  'DJ',
  'GJ',
  'GL',
  'GR',
  'HD',
  'HR',
  'IF',
  'IL',
  'IS',
  'MH',
  'MM',
  'MS',
  'NT',
  'OT',
  'PH',
  'SB',
  'SJ',
  'SM',
  'SV',
  'TL',
  'TM',
  'TR',
  'VL',
  'VN',
  'VS',
  // București
  'RD',
  'DP',
  'DR',
  'DT',
  'DX',
  // Temporary / special
  'RX',
  'RT',
  'RR',
  'RL',
  'RK',
  'RZ',
] as const;

export type IDCardSeries = (typeof ID_CARD_SERIES)[number];

export function validateIDCard(series: string, number: string): IDCardValidationResult {
  const cleanedSeries = series.toUpperCase().trim();
  const cleanedNumber = number.replace(/\s/g, '');

  if (!(ID_CARD_SERIES as readonly string[]).includes(cleanedSeries)) {
    return { valid: false, error: 'Invalid ID card series' };
  }

  if (!/^\d{6}$/.test(cleanedNumber)) {
    return { valid: false, error: 'ID card number must be 6 digits' };
  }

  return {
    valid: true,
    series: cleanedSeries,
    number: cleanedNumber,
  };
}

export function formatIDCard(series: string, number: string): string {
  const result = validateIDCard(series, number);
  if (!result.valid) return `${series} ${number}`;
  return `${result.series} ${result.number}`;
}

export function parseIDCard(combined: string): { series: string; number: string } | null {
  const match = combined.match(/^([A-Z]{2})\s*(\d{6})$/i);
  if (!match) return null;
  return {
    series: match[1].toUpperCase(),
    number: match[2],
  };
}
