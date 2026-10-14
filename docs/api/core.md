# Core API

Framework-agnostic validators, formatters, and data utilities.

## Validators

### validateCNP

Validate Romanian Personal Identification Number.

```typescript
function validateCNP(cnp: string): CNPValidationResult;

interface CNPValidationResult extends ValidationResult {
  data?: {
    sex: 'M' | 'F' | null; // null for digit 9 (foreign citizen)
    birthDate: Date;
    county: string;
    countyCode: string;
  };
}
```

**Algorithm:**

- 13 digits required
- First digit encodes century/sex (1–8) or foreign citizen (9, sex not encoded)
- Digits 2-7 encode birth date (YYMMDD)
- Digits 8-9 encode county (including historical București sectors 47–48; 52 is Giurgiu)
- Last digit is mod-11 checksum with weights [2,7,9,1,4,6,3,5,8,2,7,9]

**Example:**

```typescript
const result = validateCNP('1990101123450');
if (result.valid) {
  console.log(result.data.sex); // 'M'
  console.log(result.data.birthDate); // Date object
  console.log(result.data.county); // 'Alba'
}
```

### validateCUI

Validate Romanian Company Identification Number.

```typescript
function validateCUI(cui: string): CUIValidationResult;

interface CUIValidationResult extends ValidationResult {
  formatted?: string; // With RO prefix
}
```

**Algorithm:**

- 2-10 digits (padded to 10 for checksum)
- Optional RO prefix
- Last digit is checksum with weights [7,5,3,2,1,7,5,3,2,1]
- Checksum = (sum * 10) % 11, where 10 becomes 0

**Example:**

```typescript
const result = validateCUI('RO18547290');
console.log(result.valid); // true
console.log(result.formatted); // 'RO18547290'
```

### validateIBAN

Validate International Bank Account Number.

```typescript
function validateIBAN(iban: string): IBANValidationResult;

interface IBANValidationResult extends ValidationResult {
  formatted?: string; // Groups of 4
  bankCode?: string; // For RO IBANs
  bankName?: string; // Looked up from banks data
}
```

**Algorithm:**

- Standard mod-97 checksum
- Romanian IBANs are exactly 24 characters
- Format: RO + 2 check digits + 4 bank code + 16 account number

**Example:**

```typescript
const result = validateIBAN('RO90RNCB0000000000001234');
console.log(result.bankCode); // 'RNCB'
console.log(result.bankName); // 'Banca Comercială Română (BCR)'
console.log(result.formatted); // 'RO49 RNCB 0000 0000 0000 0000'
```

### validatePhone

Validate Romanian phone numbers.

```typescript
function validatePhone(phone: string): PhoneValidationResult;

interface PhoneValidationResult extends ValidationResult {
  formatted?: string;
  type?: 'mobile' | 'landline';
}
```

**Supported formats:**

- `07XXXXXXXX` - Mobile (07x)
- `02XXXXXXXX` - Landline (02x, 03x)
- `+407XXXXXXXX` - International
- `00407XXXXXXXX` - International alternative

**Example:**

```typescript
const result = validatePhone('0712345678');
console.log(result.type); // 'mobile'
console.log(result.formatted); // '0712 345 678'
```

### validatePostalCode

Validate Romanian postal codes.

```typescript
function validatePostalCode(code: string): PostalCodeValidationResult;

interface PostalCodeValidationResult extends ValidationResult {
  sector?: number; // For București (0-6)
}
```

**Format:** 6 digits (XXXXXX)

### validateIDCard

Validate Romanian ID card.

```typescript
function validateIDCard(series: string, number: string): IDCardValidationResult;

interface IDCardValidationResult extends ValidationResult {
  series?: string; // Normalized uppercase
  number?: string; // Normalized
}
```

**Valid series:** All county auto codes (AB, AR, B, etc.) plus RX, RT, RR, RL, RK, RZ for temporary residents.

**Number format:** 6 digits

## Formatters

### formatCNP

```typescript
function formatCNP(cnp: string): string;
```

Formats as: `S YY MM DD JJ NNN C`

Example: `1990101123450` → `1 99 01 01 12 345 0`

### formatCUI

```typescript
function formatCUI(cui: string, includePrefix = true): string;
```

Adds RO prefix by default.

### formatIBAN

```typescript
function formatIBAN(iban: string): string;
```

Formats in groups of 4.

Example: `RO49AAAA1B31007593840000` → `RO49 AAAA 1B31 0075 9384 0000`

### formatPhone

```typescript
function formatPhone(phone: string, includeCountryCode = false): string;
```

Examples:

- `formatPhone('0712345678')` → `'0712 345 678'`
- `formatPhone('0712345678', true)` → `'+40 712 345 678'`

### formatPostalCode

```typescript
function formatPostalCode(code: string): string;
```

Example: `010001` → `010 001`

## Address Utilities

### normalizeAddress

```typescript
function normalizeAddress(address: string): string;
```

Normalizes street type abbreviations:

- `str` → `Strada`
- `bd` → `Bulevardul`
- `al` → `Aleea`
- etc.

### parseAddress

```typescript
function parseAddress(address: string): ParsedAddress;

interface ParsedAddress {
  streetType?: string;
  streetName?: string;
  number?: string;
  building?: string;
  stair?: string;
  apartment?: string;
  raw: string;
}
```

Extracts components from Romanian addresses.

## Data Access

Import from `@carpat/core/data`:

```typescript
import {
  COUNTIES,
  LOCALITIES,
  BANKS,
  getCountyByCode,
  getLocalitiesByCounty,
  searchLocalities,
} from '@carpat/core/data';
```

### Counties

```typescript
interface County {
  code: string; // '01' to '52'
  name: string; // 'Alba', 'Arad', ...
  auto: string; // 'AB', 'AR', ...
}

const COUNTIES: County[];
```

### Localities

```typescript
interface Locality {
  siruta: string; // Official SIRUTA code
  name: string;
  countyCode: string;
  type: 'municipiu' | 'oras' | 'comuna';
  postalCode?: string;
}

const LOCALITIES: Locality[];

function getLocalitiesByCounty(countyCode: string): Locality[];
function searchLocalities(query: string, countyCode?: string): Locality[];
function getLocalityBySiruta(siruta: string): Locality | undefined;
```

### Banks

```typescript
interface Bank {
  code: string; // 4-letter code
  name: string;
}

const BANKS: Bank[];

function getBankByCode(code: string): Bank | undefined;
```

## Types

All types are exported from the main entry:

```typescript
import type {
  ValidationResult,
  CNPValidationResult,
  CUIValidationResult,
  IBANValidationResult,
  PhoneValidationResult,
  County,
  Locality,
  Bank,
} from '@carpat/core';
```
