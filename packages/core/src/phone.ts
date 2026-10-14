import type { PhoneValidationResult } from './types.js';

const MOBILE_PREFIXES = ['07'];
const LANDLINE_PREFIXES = ['02', '03'];

export function validatePhone(phone: string): PhoneValidationResult {
  let cleaned = phone.replace(/[\s\-().]/g, '');

  if (cleaned.startsWith('+40')) {
    cleaned = '0' + cleaned.slice(3);
  } else if (cleaned.startsWith('0040')) {
    cleaned = '0' + cleaned.slice(4);
  }

  if (!/^0\d{9}$/.test(cleaned)) {
    return { valid: false, error: 'Phone number must be 10 digits starting with 0' };
  }

  const prefix = cleaned.slice(0, 2);
  let type: 'mobile' | 'landline' | undefined;

  if (MOBILE_PREFIXES.some((p) => prefix.startsWith(p))) {
    type = 'mobile';
  } else if (LANDLINE_PREFIXES.some((p) => prefix.startsWith(p))) {
    type = 'landline';
  } else {
    return { valid: false, error: 'Invalid phone prefix' };
  }

  return {
    valid: true,
    formatted: formatPhone(cleaned),
    type,
  };
}

export function formatPhone(phone: string, includeCountryCode = false): string {
  let cleaned = phone.replace(/[\s\-().]/g, '');

  if (cleaned.startsWith('+40')) {
    cleaned = '0' + cleaned.slice(3);
  } else if (cleaned.startsWith('0040')) {
    cleaned = '0' + cleaned.slice(4);
  }

  if (cleaned.length !== 10) return phone;

  const formatted = `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;

  if (includeCountryCode) {
    return `+40 ${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }

  return formatted;
}

export function normalizePhone(phone: string): string {
  let cleaned = phone.replace(/[\s\-().]/g, '');

  if (cleaned.startsWith('+40')) {
    return '0' + cleaned.slice(3);
  } else if (cleaned.startsWith('0040')) {
    return '0' + cleaned.slice(4);
  }

  return cleaned;
}
