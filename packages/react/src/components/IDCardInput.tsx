import React, { useState, useEffect, useMemo, useId } from 'react';
import { validateIDCard } from '@carpat/core';

export interface IDCardInputProps {
  series?: string;
  number?: string;
  onSeriesChange?: (value: string) => void;
  onNumberChange?: (value: string) => void;
  onValidate?: (isValid: boolean) => void;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  showError?: boolean;
  showInfo?: boolean;
  containerClass?: string;
  labelClass?: string;
  inputClass?: string;
  errorClass?: string;
  infoClass?: string;
}

export const IDCardInput: React.FC<IDCardInputProps> = ({
  series = '',
  number = '',
  onSeriesChange,
  onNumberChange,
  onValidate,
  label = 'Carte de identitate',
  disabled = false,
  required = false,
  showError = true,
  showInfo = false,
  containerClass = 'carpat-field',
  labelClass = 'carpat-label',
  inputClass = 'carpat-input',
  errorClass = 'carpat-error',
  infoClass = 'carpat-info',
}) => {
  const [seriesValue, setSeriesValue] = useState(series);
  const [numberValue, setNumberValue] = useState(number);
  const [isTouched, setIsTouched] = useState(false);
  const seriesId = useId();
  const numberId = useId();

  const result = useMemo(
    () => validateIDCard(seriesValue, numberValue),
    [seriesValue, numberValue]
  );

  const error = useMemo(() => {
    if (!isTouched) return '';
    if (required && !seriesValue && !numberValue) {
      return 'Seria și numărul sunt obligatorii';
    }
    if (!seriesValue && !numberValue) return '';
    return result.valid ? '' : result.error;
  }, [isTouched, required, seriesValue, numberValue, result]);

  useEffect(() => {
    setSeriesValue(series);
  }, [series]);

  useEffect(() => {
    setNumberValue(number);
  }, [number]);

  useEffect(() => {
    onValidate?.(result.valid);
  }, [result.valid, onValidate]);

  return (
    <div className={containerClass}>
      {label && (
        <label className={labelClass}>
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <div className="carpat-idcard-row">
        <div className="carpat-idcard-series">
          <label htmlFor={seriesId} className="carpat-idcard-sublabel">
            Serie
          </label>
          <input
            id={seriesId}
            type="text"
            value={seriesValue}
            placeholder="CJ"
            disabled={disabled}
            className={inputClass}
            maxLength={2}
            autoComplete="off"
            spellCheck={false}
            onChange={(e) => {
              const next = e.target.value
                .toUpperCase()
                .replace(/[^A-Z]/g, '')
                .slice(0, 2);
              setSeriesValue(next);
              onSeriesChange?.(next);
            }}
            onBlur={() => setIsTouched(true)}
          />
        </div>
        <div className="carpat-idcard-number">
          <label htmlFor={numberId} className="carpat-idcard-sublabel">
            Număr
          </label>
          <input
            id={numberId}
            type="text"
            inputMode="numeric"
            value={numberValue}
            placeholder="123456"
            disabled={disabled}
            className={inputClass}
            maxLength={6}
            autoComplete="off"
            onChange={(e) => {
              const next = e.target.value.replace(/\D/g, '').slice(0, 6);
              setNumberValue(next);
              onNumberChange?.(next);
            }}
            onBlur={() => setIsTouched(true)}
          />
        </div>
      </div>
      {error && showError && <p className={errorClass}>{error}</p>}
      {result.valid && showInfo && (
        <div className={infoClass}>
          <p>
            {result.series} {result.number}
          </p>
        </div>
      )}
    </div>
  );
};
