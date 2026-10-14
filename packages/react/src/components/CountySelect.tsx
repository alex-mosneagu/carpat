import React, { useState, useEffect, useMemo, useId, useRef } from 'react';
import { getCountyByCode, searchCounties } from '@carpat/core/data';
import type { County } from '@carpat/core';

export interface CountySelectProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  showError?: boolean;
  includeSectors?: boolean;
  containerClass?: string;
  labelClass?: string;
  inputClass?: string;
  errorClass?: string;
  dropdownClass?: string;
}

function formatCounty(county: County) {
  return `${county.name} (${county.auto})`;
}

function labelFor(code: string) {
  const county = getCountyByCode(code);
  return county ? formatCounty(county) : '';
}

export const CountySelect: React.FC<CountySelectProps> = ({
  value = '',
  onChange,
  label,
  placeholder = 'Caută județul…',
  disabled = false,
  required = false,
  showError = true,
  includeSectors = false,
  containerClass = 'carpat-field',
  labelClass = 'carpat-label',
  inputClass = 'carpat-input',
  errorClass = 'carpat-error',
  dropdownClass = 'carpat-dropdown',
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [searchQuery, setSearchQuery] = useState(labelFor(value));
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const openRef = useRef(false);
  const inputId = useId();
  const listboxId = useId();

  const selectedLabel = labelFor(localValue);
  const isFiltering =
    searchQuery.trim().length > 0 && searchQuery.trim() !== selectedLabel;

  const options = useMemo(
    () =>
      searchCounties(isFiltering ? searchQuery : '', {
        includeSectors,
        limit: 48,
      }),
    [isFiltering, searchQuery, includeSectors]
  );

  const error = useMemo(() => {
    if (required && !localValue) return 'Județul este obligatoriu';
    return '';
  }, [required, localValue]);

  useEffect(() => {
    setLocalValue(value);
    if (!openRef.current) {
      setSearchQuery(labelFor(value));
    }
  }, [value]);

  const selectCounty = (county: County) => {
    setLocalValue(county.code);
    setSearchQuery(formatCounty(county));
    setShowDropdown(false);
    openRef.current = false;
    onChange?.(county.code);
  };

  const clear = () => {
    setLocalValue('');
    setSearchQuery('');
    setShowDropdown(true);
    openRef.current = true;
    setActiveIndex(0);
    onChange?.('');
  };

  return (
    <div className={containerClass}>
      {label && (
        <label htmlFor={inputId} className={labelClass}>
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <div className="carpat-combobox">
        <input
          id={inputId}
          type="text"
          role="combobox"
          aria-expanded={showDropdown}
          aria-autocomplete="list"
          aria-controls={listboxId}
          value={searchQuery}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClass}
          autoComplete="off"
          onChange={(e) => {
            const next = e.target.value;
            setSearchQuery(next);
            setShowDropdown(true);
            openRef.current = true;
            setActiveIndex(0);
            if (localValue && next !== selectedLabel) {
              setLocalValue('');
              onChange?.('');
            }
          }}
          onFocus={() => {
            setShowDropdown(true);
            openRef.current = true;
            setActiveIndex(0);
          }}
          onBlur={() => {
            setTimeout(() => {
              setShowDropdown(false);
              openRef.current = false;
              setSearchQuery(labelFor(localValue));
            }, 150);
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setShowDropdown(true);
              setActiveIndex((i) => Math.min(i + 1, Math.max(options.length - 1, 0)));
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              setActiveIndex((i) => Math.max(i - 1, 0));
            } else if (e.key === 'Enter' && showDropdown && options[activeIndex]) {
              e.preventDefault();
              selectCounty(options[activeIndex]);
            } else if (e.key === 'Escape') {
              setShowDropdown(false);
            }
          }}
        />
        {localValue && !disabled && (
          <button
            type="button"
            className="carpat-combobox-clear"
            aria-label="Șterge județul"
            tabIndex={-1}
            onMouseDown={(e) => {
              e.preventDefault();
              clear();
            }}
          >
            ×
          </button>
        )}
        {showDropdown && options.length > 0 && (
          <ul id={listboxId} role="listbox" className={dropdownClass}>
            {options.map((county, index) => (
              <li
                key={county.code}
                role="option"
                aria-selected={county.code === localValue}
                className={[
                  index === activeIndex ? 'is-active' : '',
                  county.code === localValue ? 'is-selected' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onMouseDown={(e) => {
                  e.preventDefault();
                  selectCounty(county);
                }}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <span className="carpat-option-title">{county.name}</span>
                <span className="carpat-option-meta">{county.auto}</span>
              </li>
            ))}
          </ul>
        )}
        {showDropdown && isFiltering && options.length === 0 && (
          <p className="carpat-empty">Niciun județ găsit</p>
        )}
      </div>
      {error && showError && <p className={errorClass}>{error}</p>}
    </div>
  );
};
