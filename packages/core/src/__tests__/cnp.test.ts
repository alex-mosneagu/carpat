import { describe, it, expect } from 'vitest';
import { validateCNP, extractCNPData, formatCNP } from '../cnp.js';

describe('CNP Validation', () => {
  it('validates correct male CNP from 1999', () => {
    const result = validateCNP('1990101010058');
    expect(result.valid).toBe(true);
    expect(result.data?.sex).toBe('M');
    expect(result.data?.county).toBe('Alba');
    expect(result.data?.countyCode).toBe('01');
  });

  it('validates correct female CNP from 2005', () => {
    const result = validateCNP('6050623010051');
    expect(result.valid).toBe(true);
    expect(result.data?.sex).toBe('F');
  });

  it('validates CNP with checksum 1 (when mod 11 = 10)', () => {
    const result = validateCNP('2000101010059');
    expect(result.valid).toBe(true);
  });

  it('rejects CNP with invalid length', () => {
    const result = validateCNP('123456789');
    expect(result.valid).toBe(false);
    expect(result.errorCode).toBe('cnp.length');
    expect(result.error).toContain('13 digits');
  });

  it('rejects CNP with non-digits', () => {
    const result = validateCNP('199010112345X');
    expect(result.valid).toBe(false);
  });

  it('rejects CNP with invalid sex digit', () => {
    const result = validateCNP('0990101123456');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('sex');
  });

  it('rejects CNP with invalid month', () => {
    const result = validateCNP('1991301123456');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('month');
  });

  it('rejects CNP with invalid day', () => {
    const result = validateCNP('1990132123456');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('day');
  });

  it('rejects CNP with invalid checksum', () => {
    const result = validateCNP('1990101010059');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('checksum');
  });

  it('rejects CNP with future birth date', () => {
    const futureYear = new Date().getFullYear() + 1;
    const futureYearShort = String(futureYear).slice(-2);
    const result = validateCNP(`5${futureYearShort}0101234567`);
    expect(result.valid).toBe(false);
  });

  it('handles leap year dates correctly', () => {
    const result = validateCNP('5000229010050');
    expect(result.valid).toBe(true);
    expect(result.data?.birthDate.getMonth()).toBe(1);
    expect(result.data?.birthDate.getDate()).toBe(29);
  });

  it('validates București counties (40-46, 52)', () => {
    const result = validateCNP('1990101400059');
    expect(result.valid).toBe(true);
  });

  it('extracts CNP data correctly', () => {
    const data = extractCNPData('1990101010058');
    expect(data).toBeTruthy();
    expect(data?.sex).toBe('M');
    expect(data?.birthDate).toBeInstanceOf(Date);
  });

  it('returns null for invalid CNP in extractCNPData', () => {
    const data = extractCNPData('invalid');
    expect(data).toBeNull();
  });

  it('formats CNP correctly', () => {
    expect(formatCNP('1990101010058')).toBe('1 99 01 01 01 005 8');
  });

  it('handles spaces in input', () => {
    const result = validateCNP('1 99 01 01 01 005 8');
    expect(result.valid).toBe(true);
  });
});
