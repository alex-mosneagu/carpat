import { describe, it, expect } from 'vitest';
import { validateCUI, formatCUI, normalizeCUI } from '../cui.js';

describe('CUI Validation', () => {
  it('validates correct CUI without prefix', () => {
    const result = validateCUI('18547290');
    expect(result.valid).toBe(true);
    expect(result.formatted).toBe('RO18547290');
  });

  it('validates correct CUI with RO prefix', () => {
    const result = validateCUI('RO18547290');
    expect(result.valid).toBe(true);
    expect(result.formatted).toBe('RO18547290');
  });

  it('validates short CUI (2 digits)', () => {
    const result = validateCUI('19');
    expect(result.valid).toBe(true);
  });

  it('validates 10-digit CUI', () => {
    const result = validateCUI('1234567897');
    expect(result.valid).toBe(true);
  });

  it('handles checksum 0 (when mod 11 = 10)', () => {
    const result = validateCUI('7529700');
    expect(result.valid).toBe(true);
  });

  it('rejects CUI with invalid checksum', () => {
    const result = validateCUI('18547299');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('checksum');
  });

  it('rejects CUI with too few digits', () => {
    const result = validateCUI('1');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('2 and 10 digits');
  });

  it('rejects CUI with too many digits', () => {
    const result = validateCUI('12345678901');
    expect(result.valid).toBe(false);
  });

  it('rejects CUI with non-digits', () => {
    const result = validateCUI('1854729X');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('only digits');
  });

  it('handles lowercase ro prefix', () => {
    const result = validateCUI('ro18547290');
    expect(result.valid).toBe(true);
  });

  it('formats CUI with prefix by default', () => {
    expect(formatCUI('18547290')).toBe('RO18547290');
  });

  it('formats CUI without prefix when specified', () => {
    expect(formatCUI('RO18547290', false)).toBe('18547290');
  });

  it('normalizes CUI (removes prefix)', () => {
    expect(normalizeCUI('RO18547290')).toBe('18547290');
    expect(normalizeCUI('18547290')).toBe('18547290');
  });

  it('handles spaces in input', () => {
    const result = validateCUI('RO 18547290');
    expect(result.valid).toBe(true);
  });
});
