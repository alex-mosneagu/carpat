<script setup>
import VueDemo from '../components/VueDemo.vue';
</script>

# Vue Demo

Live validation with `@carpat/vue`. Leave a field to see errors; valid values can auto-format.

<VueDemo />

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
