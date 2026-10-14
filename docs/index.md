---
layout: home
title: Romanian form validators
description: Framework-agnostic Romanian validators and form components for Vue, React, and Svelte.

hero:
  name: carpat
  text: Romanian form validators
  tagline: CNP, CUI, IBAN, phone, and more — with components for Vue, React, and Svelte.
  actions:
    - theme: brand
      text: Get started
      link: /guide/getting-started
    - theme: alt
      text: GitHub
      link: https://github.com/alex-mosneagu/carpat

features:
  - title: Validation that matches the rules
    details: Checksums and Romanian-specific logic for CNP, CUI/CIF, IBAN, phones, postal codes, and ID cards.
  - title: Vue, React, and Svelte
    details: Ready inputs and selectors on top of a shared core, or use @carpat/core on its own.
  - title: Local Romanian data
    details: Counties, localities, and bank codes bundled for offline use — no extra API calls.
  - title: TypeScript first
    details: Typed results and formatters, tree-shakeable, zero runtime dependencies in core.
---

## Quick example

```ts
import { validateCNP, formatPhone } from '@carpat/core';

const result = validateCNP('1990101123450');
if (result.valid) {
  // result.data → sex, birthDate, county, countyCode
}

formatPhone('+40 712 345 678'); // '0712 345 678'
```

## Install

```bash
pnpm add @carpat/core
# optional UI
pnpm add @carpat/vue    # or @carpat/react / @carpat/svelte
```

See the [guide](/guide/getting-started) or try the [Vue demo](/demos/vue).
