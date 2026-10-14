# @carpat/vue

Vue 3 components for Romanian form inputs, built on top of `@carpat/core`.

## Installation

```bash
npm install @carpat/vue @carpat/core
# or
pnpm add @carpat/vue @carpat/core
```

## Usage

### Global Registration

```typescript
import { createApp } from 'vue';
import CarpatVue from '@carpat/vue';
import App from './App.vue';

const app = createApp(App);
app.use(CarpatVue);
app.mount('#app');
```

### Component Import

```vue
<script setup>
import { CNPInput, IBANInput, PhoneInput } from '@carpat/vue';
import { ref } from 'vue';

const cnp = ref('');
const iban = ref('');
const phone = ref('');
</script>

<template>
  <CNPInput v-model="cnp" label="CNP" :show-info="true" required />

  <IBANInput v-model="iban" label="IBAN" :show-bank-info="true" />

  <PhoneInput v-model="phone" label="Telefon" />
</template>
```

## Components

### CNPInput

```vue
<CNPInput
  v-model="cnp"
  label="CNP"
  placeholder="CNP (13 cifre)"
  :required="true"
  :show-info="true"
  :auto-format="false"
  @validate="handleValidation"
/>
```

### CUIInput

```vue
<CUIInput v-model="cui" label="CUI/CIF" :include-prefix="true" />
```

### IBANInput

```vue
<IBANInput v-model="iban" label="IBAN" :show-bank-info="true" :auto-format="true" />
```

### PhoneInput

```vue
<PhoneInput v-model="phone" label="Telefon" :show-type="true" :include-country-code="false" />
```

### CountySelect & LocalitySelect

```vue
<CountySelect v-model="county" label="Județ" :required="true" />

<LocalitySelect
  v-model="locality"
  :county-code="county"
  label="Localitate"
  :searchable="true"
  :require-county="true"
/>
```

## Composables

### useValidation

```typescript
import { useValidation } from '@carpat/vue';
import { validateCNP } from '@carpat/core';

const { value, result, isValid, error, isDirty, isTouched, handleInput, handleBlur, reset } =
  useValidation(validateCNP);
```

## Styling

All components use unstyled CSS classes by default. Add your own styles:

```css
.carpat-field {
  margin-bottom: 1rem;
}

.carpat-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.carpat-input,
.carpat-select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.carpat-error {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.carpat-info {
  color: #6c757d;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.carpat-dropdown {
  position: absolute;
  z-index: 1000;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  list-style: none;
  padding: 0;
  margin: 0;
}

.carpat-dropdown li {
  padding: 0.5rem;
  cursor: pointer;
}

.carpat-dropdown li:hover {
  background: #f0f0f0;
}
```

## License

MIT © Alex Mosneagu
