import React, { useState, useEffect, useMemo, useId } from 'react';
import { validateCNP, formatCNP } from '@carpat/core';

export interface CNPInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onValidate?: (isValid: boolean) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  showInfo?: boolean;
  showError?: boolean;
  autoFormat?: boolean;
  containerClass?: string;
  labelClass?: string;
  inputClass?: string;
  errorClass?: string;
  infoClass?: string;
}

export const CNPInput: React.FC<CNPInputProps> = ({
  value = '',
  onChange,
  onValidate,
  label,
  placeholder = 'CNP (13 cifre)',
  disabled = false,
  required = false,
  showInfo = false,
  showError = true,
  autoFormat = false,
  containerClass = 'carpat-field',
  labelClass = 'carpat-label',
  inputClass = 'carpat-input',
  errorClass = 'carpat-error',
  infoClass = 'carpat-info',
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [isTouched, setIsTouched] = useState(false);
  const inputId = useId();

  const result = useMemo(() => validateCNP(localValue), [localValue]);
  const error = isTouched && !result.valid ? result.error : '';

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    onValidate?.(result.valid);
  }, [result.valid, onValidate]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value.replace(/\D/g, '');

    if (autoFormat && newValue.length === 13) {
      newValue = formatCNP(newValue);
    }

    setLocalValue(newValue);
    onChange?.(newValue);
  };

  const handleBlur = () => {
    setIsTouched(true);
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('ro-RO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
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
        maxLength={17}
      />
      {error && showError && <p className={errorClass}>{error}</p>}
      {result.valid && result.data && showInfo && (
        <div className={infoClass}>
          <p>
            Sex:{' '}
            {result.data.sex === 'M'
              ? 'Masculin'
              : result.data.sex === 'F'
                ? 'Feminin'
                : 'Nespecificat'}
          </p>
          <p>Data nașterii: {formatDate(result.data.birthDate)}</p>
          <p>Județ: {result.data.county}</p>
        </div>
      )}
    </div>
  );
};
