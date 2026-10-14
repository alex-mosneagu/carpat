import type { CNPValidationResult } from './types.js';
import { COUNTIES } from './data/counties.js';
import { invalid } from './messages.js';

const CNP_WEIGHTS = [2, 7, 9, 1, 4, 6, 3, 5, 8, 2, 7, 9];

function centuryForResidentOrForeign(year: number): number {
  return year < 50 ? 2000 + year : 1900 + year;
}

function sexFromDigit(sex: number): 'M' | 'F' | null {
  if (sex === 9) return null; // foreign citizen — sex not encoded
  return sex % 2 === 1 ? 'M' : 'F';
}

export function validateCNP(cnp: string): CNPValidationResult {
  const cleaned = cnp.replace(/\s/g, '');

  if (!/^\d{13}$/.test(cleaned)) {
    return invalid('cnp.length');
  }

  const digits = cleaned.split('').map(Number);
  const sex = digits[0];
  const year = digits[1] * 10 + digits[2];
  const month = digits[3] * 10 + digits[4];
  const day = digits[5] * 10 + digits[6];
  const countyCode = String(digits[7] * 10 + digits[8]).padStart(2, '0');
  const checksum = digits[12];

  if (sex < 1 || sex > 9) {
    return invalid('cnp.sex');
  }

  let fullYear: number;
  if (sex === 1 || sex === 2) {
    fullYear = 1900 + year;
  } else if (sex === 3 || sex === 4) {
    fullYear = 1800 + year;
  } else if (sex === 5 || sex === 6) {
    fullYear = 2000 + year;
  } else {
    // 7/8 residents, 9 foreign citizens
    fullYear = centuryForResidentOrForeign(year);
  }

  if (month < 1 || month > 12) {
    return invalid('cnp.month');
  }

  const daysInMonth = new Date(fullYear, month, 0).getDate();
  if (day < 1 || day > daysInMonth) {
    return invalid('cnp.day');
  }

  const birthDate = new Date(fullYear, month - 1, day);
  if (birthDate.getTime() > Date.now()) {
    return invalid('cnp.future');
  }

  const countyData = COUNTIES.find((c) => c.code === countyCode);
  if (!countyData) {
    return invalid('cnp.county');
  }

  let calculatedChecksum = 0;
  for (let i = 0; i < 12; i++) {
    calculatedChecksum += digits[i] * CNP_WEIGHTS[i];
  }
  calculatedChecksum = calculatedChecksum % 11;
  if (calculatedChecksum === 10) {
    calculatedChecksum = 1;
  }

  if (calculatedChecksum !== checksum) {
    return invalid('cnp.checksum');
  }

  return {
    valid: true,
    data: {
      sex: sexFromDigit(sex),
      birthDate,
      county: countyData.name,
      countyCode,
    },
  };
}

export function extractCNPData(cnp: string) {
  const result = validateCNP(cnp);
  return result.valid ? result.data : null;
}

export function formatCNP(cnp: string): string {
  const cleaned = cnp.replace(/\s/g, '');
  if (cleaned.length !== 13) return cnp;
  return `${cleaned.slice(0, 1)} ${cleaned.slice(1, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 7)} ${cleaned.slice(7, 9)} ${cleaned.slice(9, 12)} ${cleaned.slice(12)}`;
}
