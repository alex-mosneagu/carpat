# carpat

Framework-agnostic Romanian validators, formatters, and form inputs for Vue, React, and Svelte.

[![CI](https://github.com/alex-mosneagu/carpat/actions/workflows/ci.yml/badge.svg)](https://github.com/alex-mosneagu/carpat/actions/workflows/ci.yml)
[![npm @carpat/core](https://img.shields.io/npm/v/@carpat/core.svg)](https://www.npmjs.com/package/@carpat/core)
[![npm @carpat/cli](https://img.shields.io/npm/v/@carpat/cli.svg)](https://www.npmjs.com/package/@carpat/cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Docs](https://img.shields.io/badge/docs-GitHub%20Pages-0A66C2)](https://alex-mosneagu.github.io/carpat/)

**Built by Alex Mosneagu with the help of AI tools.**

Live demos and API docs: [alex-mosneagu.github.io/carpat](https://alex-mosneagu.github.io/carpat/)

## Features

- Validation for CNP, CUI/CIF, IBAN, phone numbers, postal codes, and ID cards
- Ready-made inputs for Vue 3, React 18+, and Svelte 4
- Zero runtime dependencies in `@carpat/core`, tree-shakeable
- Bundled Romanian reference data: counties, localities, banks
- Full TypeScript types
- Unstyled components you can theme in your own app

## Quick Start

### Core (framework-agnostic)

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

### CLI

```bash
pnpm add -g @carpat/cli
carpat cnp 1990101010058
```

## What's Included

### Validators

- **CNP** — checksum, birth date, and county (including historical București sectors)
- **CUI/CIF** — mod-11 checksum, optional `RO` prefix
- **IBAN** — mod-97 checksum and Romanian bank lookup
- **Phone** — mobile (`07x`) and landline (`02x`, `03x`)
- **Postal codes** — 6-digit Romanian format
- **ID cards** — series and number checks
- **Addresses** — street-type normalization and light parsing

### Data

- **Counties** — județe with CNP codes and auto plate codes
- **Localities** — curated SIRUTA-oriented list of major cities and towns (not a full official dump)
- **Banks** — common Romanian bank codes for IBAN display

Data is bundled for offline use. Treat locality coverage as a practical subset, not a complete INSSE export.

### Components

Unstyled inputs for CNP, CUI, IBAN, phone, county, and locality selection.

## Documentation

- Site: [https://alex-mosneagu.github.io/carpat/](https://alex-mosneagu.github.io/carpat/)
- Interactive demos for Vue, React, and Svelte
- API reference for `@carpat/core` and the UI packages

## Monorepo Structure

```
carpat/
├── packages/
│   ├── core/        # Validators and data
│   ├── cli/         # Command-line interface
│   ├── vue/         # Vue 3 components
│   ├── react/       # React components
│   └── svelte/      # Svelte components
├── docs/            # VitePress documentation
└── .github/         # CI/CD workflows
```

## Development

```bash
pnpm install
pnpm test
pnpm test:coverage
pnpm build
pnpm docs:dev
pnpm lint
pnpm typecheck
```

## Data Sources

- **Counties / CNP codes** — Romanian administrative and CNP county codes (including historical București sectors 7–8)
- **Localities** — curated subset inspired by SIRUTA naming/codes; expand as needed for production coverage
- **Banks** — publicly documented Romanian bank codes used in IBAN

## Contributing

Contributions are welcome — open a pull request against `main`.

## License

MIT © 2026 Alex Mosneagu

See [LICENSE](./LICENSE) for details.

## Roadmap

See [ROADMAP.md](./ROADMAP.md) for planned features.
