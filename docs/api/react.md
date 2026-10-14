# React API

Components and hooks for React 18+.

## Installation

```bash
pnpm add @carpat/core @carpat/react
```

## Components

All components use controlled state via `value` and `onChange` props.

### CNPInput

```tsx
import { CNPInput } from '@carpat/react';

<CNPInput
  value={cnp}
  onChange={setCnp}
  onValidate={(isValid) => console.log(isValid)}
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
/>;
```

**Props:**

- `value`: `string` - Controlled value
- `onChange`: `(value: string) => void` - Change handler
- `onValidate`: `(isValid: boolean) => void` - Validation callback
- Same display props as Vue

### CUIInput

```tsx
<CUIInput value={cui} onChange={setCui} label="CUI/CIF" includePrefix />
```

### IBANInput

```tsx
<IBANInput value={iban} onChange={setIban} label="IBAN" showBankInfo autoFormat />
```

### PhoneInput

```tsx
<PhoneInput value={phone} onChange={setPhone} label="Telefon" showType includeCountryCode={false} />
```

### CountySelect & LocalitySelect

```tsx
import { CountySelect, LocalitySelect } from '@carpat/react';

const [county, setCounty] = useState('');
const [locality, setLocality] = useState('');

<CountySelect
  value={county}
  onChange={setCounty}
  label="Județ"
  required
/>

<LocalitySelect
  value={locality}
  onChange={setLocality}
  countyCode={county}
  label="Localitate"
  searchable
  requireCounty
/>
```

## Hooks

### useValidation

```tsx
import { useValidation } from '@carpat/react';
import { validateCNP } from '@carpat/core';

function MyForm() {
  const {
    value, // string
    setValue, // Dispatch<SetStateAction<string>>
    result, // ValidationResult
    isValid, // boolean
    error, // string
    isDirty, // boolean
    isTouched, // boolean
    handleChange, // (value: string) => void
    handleBlur, // () => void
    reset, // () => void
  } = useValidation(validateCNP);

  return <input value={value} onChange={(e) => handleChange(e.target.value)} onBlur={handleBlur} />;
}
```

## TypeScript

All props have full type definitions:

```tsx
import type { CNPInputProps, IBANInputProps } from '@carpat/react';

const inputProps: CNPInputProps = {
  value: cnp,
  onChange: setCnp,
  label: 'CNP',
  showInfo: true,
};
```

## Form Libraries

Works with popular form libraries:

### React Hook Form

```tsx
import { Controller, useForm } from 'react-hook-form';
import { CNPInput } from '@carpat/react';
import { validateCNP } from '@carpat/core';

function MyForm() {
  const { control, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <Controller
        name="cnp"
        control={control}
        rules={{
          validate: (value) => validateCNP(value).valid || 'Invalid CNP',
        }}
        render={({ field }) => <CNPInput {...field} label="CNP" showInfo />}
      />
    </form>
  );
}
```

### Formik

```tsx
import { Formik, Form } from 'formik';
import { CNPInput } from '@carpat/react';
import { validateCNP } from '@carpat/core';

<Formik
  initialValues={{ cnp: '' }}
  validate={(values) => {
    const errors = {};
    if (!validateCNP(values.cnp).valid) {
      errors.cnp = 'Invalid CNP';
    }
    return errors;
  }}
  onSubmit={console.log}
>
  {({ values, setFieldValue }) => (
    <Form>
      <CNPInput value={values.cnp} onChange={(value) => setFieldValue('cnp', value)} label="CNP" />
    </Form>
  )}
</Formik>;
```

## Next.js

Works with both Pages and App Router:

```tsx
'use client'; // App Router

import { useState } from 'react';
import { CNPInput } from '@carpat/react';

export default function Page() {
  const [cnp, setCnp] = useState('');
  return <CNPInput value={cnp} onChange={setCnp} />;
}
```

## Styling

See [Core Concepts](/guide/core-concepts#styling) for styling guide.
