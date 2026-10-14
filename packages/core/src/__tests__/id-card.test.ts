import { describe, it, expect } from 'vitest';
import { validateIDCard, formatIDCard, parseIDCard } from '../id-card.js';

describe('ID Card Validation', () => {
  it('validates correct ID card', () => {
    const result = validateIDCard('AB', '123456');
    expect(result.valid).toBe(true);
    expect(result.series).toBe('AB');
    expect(result.number).toBe('123456');
  });

  it('validates all valid series', () => {
    const validSeries = ['AB', 'AR', 'CJ', 'CT', 'IF', 'PH', 'RX'];
    validSeries.forEach((series) => {
      const result = validateIDCard(series, '123456');
      expect(result.valid).toBe(true);
    });
  });

  it('handles lowercase series', () => {
    const result = validateIDCard('ab', '123456');
    expect(result.valid).toBe(true);
    expect(result.series).toBe('AB');
  });

  it('rejects invalid series', () => {
    const result = validateIDCard('XX', '123456');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('series');
  });

  it('rejects number with wrong length', () => {
    const result = validateIDCard('AB', '12345');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('6 digits');
  });

  it('rejects number with letters', () => {
    const result = validateIDCard('AB', '12345X');
    expect(result.valid).toBe(false);
  });

  it('handles spaces in number', () => {
    const result = validateIDCard('AB', '123 456');
    expect(result.valid).toBe(true);
  });

  it('formats ID card correctly', () => {
    expect(formatIDCard('AB', '123456')).toBe('AB 123456');
  });

  it('parses combined ID card', () => {
    const parsed = parseIDCard('AB123456');
    expect(parsed).toEqual({ series: 'AB', number: '123456' });
  });

  it('parses ID card with space', () => {
    const parsed = parseIDCard('AB 123456');
    expect(parsed).toEqual({ series: 'AB', number: '123456' });
  });

  it('parses lowercase ID card', () => {
    const parsed = parseIDCard('ab123456');
    expect(parsed).toEqual({ series: 'AB', number: '123456' });
  });

  it('returns null for invalid format', () => {
    expect(parseIDCard('INVALID')).toBeNull();
    expect(parseIDCard('A123456')).toBeNull();
    expect(parseIDCard('ABC123456')).toBeNull();
  });

  it('validates temporary resident series (RX, RT, RR, RL, RK, RZ)', () => {
    const tempSeries = ['RX', 'RT', 'RR', 'RL', 'RK', 'RZ'];
    tempSeries.forEach((series) => {
      const result = validateIDCard(series, '123456');
      expect(result.valid).toBe(true);
    });
  });
});
