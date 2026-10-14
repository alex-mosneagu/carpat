import React, { useState, useEffect, useMemo, useId } from 'react';
import { validatePhone, formatPhone } from '@carpat/core';

export interface PhoneInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onValidate?: (isValid: boolean) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  showError?: boolean;
  showType?: boolean;
  autoFormat?: boolean;
  includeCountryCode?: boolean;
  containerClass?: string;
  labelClass?: string;
  inputClass?: string;
  errorClass?: string;
  infoClass?: string;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value = '',
  onChange,
  onValidate,
  label,
  placeholder = 'Număr de telefon',
  disabled = false,
  required = false,
  showError = true,
  showType = false,
  autoFormat = true,
  includeCountryCode = false,
  containerClass = 'carpat-field',
  labelClass = 'carpat-label',
  inputClass = 'carpat-input',
  errorClass = 'carpat-error',
  infoClass = 'carpat-info',
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [isTouched, setIsTouched] = useState(false);
  const inputId = useId();

  const result = useMemo(() => validatePhone(localValue), [localValue]);
  const error = isTouched && !result.valid ? result.error : '';

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    onValidate?.(result.valid);
  }, [result.valid, onValidate]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange?.(newValue);
  };

  const handleBlur = () => {
    setIsTouched(true);
    if (result.valid && autoFormat) {
      const formatted = formatPhone(localValue, includeCountryCode);
      setLocalValue(formatted);
      onChange?.(formatted);
    }
  };

  return (
    <div className={containerClass}>
      {label && (
        <label htmlFor={inputId} className={labelClass}>
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <input
        id={inputId}
        type="tel"
        value={localValue}
        onChange={handleInput}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={inputClass}
        maxLength={20}
      />
      {error && showError && <p className={errorClass}>{error}</p>}
      {result.valid && result.type && showType && (
        <p className={infoClass}>{result.type === 'mobile' ? 'Mobil' : 'Fix'}</p>
      )}
    </div>
  );
};
