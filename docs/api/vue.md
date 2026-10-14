# Vue API

Components and composables for Vue 3.

## Installation

```bash
pnpm add @carpat/core @carpat/vue
```

## Components

All components support `v-model` for two-way binding.

### CNPInput

```vue
<CNPInput
  v-model="cnp"
  label="CNP"
  placeholder="CNP (13 cifre)"
  :disabled="false"
  :required="false"
  :show-info="false"
  :show-error="true"
  :auto-format="false"
  container-class="carpat-field"
  label-class="carpat-label"
  input-class="carpat-input"
  error-class="carpat-error"
  info-class="carpat-info"
  @validate="handleValidation"
/>
```

**Props:**
- `modelValue`: `string` - CNP value
- `label`: `string` - Field label
- `placeholder`: `string` - Input placeholder
- `disabled`: `boolean` - Disable input
- `required`: `boolean` - Show required indicator
- `showInfo`: `boolean` - Show extracted data (sex, birth date, county)
- `showError`: `boolean` - Show validation errors
- `autoFormat`: `boolean` - Auto-format on complete input
- CSS class props for customization

**Events:**
- `update:modelValue` - Emitted on value change
- `validate` - Emitted with `boolean` on validation state change

### CUIInput

```vue
<CUIInput
  v-model="cui"
  label="CUI/CIF"
  :include-prefix="true"
/>
```

**Props:**
- `includePrefix`: `boolean` - Add RO prefix on blur

### IBANInput

```vue
<IBANInput
  v-model="iban"
  label="IBAN"
  :show-bank-info="true"
  :auto-format="true"
/>
```

**Props:**
- `showBankInfo`: `boolean` - Display bank name
- `autoFormat`: `boolean` - Format in groups of 4 on blur

### PhoneInput

```vue
<PhoneInput
  v-model="phone"
  label="Telefon"
  :show-type="false"
  :include-country-code="false"
/>
```

**Props:**
- `showType`: `boolean` - Show "Mobil" or "Fix"
- `includeCountryCode`: `boolean` - Format with +40

### CountySelect

```vue
<CountySelect
  v-model="county"
  label="Județ"
  placeholder="Selectează județul"
  :required="false"
/>
```

Dropdown with all 42 Romanian counties.

### LocalitySelect

```vue
<LocalitySelect
  v-model="locality"
  :county-code="county"
  label="Localitate"
  :searchable="true"
  :require-county="true"
/>
```

**Props:**
- `countyCode`: `string` - Filter localities by county
- `searchable`: `boolean` - Enable search input (vs. dropdown)
- `requireCounty`: `boolean` - Disable if no county selected

## Composables

### useValidation

Create custom validation logic:

```vue
<script setup>
import { useValidation } from '@carpat/vue';
import { validateCNP } from '@carpat/core';

const {
  value,         // Ref<string>
  result,        // ComputedRef<ValidationResult>
  isValid,       // ComputedRef<boolean>
  error,         // ComputedRef<string>
  isDirty,       // Ref<boolean>
  isTouched,     // Ref<boolean>
  handleInput,   // (value: string) => void
  handleBlur,    // () => void
  reset,         // () => void
} = useValidation(validateCNP);
</script>

<template>
  <input
    :value="value"
    @input="handleInput($event.target.value)"
    @blur="handleBlur"
  />
  <p v-if="error">{{ error }}</p>
</template>
```

## Plugin

Register all components globally:

```typescript
import { createApp } from 'vue';
import CarpatVue from '@carpat/vue';
import App from './App.vue';

const app = createApp(App);
app.use(CarpatVue);
app.mount('#app');
```

Then use without imports:

```vue
<template>
  <CNPInput v-model="cnp" />
  <IBANInput v-model="iban" />
</template>
```

## Nuxt 3

Create a plugin:

```typescript
// plugins/carpat.ts
import CarpatVue from '@carpat/vue';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(CarpatVue);
});
```

## Styling

See [Core Concepts](/guide/core-concepts#styling) for styling guide.
