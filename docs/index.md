---
layout: home

hero:
  name: carpat
  text: Romanian Form Validators
  tagline: Framework-agnostic toolkit for Romanian form inputs, validators, and data
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/alex-mosneagu/carpat

features:
  - icon: ✅
    title: Complete Validation
    details: CNP, CUI/CIF, IBAN, phone numbers, postal codes, ID cards with proper checksum algorithms
  - icon: 🎨
    title: Framework Support
    details: Works with Vue 3, React 18+, and Svelte 4 with dedicated component libraries
  - icon: 📦
    title: Zero Dependencies
    details: Core library has no runtime dependencies and supports tree-shaking
  - icon: 🇷🇴
    title: Romanian Data
    details: Counties, localities (SIRUTA), banks, all bundled locally for offline use
  - icon: 🔒
    title: Type Safe
    details: Written in TypeScript with full type definitions
  - icon: ♿
    title: Accessible
    details: Components follow accessibility best practices with proper ARIA labels
---

## Quick Example

::: code-group

```typescript [Core]
import { validateCNP, validateIBAN } from '@carpat/core';

const cnpResult = validateCNP('1990101123456');
if (cnpResult.valid) {
  console.log(cnpResult.data);
  // { sex: 'M', birthDate: Date, county: 'Alba' }
}

const ibanResult = validateIBAN('RO49AAAA1B31007593840000');
console.log(ibanResult.bankName); // Bank name
```

```vue [Vue]
<script setup>
import { CNPInput, IBANInput } from '@carpat/vue';
import { ref } from 'vue';

const cnp = ref('');
const iban = ref('');
</script>

<template>
  <CNPInput v-model="cnp" label="CNP" :show-info="true" />
  <IBANInput v-model="iban" label="IBAN" :show-bank-info="true" />
</template>
```

```tsx [React]
import { CNPInput, IBANInput } from '@carpat/react';
import { useState } from 'react';

function App() {
  const [cnp, setCnp] = useState('');
  const [iban, setIban] = useState('');

  return (
    <>
      <CNPInput value={cnp} onChange={setCnp} label="CNP" showInfo />
      <IBANInput value={iban} onChange={setIban} label="IBAN" showBankInfo />
    </>
  );
}
```

```svelte [Svelte]
<script>
  import { CNPInput, IBANInput } from '@carpat/svelte';

  let cnp = '';
  let iban = '';
</script>

<CNPInput bind:value={cnp} label="CNP" showInfo />
<IBANInput bind:value={iban} label="IBAN" showBankInfo />
```

:::

## Features

### CNP Validation

Validate Romanian personal identification numbers with full checksum verification, date validation, and data extraction (sex, birth date, county).

### CUI/CIF

Company identification validation with support for RO prefix, proper checksum algorithm, and formatting.

### IBAN

International bank account number validation with mod-97 checksum, Romanian bank lookup, and formatting in groups of 4.

### Phone Numbers

Mobile and landline validation with support for international format (+40), normalization, and formatting.

### Address Data

Complete SIRUTA database with counties and localities, postal code validation, and address normalization helpers.

### ID Cards

Validate Romanian ID card series and numbers with support for all valid prefixes including temporary residents.

## Data Sources

- **SIRUTA**: Locality data based on the official registry from the Romanian National Institute of Statistics (INSSE)
- **Counties**: Official Romanian county codes (județe) and auto registration codes
- **Banks**: Romanian bank codes for IBAN validation from publicly available sources

All data is bundled locally for offline use and performance.
