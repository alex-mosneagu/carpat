# @carpat/react

React components for Romanian form inputs, built on top of `@carpat/core`.

## Installation

```bash
npm install @carpat/react @carpat/core
# or
pnpm add @carpat/react @carpat/core
```

## Usage

```tsx
import { CNPInput, IBANInput, PhoneInput } from '@carpat/react';
import { useState } from 'react';

function App() {
  const [cnp, setCnp] = useState('');
  const [iban, setIban] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <div>
      <CNPInput 
        value={cnp} 
        onChange={setCnp} 
        label="CNP" 
        showInfo 
        required
      />
      
      <IBANInput 
        value={iban} 
        onChange={setIban} 
        label="IBAN" 
        showBankInfo
      />
      
      <PhoneInput 
        value={phone} 
        onChange={setPhone} 
        label="Telefon"
      />
    </div>
  );
}
```

## Components

### CNPInput

```tsx
<CNPInput
  value={cnp}
  onChange={setCnp}
  label="CNP"
  placeholder="CNP (13 cifre)"
  required
  showInfo
  autoFormat={false}
  onValidate={(isValid) => console.log(isValid)}
/>
```

### CUIInput

```tsx
<CUIInput
  value={cui}
  onChange={setCui}
  label="CUI/CIF"
  includePrefix
/>
```

### IBANInput

```tsx
<IBANInput
  value={iban}
  onChange={setIban}
  label="IBAN"
  showBankInfo
  autoFormat
/>
```

### PhoneInput

```tsx
<PhoneInput
  value={phone}
  onChange={setPhone}
  label="Telefon"
  showType
  includeCountryCode={false}
/>
```

### CountySelect & LocalitySelect

```tsx
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
    value,
    setValue,
    result,
    isValid,
    error,
    isDirty,
    isTouched,
    handleChange,
    handleBlur,
    reset,
  } = useValidation(validateCNP);

  return (
    <input
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      onBlur={handleBlur}
    />
  );
}
```

## Styling

All components use unstyled CSS classes. See the Vue README for example styles.

## License

MIT © Alex Mosneagu
