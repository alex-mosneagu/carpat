import React, { useState, useEffect, useMemo, useId } from 'react';
import { validateCUI, formatCUI } from '@carpat/core';

export interface CUIInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onValidate?: (isValid: boolean) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  showError?: boolean;
  includePrefix?: boolean;
  containerClass?: string;
  labelClass?: string;
  inputClass?: string;
  errorClass?: string;
}

export const CUIInput: React.FC<CUIInputProps> = ({
  value = '',
  onChange,
  onValidate,
  label,
  placeholder = 'CUI/CIF',
  disabled = false,
  required = false,
  showError = true,
  includePrefix = true,
  containerClass = 'carpat-field',
  labelClass = 'carpat-label',
  inputClass = 'carpat-input',
  errorClass = 'carpat-error',
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [isTouched, setIsTouched] = useState(false);
  const inputId = useId();

  const result = useMemo(() => validateCUI(localValue), [localValue]);
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
    if (result.valid && includePrefix) {
      const formatted = formatCUI(localValue);
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
        maxLength={12}
      />
      {error && showError && <p className={errorClass}>{error}</p>}
    </div>
  );
};
