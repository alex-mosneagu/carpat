# Core Concepts

## Validators

All validators follow the same pattern:

```typescript
import { validateCNP } from '@carpat/core';

const result = validateCNP('1990101123456');

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
  error?: string; // Present if valid is false
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

## Formatters

Formatters take raw input and return a formatted string:

```typescript
import { formatCNP, formatIBAN, formatPhone } from '@carpat/core';

formatCNP('1990101123456');
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
