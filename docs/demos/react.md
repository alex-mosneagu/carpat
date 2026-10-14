# React Demo

Try the React components with live validation.

## Installation

```bash
pnpm add @carpat/core @carpat/react
```

## Source Code

```tsx
import { useState } from 'react';
import {
  CNPInput,
  CUIInput,
  IBANInput,
  PhoneInput,
  CountySelect,
  LocalitySelect,
} from '@carpat/react';

function App() {
  const [cnp, setCnp] = useState('');
  const [cui, setCui] = useState('');
  const [iban, setIban] = useState('');
  const [phone, setPhone] = useState('');
  const [county, setCounty] = useState('');
  const [locality, setLocality] = useState('');

  return (
    <div>
      <CNPInput
        value={cnp}
        onChange={setCnp}
        label="CNP (Cod Numeric Personal)"
        showInfo
        required
      />

      <CUIInput value={cui} onChange={setCui} label="CUI/CIF" includePrefix />

      <IBANInput value={iban} onChange={setIban} label="IBAN" showBankInfo autoFormat />

      <PhoneInput value={phone} onChange={setPhone} label="Telefon" showType autoFormat />

      <CountySelect value={county} onChange={setCounty} label="Județ" required />

      <LocalitySelect
        value={locality}
        onChange={setLocality}
        countyCode={county}
        label="Localitate"
        searchable
        requireCounty
      />
    </div>
  );
}
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

## API

See the [React API documentation](/api/react) for all available props and events.

## Integration

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
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Formik

```tsx
import { Formik, Form } from 'formik';
import { CNPInput } from '@carpat/react';
import { validateCNP } from '@carpat/core';

function MyForm() {
  return (
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
          <CNPInput
            value={values.cnp}
            onChange={(value) => setFieldValue('cnp', value)}
            label="CNP"
          />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}
```

## Next.js

Works with both Pages and App Router:

```tsx
'use client'; // App Router only

import { useState } from 'react';
import { CNPInput } from '@carpat/react';

export default function Page() {
  const [cnp, setCnp] = useState('');

  return <CNPInput value={cnp} onChange={setCnp} label="CNP" />;
}
```
