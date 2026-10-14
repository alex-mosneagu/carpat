<script setup>
import { ref } from 'vue';
import {
  CNPInput,
  CUIInput,
  IBANInput,
  PhoneInput,
  CountySelect,
  LocalitySelect,
} from '@carpat/vue';

const cnp = ref('');
const cui = ref('');
const iban = ref('');
const phone = ref('');
const county = ref('');
const locality = ref('');
</script>

# Vue Demo

Live validation with `@carpat/vue`. Blur a field to see errors; valid values can auto-format.

<div class="carpat-demo">

## CNP

<CNPInput
  v-model="cnp"
  label="CNP (Cod Numeric Personal)"
  :show-info="true"
  :show-error="true"
  :required="true"
/>

<p class="demo-hint">Try <code>1990101123450</code> (male) or <code>2850623234566</code> (female).</p>

## CUI / CIF

<CUIInput v-model="cui" label="CUI/CIF" :include-prefix="true" />

<p class="demo-hint">Try <code>18547290</code> or <code>RO18547290</code>.</p>

## IBAN

<IBANInput
  v-model="iban"
  label="IBAN"
  :show-bank-info="true"
  :auto-format="true"
/>

<p class="demo-hint">
  Try <code>RO90RNCB0000000000001234</code> (BCR) or
  <code>RO36BTRL0130123456789012</code> (Banca Transilvania).
</p>

## Phone

<PhoneInput
  v-model="phone"
  label="Telefon"
  :show-type="true"
  :auto-format="true"
/>

<p class="demo-hint">Try <code>0712345678</code> (mobile) or <code>0212345678</code> (landline).</p>

## County and locality

<div class="demo-grid">
  <CountySelect v-model="county" label="Județ" :required="true" />

  <LocalitySelect
    v-model="locality"
    :county-code="county"
    label="Localitate"
    :searchable="true"
    :require-county="true"
  />
</div>

<p class="demo-hint">Pick a județ first, then search a locality.</p>

</div>

## Source

```vue
<script setup>
import { ref } from 'vue';
import {
  CNPInput,
  CUIInput,
  IBANInput,
  PhoneInput,
  CountySelect,
  LocalitySelect,
} from '@carpat/vue';

const cnp = ref('');
const cui = ref('');
const iban = ref('');
const phone = ref('');
const county = ref('');
const locality = ref('');
</script>

<template>
  <CNPInput v-model="cnp" label="CNP" :show-info="true" />
  <CUIInput v-model="cui" label="CUI/CIF" />
  <IBANInput v-model="iban" label="IBAN" :show-bank-info="true" />
  <PhoneInput v-model="phone" label="Telefon" :show-type="true" />
  <CountySelect v-model="county" label="Județ" />
  <LocalitySelect v-model="locality" :county-code="county" label="Localitate" />
</template>
```

## Install

```bash
pnpm add @carpat/core @carpat/vue
```

See the [Vue API](/api/vue) for props and events.
