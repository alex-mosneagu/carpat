import type { CUIValidationResult } from './types.js';

const CUI_WEIGHTS = [7, 5, 3, 2, 1, 7, 5, 3, 2, 1];

export function validateCUI(cui: string): CUIValidationResult {
  let cleaned = cui.toUpperCase().replace(/\s/g, '');

  const hasROPrefix = cleaned.startsWith('RO');
  if (hasROPrefix) {
    cleaned = cleaned.slice(2);
  }

  if (!/^\d+$/.test(cleaned)) {
    return { valid: false, error: 'CUI must contain only digits (optionally prefixed with RO)' };
  }

  const numericCUI = cleaned;
  if (numericCUI.length < 2 || numericCUI.length > 10) {
    return { valid: false, error: 'CUI must be between 2 and 10 digits' };
  }

  const paddedCUI = numericCUI.padStart(10, '0');
  const digits = paddedCUI.split('').map(Number);
  const checksum = digits[9];

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += digits[i] * CUI_WEIGHTS[i];
  }

  let calculatedChecksum = (sum * 10) % 11;
  if (calculatedChecksum === 10) {
    calculatedChecksum = 0;
  }

  if (calculatedChecksum !== checksum) {
    return { valid: false, error: 'Invalid checksum' };
  }

  return {
    valid: true,
    formatted: `RO${numericCUI}`,
  };
}

export function formatCUI(cui: string, includePrefix = true): string {
  const result = validateCUI(cui);
  if (!result.valid) return cui;

  let cleaned = cui.toUpperCase().replace(/\s/g, '');
  if (cleaned.startsWith('RO')) {
    cleaned = cleaned.slice(2);
  }

  return includePrefix ? `RO${cleaned}` : cleaned;
}

export function normalizeCUI(cui: string): string {
  return formatCUI(cui, false);
}
