import type { IBANValidationResult } from './types.js';
import { BANKS } from './data/banks.js';

export function validateIBAN(iban: string): IBANValidationResult {
  const cleaned = iban.toUpperCase().replace(/\s/g, '');

  if (!/^[A-Z]{2}\d{2}[A-Z0-9]+$/.test(cleaned)) {
    return { valid: false, error: 'Invalid IBAN format' };
  }

  const countryCode = cleaned.slice(0, 2);

  if (countryCode === 'RO' && cleaned.length !== 24) {
    return { valid: false, error: 'Romanian IBAN must be 24 characters' };
  }

  const rearranged = cleaned.slice(4) + cleaned.slice(0, 4);

  let numericString = '';
  for (const char of rearranged) {
    if (/\d/.test(char)) {
      numericString += char;
    } else {
      numericString += (char.charCodeAt(0) - 55).toString();
    }
  }

  const remainder = mod97(numericString);

  if (remainder !== 1) {
    return { valid: false, error: 'Invalid IBAN checksum' };
  }

  let bankCode: string | undefined;
  let bankName: string | undefined;

  if (countryCode === 'RO') {
    bankCode = cleaned.slice(4, 8);
    const bank = BANKS.find((b) => b.code === bankCode);
    if (bank) {
      bankName = bank.name;
    }
  }

  return {
    valid: true,
    formatted: formatIBAN(cleaned),
    bankCode,
    bankName,
  };
}

function mod97(numericString: string): number {
  let remainder = 0;
  for (let i = 0; i < numericString.length; i++) {
    remainder = (remainder * 10 + parseInt(numericString[i])) % 97;
  }
  return remainder;
}

export function formatIBAN(iban: string): string {
  const cleaned = iban.toUpperCase().replace(/\s/g, '');
  return cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
}

export function extractBankInfo(iban: string) {
  const result = validateIBAN(iban);
  if (!result.valid) return null;
  return {
    bankCode: result.bankCode,
    bankName: result.bankName,
  };
}
