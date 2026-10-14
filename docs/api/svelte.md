# Svelte API

Components for Svelte 4.

## Installation

```bash
pnpm add @carpat/core @carpat/svelte
```

## Components

All components support two-way binding with `bind:value`.

### CNPInput

```svelte
<script>
  import { CNPInput } from '@carpat/svelte';
  let cnp = '';
</script>

<CNPInput
  bind:value={cnp}
  label="CNP"
  placeholder="CNP (13 cifre)"
  disabled={false}
  required={false}
  showInfo={false}
  showError={true}
  autoFormat={false}
  containerClass="carpat-field"
  labelClass="carpat-label"
  inputClass="carpat-input"
  errorClass="carpat-error"
  infoClass="carpat-info"
/>
```

**Props:**
- All the same as Vue/React
- Use `bind:value` for two-way binding

### CUIInput

```svelte
<CUIInput
  bind:value={cui}
  label="CUI/CIF"
  includePrefix={true}
/>
```

### IBANInput

```svelte
<IBANInput
  bind:value={iban}
  label="IBAN"
  showBankInfo={true}
  autoFormat={true}
/>
```

### PhoneInput

```svelte
<PhoneInput
  bind:value={phone}
  label="Telefon"
  showType={false}
  includeCountryCode={false}
/>
```

### CountySelect & LocalitySelect

```svelte
<script>
  import { CountySelect, LocalitySelect } from '@carpat/svelte';
  
  let county = '';
  let locality = '';
</script>

<CountySelect bind:value={county} label="Județ" required />

<LocalitySelect
  bind:value={locality}
  countyCode={county}
  label="Localitate"
  searchable
  requireCounty
/>
```

## Using with Core

Import validators from `@carpat/core` for custom logic:

```svelte
<script>
  import { validateCNP } from '@carpat/core';
  
  let cnp = '';
  let isTouched = false;
  
  $: result = validateCNP(cnp);
  $: error = isTouched && !result.valid ? result.error : '';
</script>

<input
  bind:value={cnp}
  on:blur={() => (isTouched = true)}
  placeholder="CNP"
/>
{#if error}
  <p class="error">{error}</p>
{/if}
```

## SvelteKit

Works seamlessly in SvelteKit:

```svelte
<!-- +page.svelte -->
<script>
  import { CNPInput, IBANInput } from '@carpat/svelte';
  
  let cnp = '';
  let iban = '';
</script>

<form method="POST">
  <CNPInput bind:value={cnp} label="CNP" />
  <IBANInput bind:value={iban} label="IBAN" />
  
  <input type="hidden" name="cnp" value={cnp} />
  <input type="hidden" name="iban" value={iban} />
  
  <button type="submit">Submit</button>
</form>
```

Server-side validation:

```typescript
// +page.server.ts
import { validateCNP, validateIBAN } from '@carpat/core';
import { fail } from '@sveltejs/kit';

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const cnp = data.get('cnp');
    const iban = data.get('iban');

    if (!validateCNP(cnp).valid) {
      return fail(400, { error: 'Invalid CNP' });
    }

    if (!validateIBAN(iban).valid) {
      return fail(400, { error: 'Invalid IBAN' });
    }

    // Process form...
  },
};
```

## TypeScript

Enable type checking in Svelte:

```svelte
<script lang="ts">
  import { CNPInput } from '@carpat/svelte';
  
  let cnp: string = '';
</script>
```

## Styling

See [Core Concepts](/guide/core-concepts#styling) for styling guide.
