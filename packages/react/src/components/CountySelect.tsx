import React, { useState, useEffect, useMemo, useId } from 'react';
import { COUNTIES } from '@carpat/core/data';

export interface CountySelectProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  showError?: boolean;
  containerClass?: string;
  labelClass?: string;
  inputClass?: string;
  errorClass?: string;
}

export const CountySelect: React.FC<CountySelectProps> = ({
  value = '',
  onChange,
  label,
  placeholder = 'Selectează județul',
  disabled = false,
  required = false,
  showError = true,
  containerClass = 'carpat-field',
  labelClass = 'carpat-label',
  inputClass = 'carpat-select',
  errorClass = 'carpat-error',
}) => {
  const [localValue, setLocalValue] = useState(value);
  const inputId = useId();

  const error = useMemo(() => {
    if (required && !localValue) {
      return 'Județul este obligatoriu';
    }
    return '';
  }, [required, localValue]);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={containerClass}>
      {label && (
        <label htmlFor={inputId} className={labelClass}>
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <select
        id={inputId}
        value={localValue}
        onChange={handleChange}
        disabled={disabled}
        className={inputClass}
      >
        <option value="">{placeholder}</option>
        {COUNTIES.map((county) => (
          <option key={county.code} value={county.code}>
            {county.name} ({county.auto})
          </option>
        ))}
      </select>
      {error && showError && <p className={errorClass}>{error}</p>}
    </div>
  );
};
