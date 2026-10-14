export interface Bank {
  code: string;
  name: string;
}

export const BANKS: Bank[] = [
  { code: 'BREL', name: 'Libra Internet Bank' },
  { code: 'BRDE', name: 'Banca Română pentru Dezvoltare' },
  { code: 'BTRL', name: 'Banca Transilvania' },
  { code: 'RNCB', name: 'Banca Comercială Română (BCR)' },
  { code: 'BPOS', name: 'Alpha Bank' },
  { code: 'INGB', name: 'ING Bank' },
  { code: 'CARP', name: 'Patria Bank' },
  { code: 'RZBR', name: 'Raiffeisen Bank' },
  { code: 'BUCU', name: 'Unicredit Bank' },
  { code: 'UGBI', name: 'Garanti Bank' },
  { code: 'PIRB', name: 'Banca Piraeus' },
  { code: 'BNRB', name: 'Banca Națională a României (BNR)' },
  { code: 'CECB', name: 'CEC Bank' },
  { code: 'EXIMRO', name: 'EximBank' },
  { code: 'OTPV', name: 'OTP Bank' },
  { code: 'TREZ', name: 'Trezoreria Statului' },
  { code: 'DAFB', name: 'Banca de Export-Import a Chinei' },
  { code: 'BFER', name: 'Banca Feroviara' },
  { code: 'WBAN', name: 'Vista Bank' },
  { code: 'AGLR', name: 'BRD - Groupe Société Générale' },
  { code: 'CRDZ', name: 'Banca Românească' },
  { code: 'CRCO', name: 'Credit Cooperatist' },
  { code: 'NBOR', name: 'Intesa Sanpaolo Bank' },
  { code: 'VGLD', name: 'Banca Comercială Intesa Sanpaolo România' },
];

export function getBankByCode(code: string): Bank | undefined {
  return BANKS.find((b) => b.code === code.toUpperCase());
}

export function getBankByName(name: string): Bank | undefined {
  const normalized = name.toLowerCase();
  return BANKS.find((b) => b.name.toLowerCase().includes(normalized));
}
