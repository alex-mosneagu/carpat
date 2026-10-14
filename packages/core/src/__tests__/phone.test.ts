import { describe, it, expect } from 'vitest';
import { validatePhone, formatPhone, normalizePhone } from '../phone.js';

describe('Phone Validation', () => {
  it('validates mobile number', () => {
    const result = validatePhone('0712345678');
    expect(result.valid).toBe(true);
    expect(result.type).toBe('mobile');
  });

  it('validates landline number (02x)', () => {
    const result = validatePhone('0212345678');
    expect(result.valid).toBe(true);
    expect(result.type).toBe('landline');
  });

  it('validates landline number (03x)', () => {
    const result = validatePhone('0312345678');
    expect(result.valid).toBe(true);
    expect(result.type).toBe('landline');
  });

  it('handles +40 prefix', () => {
    const result = validatePhone('+40712345678');
    expect(result.valid).toBe(true);
    expect(result.type).toBe('mobile');
  });

  it('handles 0040 prefix', () => {
    const result = validatePhone('0040712345678');
    expect(result.valid).toBe(true);
  });

  it('handles spaces and dashes', () => {
    const result = validatePhone('0712-345-678');
    expect(result.valid).toBe(true);
  });

  it('handles parentheses', () => {
    const result = validatePhone('(0712) 345 678');
    expect(result.valid).toBe(true);
  });

  it('rejects phone with wrong length', () => {
    const result = validatePhone('071234567');
    expect(result.valid).toBe(false);
  });

  it('rejects phone not starting with 0', () => {
    const result = validatePhone('1712345678');
    expect(result.valid).toBe(false);
  });

  it('rejects phone with invalid prefix', () => {
    const result = validatePhone('0112345678');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('prefix');
  });

  it('formats phone without country code', () => {
    expect(formatPhone('0712345678')).toBe('0712 345 678');
  });

  it('formats phone with country code', () => {
    expect(formatPhone('0712345678', true)).toBe('+40 712 345 678');
  });

  it('normalizes phone to 10-digit format', () => {
    expect(normalizePhone('+40712345678')).toBe('0712345678');
    expect(normalizePhone('0040712345678')).toBe('0712345678');
    expect(normalizePhone('0712-345-678')).toBe('0712345678');
  });

  it('validates all 07x mobile prefixes', () => {
    for (let i = 0; i <= 9; i++) {
      const result = validatePhone(`07${i}2345678`);
      expect(result.valid).toBe(true);
      expect(result.type).toBe('mobile');
    }
  });

  it('validates landline prefixes 021-031', () => {
    for (let i = 21; i <= 31; i++) {
      if (i > 21 && i < 30) continue;
      const result = validatePhone(`0${i}2345678`);
      expect(result.valid).toBe(true);
      expect(result.type).toBe('landline');
    }
  });
});
