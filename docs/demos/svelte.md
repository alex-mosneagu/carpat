# Svelte Demo

Try the Svelte components with live validation.

## Installation

```bash
pnpm add @carpat/core @carpat/svelte
```

## Source Code

```svelte
<script>
  import {
    CNPInput,
    CUIInput,
    IBANInput,
    PhoneInput,
    CountySelect,
    LocalitySelect
  } from '@carpat/svelte';

  let cnp = '';
  let cui = '';
  let iban = '';
  let phone = '';
  let county = '';
  let locality = '';
</script>

<CNPInput
  bind:value={cnp}
  label="CNP (Cod Numeric Personal)"
  showInfo
  required
/>

<CUIInput
  bind:value={cui}
  label="CUI/CIF"
  includePrefix
/>

<IBANInput
  bind:value={iban}
  label="IBAN"
  showBankInfo
  autoFormat
/>

<PhoneInput
  bind:value={phone}
  label="Telefon"
  showType
  autoFormat
/>

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

## Test Values

- **CNP**: `1990101123450` (male) or `2850623234566` (female)
- **CUI**: `18547290` or `RO18547290`
- **IBAN**: `RO90RNCB0000000000001234` (BCR) or `RO36BTRL0130123456789012` (Transilvania)
- **Phone**: `0712345678` (mobile) or `0212345678` (landline)

## Features

- Real-time validation
- Error messages on blur
- Auto-formatting for valid inputs
- Data extraction (CNP shows sex, birth date, county)
- Bank lookup for IBAN
- Phone type detection
- Reactive stores integration

## API

See the [Svelte API documentation](/api/svelte) for all available props.

## SvelteKit Integration

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

## Custom Validation

Use core validators for custom logic:

```svelte
<script>
  import { validateCNP } from '@carpat/core';

  let cnp = '';
  let isTouched = false;

  $: result = validateCNP(cnp);
  $: error = isTouched && !result.valid ? result.error : '';
</script>

<div class="field">
  <label>CNP</label>
  <input
    bind:value={cnp}
    on:blur={() => (isTouched = true)}
    placeholder="CNP (13 cifre)"
  />
  {#if error}
    <p class="error">{error}</p>
  {/if}
  {#if result.valid && result.data}
    <div class="info">
      <p>Sex: {result.data.sex === 'M' ? 'Masculin' : 'Feminin'}</p>
      <p>Data nașterii: {result.data.birthDate.toLocaleDateString('ro-RO')}</p>
      <p>Județ: {result.data.county}</p>
    </div>
  {/if}
</div>
```

## TypeScript

Enable type checking:

```svelte
<script lang="ts">
  import { CNPInput } from '@carpat/svelte';

  let cnp: string = '';
</script>

<CNPInput bind:value={cnp} label="CNP" />
```
