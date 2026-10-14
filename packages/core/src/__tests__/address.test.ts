import { describe, it, expect } from 'vitest';
import { normalizeStreetType, normalizeAddress, parseAddress } from '../address.js';

describe('Address Normalization', () => {
  it('normalizes street abbreviation', () => {
    expect(normalizeStreetType('str Mihai Eminescu')).toBe('Strada Mihai Eminescu');
    expect(normalizeStreetType('str. Mihai Eminescu')).toBe('Strada Mihai Eminescu');
    expect(normalizeStreetType('strada Mihai Eminescu')).toBe('Strada Mihai Eminescu');
  });

  it('normalizes boulevard abbreviations', () => {
    expect(normalizeStreetType('bd Unirii')).toBe('Bulevardul Unirii');
    expect(normalizeStreetType('bd. Unirii')).toBe('Bulevardul Unirii');
    expect(normalizeStreetType('bld Unirii')).toBe('Bulevardul Unirii');
    expect(normalizeStreetType('bulevard Unirii')).toBe('Bulevardul Unirii');
  });

  it('normalizes alley', () => {
    expect(normalizeStreetType('al Parcului')).toBe('Aleea Parcului');
    expect(normalizeStreetType('aleea Parcului')).toBe('Aleea Parcului');
  });

  it('normalizes splaiul', () => {
    expect(normalizeStreetType('spl Independentei')).toBe('Splaiul Independentei');
    expect(normalizeStreetType('splaiul Independentei')).toBe('Splaiul Independentei');
  });

  it('normalizes piata', () => {
    expect(normalizeStreetType('pta Unirii')).toBe('Piața Unirii');
    expect(normalizeStreetType('piata Unirii')).toBe('Piața Unirii');
  });

  it('normalizes calea', () => {
    expect(normalizeStreetType('cal Victoriei')).toBe('Calea Victoriei');
    expect(normalizeStreetType('calea Victoriei')).toBe('Calea Victoriei');
  });

  it('normalizes soseaua', () => {
    expect(normalizeStreetType('sos Colentina')).toBe('Șoseaua Colentina');
    expect(normalizeStreetType('șos Colentina')).toBe('Șoseaua Colentina');
  });

  it('handles addresses with no street type', () => {
    expect(normalizeStreetType('Mihai Eminescu')).toBe('Mihai Eminescu');
  });

  it('normalizes full address', () => {
    const normalized = normalizeAddress('str. Mihai Eminescu, nr. 10, bl. A1');
    expect(normalized).toContain('Strada Mihai Eminescu');
  });

  it('parses address with street number', () => {
    const parsed = parseAddress('Strada Mihai Eminescu, nr. 10');
    expect(parsed.streetType).toBe('Strada');
    expect(parsed.streetName).toBe('Mihai Eminescu');
    expect(parsed.number).toBe('10');
  });

  it('parses address with building', () => {
    const parsed = parseAddress('Strada Mihai Eminescu, nr. 10, bl. A1');
    expect(parsed.number).toBe('10');
    expect(parsed.building).toBe('A1');
  });

  it('parses address with stair', () => {
    const parsed = parseAddress('Strada Mihai Eminescu, nr. 10, bl. A1, sc. B');
    expect(parsed.stair).toBe('B');
  });

  it('parses address with apartment', () => {
    const parsed = parseAddress('Strada Mihai Eminescu, nr. 10, bl. A1, sc. B, ap. 15');
    expect(parsed.apartment).toBe('15');
  });

  it('parses complete address', () => {
    const parsed = parseAddress('Strada Mihai Eminescu, nr. 10, bl. A1, sc. B, ap. 15');
    expect(parsed.streetType).toBe('Strada');
    expect(parsed.streetName).toBe('Mihai Eminescu');
    expect(parsed.number).toBe('10');
    expect(parsed.building).toBe('A1');
    expect(parsed.stair).toBe('B');
    expect(parsed.apartment).toBe('15');
  });

  it('handles alternative abbreviations', () => {
    const parsed = parseAddress('str Mihai Eminescu, numărul 10, bloc A1, scara B, apartament 15');
    expect(parsed.number).toBe('10');
    expect(parsed.building).toBe('A1');
    expect(parsed.stair).toBe('B');
    expect(parsed.apartment).toBe('15');
  });

  it('handles addresses with number suffix (10A)', () => {
    const parsed = parseAddress('Strada Mihai Eminescu, nr. 10A');
    expect(parsed.number).toBe('10A');
  });

  it('handles extra whitespace', () => {
    const normalized = normalizeAddress('str.   Mihai   Eminescu,   nr. 10');
    expect(normalized).not.toContain('   ');
  });
});
