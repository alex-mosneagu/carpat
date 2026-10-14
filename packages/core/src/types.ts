export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export interface CNPValidationResult extends ValidationResult {
  data?: {
    sex: 'M' | 'F';
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
