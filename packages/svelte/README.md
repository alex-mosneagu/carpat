# @carpat/svelte

Svelte components for Romanian form inputs, built on top of `@carpat/core`.

## Installation

```bash
npm install @carpat/svelte @carpat/core
# or
pnpm add @carpat/svelte @carpat/core
```

## Usage

```svelte
<script>
  import { CNPInput, IBANInput, PhoneInput } from '@carpat/svelte';

  let cnp = '';
  let iban = '';
  let phone = '';
</script>

<CNPInput bind:value={cnp} label="CNP" showInfo required />
<IBANInput bind:value={iban} label="IBAN" showBankInfo />
<PhoneInput bind:value={phone} label="Telefon" />
```

## Components

### CNPInput

```svelte
<CNPInput
  bind:value={cnp}
  label="CNP"
  placeholder="CNP (13 cifre)"
  required
  showInfo
  autoFormat={false}
/>
```

### CUIInput

```svelte
<CUIInput
  bind:value={cui}
  label="CUI/CIF"
  includePrefix
/>
```

### IBANInput

```svelte
<IBANInput
  bind:value={iban}
  label="IBAN"
  showBankInfo
  autoFormat
/>
```

### PhoneInput

```svelte
<PhoneInput
  bind:value={phone}
  label="Telefon"
  showType
  includeCountryCode={false}
/>
```

### CountySelect & LocalitySelect

```svelte
<script>
  let county = '';
  let locality = '';
</script>

<CountySelect
  bind:value={county}
  label="Județ"
  required
/>

<LocalitySelect
  bind:value={locality}
  countyCode={county}
  label="Localitate"
  searchable
  requireCounty
/>
```

## Styling

All components use unstyled CSS classes. See the Vue README for example styles.

## License

MIT © Alex Mosneagu
