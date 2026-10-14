# carpat 🇷🇴

A comprehensive, framework-agnostic toolkit of Romanian form inputs, validators, formatters, and data for modern web applications.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)

**Built by Alex Mosneagu with the help of AI tools.**

## Features

- ✅ **Complete validation** for CNP, CUI/CIF, IBAN, phone numbers, postal codes, and ID cards
- 🎨 **Framework support** for Vue 3, React 18+, and Svelte 4 with ready-to-use components
- 📦 **Zero dependencies** in core, fully tree-shakeable
- 🇷🇴 **Romanian data** including counties (județe), localities (SIRUTA), and banks
- 🔒 **Type-safe** with full TypeScript definitions
- ♿ **Accessible** components following WCAG guidelines
- 🎯 **Correct algorithms** with proper checksum validation

## Quick Start

### Core (Framework-agnostic)

```bash
pnpm add @carpat/core
```

```typescript
import { validateCNP, validateIBAN, formatPhone } from '@carpat/core';

const cnpResult = validateCNP('1990101123450');
if (cnpResult.valid) {
  console.log(cnpResult.data);
  // { sex: 'M', birthDate: Date, county: 'Cluj', countyCode: '12' }
}

const ibanResult = validateIBAN('RO90RNCB0000000000001234');
console.log(ibanResult.bankName); // 'Banca Comercială Română (BCR)'

const formatted = formatPhone('0712345678'); // '0712 345 678'
```

### Vue 3

```bash
pnpm add @carpat/core @carpat/vue
```

```vue
<script setup>
import { CNPInput, IBANInput, PhoneInput } from '@carpat/vue';
import { ref } from 'vue';

const cnp = ref('');
const iban = ref('');
const phone = ref('');
</script>

<template>
  <CNPInput v-model="cnp" label="CNP" :show-info="true" />
  <IBANInput v-model="iban" label="IBAN" :show-bank-info="true" />
  <PhoneInput v-model="phone" label="Telefon" />
</template>
```

### React

```bash
pnpm add @carpat/core @carpat/react
```

```tsx
import { CNPInput, IBANInput, PhoneInput } from '@carpat/react';
import { useState } from 'react';

function App() {
  const [cnp, setCnp] = useState('');
  const [iban, setIban] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <>
      <CNPInput value={cnp} onChange={setCnp} label="CNP" showInfo />
      <IBANInput value={iban} onChange={setIban} label="IBAN" showBankInfo />
      <PhoneInput value={phone} onChange={setPhone} label="Telefon" />
    </>
  );
}
```

### Svelte

```bash
pnpm add @carpat/core @carpat/svelte
```

```svelte
<script>
  import { CNPInput, IBANInput, PhoneInput } from '@carpat/svelte';

  let cnp = '';
  let iban = '';
  let phone = '';
</script>

<CNPInput bind:value={cnp} label="CNP" showInfo />
<IBANInput bind:value={iban} label="IBAN" showBankInfo />
<PhoneInput bind:value={phone} label="Telefon" />
```

## What's Included

### Validators

- **CNP** (Cod Numeric Personal) - Personal identification with checksum, date, and county validation
- **CUI/CIF** - Company identification with mod-11 checksum
- **IBAN** - International bank account number with mod-97 checksum and Romanian bank lookup
- **Phone numbers** - Mobile (07x) and landline (02x, 03x) validation
- **Postal codes** - 6-digit Romanian postal codes
- **ID cards** - Series and number validation for Romanian identity cards
- **Addresses** - Street type normalization and address parsing

### Data

- **Counties** - All 42 Romanian counties (județe) with codes and auto registration plates
- **Localities** - SIRUTA database with major cities and towns
- **Banks** - Romanian bank codes and names for IBAN validation

All data is sourced from official public registries and bundled locally for offline use.

### Components

Ready-to-use, accessible, unstyled components for:

- CNP input with data extraction display
- CUI/CIF input with auto-formatting
- IBAN input with bank lookup
- Phone number input with type detection
- County selector dropdown
- Locality selector with search

## Documentation

Visit [https://alex-mosneagu.github.io/carpat/](https://alex-mosneagu.github.io/carpat/) for:

- 📖 Complete API documentation
- 🎮 Live interactive demos
- 🎓 Usage guides and examples
- 🎨 Styling examples

## Monorepo Structure

```
carpat/
├── packages/
│   ├── core/        # Framework-agnostic validators and data
│   ├── vue/         # Vue 3 components
│   ├── react/       # React components
│   └── svelte/      # Svelte components
├── docs/            # VitePress documentation site
└── .github/         # CI/CD workflows
```

## Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Build all packages
pnpm build

# Start docs dev server
pnpm docs:dev

# Lint
pnpm lint

# Type check
pnpm typecheck
```

## Data Sources

- **SIRUTA**: Official locality registry from the Romanian National Institute of Statistics (INSSE)
- **Counties**: Official Romanian administrative codes
- **Banks**: Publicly available Romanian bank codes for IBAN validation

All data is properly documented with sources and licenses where applicable.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © 2026 Alex Mosneagu

See [LICENSE](./LICENSE) for details.

## Roadmap

See [ROADMAP.md](./ROADMAP.md) for planned features and improvements.
