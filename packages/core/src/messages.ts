import type { ValidationErrorCode } from './types.js';

export const defaultMessages: Record<ValidationErrorCode, string> = {
  'cnp.length': 'CNP must contain exactly 13 digits',
  'cnp.sex': 'Invalid sex digit',
  'cnp.month': 'Invalid month',
  'cnp.day': 'Invalid day',
  'cnp.future': 'Birth date cannot be in the future',
  'cnp.county': 'Invalid county code',
  'cnp.checksum': 'Invalid checksum',
  'cui.digits': 'CUI must contain only digits (optionally prefixed with RO)',
  'cui.length': 'CUI must be between 2 and 10 digits',
  'cui.checksum': 'Invalid checksum',
  'iban.format': 'Invalid IBAN format',
  'iban.length': 'Romanian IBAN must be 24 characters',
  'iban.checksum': 'Invalid IBAN checksum',
  'phone.length': 'Phone number must be 10 digits starting with 0',
  'phone.prefix': 'Invalid phone prefix',
  'postal.length': 'Postal code must be 6 digits',
  'postal.sector': 'Invalid postal code sector',
  'id.series': 'Invalid ID card series',
  'id.number': 'ID card number must be 6 digits',
};

let messages: Record<ValidationErrorCode, string> = { ...defaultMessages };

/** Override one or more validation error messages (partial merge). */
export function setMessages(overrides: Partial<Record<ValidationErrorCode, string>>): void {
  messages = { ...messages, ...overrides };
}

/** Restore the built-in English messages. */
export function resetMessages(): void {
  messages = { ...defaultMessages };
}

/** Current message catalog (read-only snapshot). */
export function getMessages(): Readonly<Record<ValidationErrorCode, string>> {
  return messages;
}

export function getMessage(code: ValidationErrorCode): string {
  return messages[code];
}

export function invalid(code: ValidationErrorCode): {
  valid: false;
  error: string;
  errorCode: ValidationErrorCode;
} {
  return {
    valid: false,
    errorCode: code,
    error: messages[code],
  };
}
