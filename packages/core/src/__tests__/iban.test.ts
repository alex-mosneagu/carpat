import { describe, it, expect } from 'vitest';
import { validateIBAN, formatIBAN, extractBankInfo } from '../iban.js';

describe('IBAN Validation', () => {
  it('validates correct Romanian IBAN', () => {
    const result = validateIBAN('RO09BCYP0000001234567890');
    expect(result.valid).toBe(true);
  });

  it('validates IBAN with spaces', () => {
    const result = validateIBAN('RO09 BCYP 0000 0012 3456 7890');
    expect(result.valid).toBe(true);
  });

  it('validates lowercase IBAN', () => {
    const result = validateIBAN('ro09bcyp0000001234567890');
    expect(result.valid).toBe(true);
  });

  it('validates BCR IBAN', () => {
    const result = validateIBAN('RO90RNCB0000000000001234');
    expect(result.valid).toBe(true);
    expect(result.bankCode).toBe('RNCB');
    expect(result.bankName).toContain('BCR');
  });

  it('validates Banca Transilvania IBAN', () => {
    const result = validateIBAN('RO84BTRL01301234567890XX');
    expect(result.valid).toBe(true);
    expect(result.bankCode).toBe('BTRL');
    expect(result.bankName).toContain('Transilvania');
  });

  it('validates ING Bank IBAN', () => {
    const result = validateIBAN('RO09INGB0000999900001234');
    expect(result.valid).toBe(true);
    expect(result.bankCode).toBe('INGB');
    expect(result.bankName).toBe('ING Bank');
  });

  it('rejects Romanian IBAN with wrong length', () => {
    const result = validateIBAN('RO90RNCB00000000000012');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('24 characters');
  });

  it('rejects IBAN with invalid checksum', () => {
    const result = validateIBAN('RO00RNCB0000000000001234');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('checksum');
  });

  it('rejects IBAN with invalid format', () => {
    const result = validateIBAN('INVALID');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('format');
  });

  it('validates non-Romanian IBAN', () => {
    const result = validateIBAN('GB82WEST12345698765432');
    expect(result.valid).toBe(true);
    expect(result.bankCode).toBeUndefined();
  });

  it('formats IBAN in groups of 4', () => {
    expect(formatIBAN('RO90RNCB0000000000001234')).toBe('RO90 RNCB 0000 0000 0000 1234');
  });

  it('extracts bank info correctly', () => {
    const info = extractBankInfo('RO90RNCB0000000000001234');
    expect(info).toBeTruthy();
    expect(info?.bankCode).toBe('RNCB');
    expect(info?.bankName).toContain('BCR');
  });

  it('returns null for invalid IBAN in extractBankInfo', () => {
    const info = extractBankInfo('INVALID');
    expect(info).toBeNull();
  });

  it('handles large mod-97 calculation correctly', () => {
    const result = validateIBAN('DE89370400440532013000');
    expect(result.valid).toBe(true);
  });
});
