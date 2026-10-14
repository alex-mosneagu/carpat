<script setup>
import { ref } from 'vue';
import { CNPInput, CUIInput, IBANInput, PhoneInput, CountySelect, LocalitySelect } from '@carpat/vue';

const cnp = ref('');
const cui = ref('');
const iban = ref('');
const phone = ref('');
const county = ref('');
const locality = ref('');
</script>

# Vue Demo

Try the Vue components with live validation:

<div class="carpat-demo">

## CNP Input

<CNPInput 
  v-model="cnp" 
  label="CNP (Cod Numeric Personal)"
  :show-info="true"
  :show-error="true"
  :required="true"
/>

Try: `1990101123456` (valid male CNP) or `2850623234567` (valid female CNP)

## CUI Input

<CUIInput
  v-model="cui"
  label="CUI/CIF"
  :include-prefix="true"
/>

Try: `18547290` or `RO18547290`

## IBAN Input

<IBANInput
  v-model="iban"
  label="IBAN"
  :show-bank-info="true"
  :auto-format="true"
/>

Try: `RO49RNCB0000000000000000` (BCR) or `RO49BTRL01301202S50000XX` (Banca Transilvania)

## Phone Input

<PhoneInput
  v-model="phone"
  label="Telefon"
  :show-type="true"
  :auto-format="true"
/>

Try: `0712345678` (mobile) or `0212345678` (landline)

## County & Locality

<div class="demo-grid">
  <CountySelect
    v-model="county"
    label="Județ"
    :required="true"
  />
  
  <LocalitySelect
    v-model="locality"
    :county-code="county"
    label="Localitate"
    :searchable="true"
    :require-county="true"
  />
</div>

</div>

## Source Code

```vue
<script setup>
import { ref } from 'vue';
import { 
  CNPInput, 
  CUIInput, 
  IBANInput, 
  PhoneInput,
  CountySelect,
  LocalitySelect 
} from '@carpat/vue';

const cnp = ref('');
const cui = ref('');
const iban = ref('');
const phone = ref('');
const county = ref('');
const locality = ref('');
</script>

<template>
  <CNPInput 
    v-model="cnp" 
    label="CNP"
    :show-info="true"
  />
  
  <CUIInput v-model="cui" label="CUI/CIF" />
  
  <IBANInput 
    v-model="iban" 
    label="IBAN"
    :show-bank-info="true"
  />
  
  <PhoneInput 
    v-model="phone" 
    label="Telefon"
    :show-type="true"
  />
  
  <CountySelect v-model="county" label="Județ" />
  
  <LocalitySelect
    v-model="locality"
    :county-code="county"
    label="Localitate"
  />
</template>
```

## Installation

```bash
pnpm add @carpat/core @carpat/vue
```

See the [Vue API documentation](/api/vue) for all available props and events.
