export type ValidationErrorCode =
  | 'cnp.length'
  | 'cnp.sex'
  | 'cnp.month'
  | 'cnp.day'
  | 'cnp.future'
  | 'cnp.county'
  | 'cnp.checksum'
  | 'cui.digits'
  | 'cui.length'
  | 'cui.checksum'
  | 'iban.format'
  | 'iban.length'
  | 'iban.checksum'
  | 'phone.length'
  | 'phone.prefix'
  | 'postal.length'
  | 'postal.sector'
  | 'id.series'
  | 'id.number';

export interface ValidationResult {
  valid: boolean;
  error?: string;
  /** Stable key for i18n; prefer this over matching `error` text. */
  errorCode?: ValidationErrorCode;
}

export interface CNPValidationResult extends ValidationResult {
  data?: {
    /** `null` when the sex digit is 9 (foreign citizen — sex not encoded). */
    sex: 'M' | 'F' | null;
    birthDate: Date;
    county: string;
    countyCode: string;
  };
}

export interface CUIValidationResult extends ValidationResult {
  formatted?: string;
}

export interface IBANValidationResult extends ValidationResult {
  formatted?: string;
  bankCode?: string;
  bankName?: string;
}

export interface PhoneValidationResult extends ValidationResult {
  formatted?: string;
  type?: 'mobile' | 'landline';
}

export interface PostalCodeValidationResult extends ValidationResult {
  sector?: number;
}

export interface IDCardValidationResult extends ValidationResult {
  series?: string;
  number?: string;
}

export interface County {
  code: string;
  name: string;
  auto: string;
}

export interface Locality {
  siruta: string;
  name: string;
  countyCode: string;
  type: 'municipiu' | 'oras' | 'comuna';
  postalCode?: string;
}
