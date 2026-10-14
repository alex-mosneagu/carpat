# Core Concepts

## Validators

All validators follow the same pattern:

```typescript
import { validateCNP } from '@carpat/core';

const result = validateCNP('1990101123450');

if (result.valid) {
  console.log('Valid!');
  console.log(result.data); // Additional extracted data
} else {
  console.log(result.error); // Human-readable error message
}
```

### Validation Result

Every validator returns a `ValidationResult`:

```typescript
interface ValidationResult {
  valid: boolean;
  error?: string; // Human-readable message (localizable)
  errorCode?: ValidationErrorCode; // Stable key for i18n
}
```

Some validators extend this with additional data:

```typescript
interface CNPValidationResult extends ValidationResult {
  data?: {
    sex: 'M' | 'F';
    birthDate: Date;
    county: string;
    countyCode: string;
  };
}
```

## Custom error messages

Default messages are English. Override them once at app startup with `setMessages` — UI components pick up `result.error` automatically:

```typescript
import { setMessages, resetMessages, validateCNP } from '@carpat/core';

setMessages({
  'cnp.length': 'CNP-ul trebuie să aibă exact 13 cifre',
  'cnp.checksum': 'Checksum CNP invalid',
  'iban.format': 'Format IBAN invalid',
});

validateCNP('123').error;
// "CNP-ul trebuie să aibă exact 13 cifre"

validateCNP('123').errorCode;
// "cnp.length"
```

Prefer mapping on `errorCode` in your own i18n layer if you already have a translation system:

```typescript
const t = {
  'cnp.length': 'CNP-ul trebuie să aibă exact 13 cifre',
} as const;

const result = validateCNP(value);
const message = result.errorCode ? (t[result.errorCode] ?? result.error) : undefined;
```

Use `resetMessages()` to restore the built-in English catalog. See the [Core API](/api/core#messages) for the full list of codes.

## Formatters

Formatters take raw input and return a formatted string:

```typescript
import { formatCNP, formatIBAN, formatPhone } from '@carpat/core';

formatCNP('1990101123450');
// "1 99 01 01 12 345 6"

formatIBAN('RO49AAAA1B31007593840000');
// "RO49 AAAA 1B31 0075 9384 0000"

formatPhone('0712345678');
// "0712 345 678"

formatPhone('0712345678', true); // with country code
// "+40 712 345 678"
```

## Data Access

Romanian data is available through dedicated exports:

```typescript
import { COUNTIES, LOCALITIES, BANKS } from '@carpat/core/data';

// Get all counties
COUNTIES.forEach((county) => {
  console.log(county.name, county.code, county.auto);
});

// Search localities
import { searchLocalities, getLocalitiesByCounty } from '@carpat/core/data';

const results = searchLocalities('Cluj');
const clujLocalities = getLocalitiesByCounty('12');
```

### Tree-shaking

Data is in a separate entry point to support tree-shaking:

```typescript
// Only validators, no data
import { validateCNP } from '@carpat/core';

// Explicitly import data when needed
import { COUNTIES } from '@carpat/core/data';
```

## Components

Framework components wrap core validators with UI:

```vue
<!-- Vue -->
<CNPInput v-model="cnp" label="CNP" :show-info="true" @validate="handleValidation" />
```

All components:

- Use core validators internally
- Support validation states (touched, dirty)
- Show errors automatically
- Are unstyled by default
- Support custom class names
- Follow accessibility guidelines

## Composables / Hooks

Use validation logic in your own components:

::: code-group

```typescript [Vue]
import { useValidation } from '@carpat/vue';
import { validateCNP } from '@carpat/core';

const { value, result, isValid, error, handleInput, handleBlur } = useValidation(validateCNP);
```

```typescript [React]
import { useValidation } from '@carpat/react';
import { validateCNP } from '@carpat/core';

const { value, setValue, result, isValid, error, handleChange, handleBlur } =
  useValidation(validateCNP);
```

:::

## Styling

Components use semantic CSS classes that you style:

```css
.carpat-field {
  /* Container */
}
.carpat-label {
  /* Label */
}
.carpat-input {
  /* Input field */
}
.carpat-select {
  /* Select dropdown */
}
.carpat-error {
  /* Error message */
}
.carpat-info {
  /* Info text */
}
.carpat-dropdown {
  /* Autocomplete dropdown */
}
```

Or pass custom classes:

```vue
<CNPInput
  container-class="my-field"
  label-class="my-label"
  input-class="my-input"
  error-class="my-error"
/>
```

## Best Practices

### 1. Validate on blur, not on every keystroke

```vue
<CNPInput v-model="cnp" @blur="validate" />
```

### 2. Show errors only after the field is touched

Components handle this automatically, but if building custom:

```typescript
const showError = isTouched && !isValid;
```

### 3. Use formatters on blur

```typescript
const handleBlur = () => {
  if (isValid) {
    value = formatCNP(value);
  }
};
```

### 4. Lazy-load data

```typescript
// Only import when needed
const loadLocalities = async () => {
  const { searchLocalities } = await import('@carpat/core/data');
  return searchLocalities(query);
};
```

## Next Steps

- Explore the [Core API](/api/core)
- See [Vue API](/api/vue) for Vue-specific features
- Try the [live demos](/demos/vue)
