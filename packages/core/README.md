# @carpat/core

Framework-agnostic Romanian validators, formatters, and data for web applications.

## Installation

```bash
npm install @carpat/core
# or
pnpm add @carpat/core
```

## Features

- **CNP (Personal Identification Number)**: Validate, extract data (sex, birth date, county)
- **CUI/CIF (Company Identification)**: Validate checksum, format with/without RO prefix
- **IBAN**: Validate mod-97 checksum, format in groups of 4, Romanian bank lookup
- **Phone Numbers**: Validate and format mobile/landline numbers
- **Postal Codes**: Validate Romanian 6-digit postal codes
- **ID Card**: Validate series and number format
- **Address**: Normalize street types and parse address components
- **Data**: Counties (județe), localities (SIRUTA), and banks

## Usage

### CNP Validation

```typescript
import { validateCNP, extractCNPData, formatCNP } from '@carpat/core';

const result = validateCNP('1990101123450');
if (result.valid) {
  console.log(result.data);
  // { sex: 'M', birthDate: Date, county: 'Alba', countyCode: '01' }
}

const data = extractCNPData('1990101123450');
const formatted = formatCNP('1990101123450'); // "1 99 01 01 12 345 0"
```

### CUI/CIF Validation

```typescript
import { validateCUI, formatCUI } from '@carpat/core';

const result = validateCUI('RO12345678');
console.log(result.valid); // true
console.log(result.formatted); // "RO12345678"

const formatted = formatCUI('12345678'); // "RO12345678"
const normalized = normalizeCUI('RO12345678'); // "12345678"
```

### IBAN Validation

```typescript
import { validateIBAN, formatIBAN } from '@carpat/core';

const result = validateIBAN('RO49AAAA1B31007593840000');
if (result.valid) {
  console.log(result.bankCode); // "AAAA"
  console.log(result.bankName); // "Banca Comercială Română"
  console.log(result.formatted); // "RO49 AAAA 1B31 0075 9384 0000"
}
```

### Phone Validation

```typescript
import { validatePhone, formatPhone } from '@carpat/core';

const result = validatePhone('0712345678');
console.log(result.type); // "mobile"
console.log(result.formatted); // "0712 345 678"

const international = formatPhone('0712345678', true); // "+40 712 345 678"
```

### Working with Data

```typescript
import { COUNTIES, getCountyByCode } from '@carpat/core/data';
import { searchLocalities, getLocalitiesByCounty } from '@carpat/core/data';

const county = getCountyByCode('12');
console.log(county.name); // "Cluj"

const localities = getLocalitiesByCounty('12');
const results = searchLocalities('Cluj', '12');
```

## Data Sources

- **Localities**: Curated SIRUTA-oriented subset of major cities and towns (not a full INSSE dump).
- **Counties**: Romanian administrative / CNP county codes (including historical București sectors 7–8).
- **Banks**: Commonly documented Romanian bank codes for IBAN display.

## Tree-shaking

The package is built with ES modules and supports tree-shaking. Import only what you need:

```typescript
import { validateCNP } from '@carpat/core';
import { COUNTIES } from '@carpat/core/data';
```

## License

MIT © Alex Mosneagu
