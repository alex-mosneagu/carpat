import { afterEach, describe, expect, it } from 'vitest';
import { validateCNP } from '../cnp.js';
import {
  defaultMessages,
  getMessage,
  getMessages,
  resetMessages,
  setMessages,
} from '../messages.js';

describe('validation messages', () => {
  afterEach(() => {
    resetMessages();
  });

  it('returns default English messages', () => {
    expect(getMessage('cnp.length')).toBe(defaultMessages['cnp.length']);
  });

  it('exposes errorCode alongside error text', () => {
    const result = validateCNP('123');
    expect(result.valid).toBe(false);
    expect(result.errorCode).toBe('cnp.length');
    expect(result.error).toBe(defaultMessages['cnp.length']);
  });

  it('allows overriding messages via setMessages', () => {
    setMessages({
      'cnp.length': 'CNP-ul trebuie să aibă exact 13 cifre',
    });

    const result = validateCNP('123');
    expect(result.errorCode).toBe('cnp.length');
    expect(result.error).toBe('CNP-ul trebuie să aibă exact 13 cifre');
    expect(getMessages()['cnp.checksum']).toBe(defaultMessages['cnp.checksum']);
  });

  it('restores defaults with resetMessages', () => {
    setMessages({ 'cnp.length': 'custom' });
    resetMessages();
    expect(validateCNP('123').error).toBe(defaultMessages['cnp.length']);
  });
});
