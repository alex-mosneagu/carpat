import { describe, it, expect } from 'vitest';
import { validatePostalCode, formatPostalCode } from '../postal-code.js';

describe('Postal Code Validation', () => {
  it('validates correct postal code', () => {
    const result = validatePostalCode('010001');
    expect(result.valid).toBe(true);
    expect(result.sector).toBe(0);
  });

  it('validates postal code with sector 1-6', () => {
    for (let i = 1; i <= 6; i++) {
      const result = validatePostalCode(`${i}10001`);
      expect(result.valid).toBe(true);
      expect(result.sector).toBe(i);
    }
  });

  it('rejects postal code with wrong length', () => {
    const result = validatePostalCode('12345');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('6 digits');
  });

  it('rejects postal code with letters', () => {
    const result = validatePostalCode('01000X');
    expect(result.valid).toBe(false);
  });

  it('handles spaces in input', () => {
    const result = validatePostalCode('010 001');
    expect(result.valid).toBe(true);
  });

  it('formats postal code', () => {
    expect(formatPostalCode('010001')).toBe('010 001');
  });

  it('returns original if invalid length', () => {
    expect(formatPostalCode('12345')).toBe('12345');
  });

  it('validates all sector numbers 0-9', () => {
    for (let i = 0; i <= 9; i++) {
      const result = validatePostalCode(`${i}10001`);
      expect(result.valid).toBe(true);
      expect(result.sector).toBe(i);
    }
  });
});
