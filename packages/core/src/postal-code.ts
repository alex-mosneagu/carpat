import type { PostalCodeValidationResult } from './types.js';

export function validatePostalCode(code: string): PostalCodeValidationResult {
  const cleaned = code.replace(/\s/g, '');

  if (!/^\d{6}$/.test(cleaned)) {
    return { valid: false, error: 'Postal code must be 6 digits' };
  }

  const sector = parseInt(cleaned.slice(0, 1));

  if (sector < 0 || sector > 9) {
    return { valid: false, error: 'Invalid postal code sector' };
  }

  return {
    valid: true,
    sector,
  };
}

export function formatPostalCode(code: string): string {
  const cleaned = code.replace(/\s/g, '');
  if (cleaned.length !== 6) return code;
  return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
}
