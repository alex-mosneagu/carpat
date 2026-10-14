import React, { useState, useEffect, useMemo, useId } from 'react';
import { validateIBAN, formatIBAN } from '@carpat/core';

export interface IBANInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onValidate?: (isValid: boolean) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  showError?: boolean;
  showBankInfo?: boolean;
  autoFormat?: boolean;
  containerClass?: string;
  labelClass?: string;
  inputClass?: string;
  errorClass?: string;
  infoClass?: string;
}

export const IBANInput: React.FC<IBANInputProps> = ({
  value = '',
  onChange,
  onValidate,
  label,
  placeholder = 'IBAN (24 caractere)',
  disabled = false,
  required = false,
  showError = true,
  showBankInfo = true,
  autoFormat = true,
  containerClass = 'carpat-field',
  labelClass = 'carpat-label',
  inputClass = 'carpat-input',
  errorClass = 'carpat-error',
  infoClass = 'carpat-info',
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [isTouched, setIsTouched] = useState(false);
  const inputId = useId();

  const result = useMemo(() => validateIBAN(localValue), [localValue]);
  const error = isTouched && !result.valid ? result.error : '';

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    onValidate?.(result.valid);
  }, [result.valid, onValidate]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.toUpperCase();
    setLocalValue(newValue);
    onChange?.(newValue);
  };

  const handleBlur = () => {
    setIsTouched(true);
    if (result.valid && autoFormat) {
      const formatted = formatIBAN(localValue);
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
        type="text"
        value={localValue}
        onChange={handleInput}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={inputClass}
        maxLength={34}
      />
      {error && showError && <p className={errorClass}>{error}</p>}
      {result.valid && result.bankName && showBankInfo && (
        <p className={infoClass}>Bancă: {result.bankName}</p>
      )}
    </div>
  );
};
