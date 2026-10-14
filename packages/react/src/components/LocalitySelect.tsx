import React, { useState, useEffect, useMemo, useId, useRef } from 'react';
import { getLocalitiesByCounty, getLocalityBySiruta, searchLocalities } from '@carpat/core/data';
import type { Locality } from '@carpat/core';

export interface LocalitySelectProps {
  value?: string;
  countyCode?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  requireCounty?: boolean;
  showError?: boolean;
  containerClass?: string;
  labelClass?: string;
  inputClass?: string;
  errorClass?: string;
  dropdownClass?: string;
}

function labelFor(siruta: string) {
  return getLocalityBySiruta(siruta)?.name ?? '';
}

export const LocalitySelect: React.FC<LocalitySelectProps> = ({
  value = '',
  countyCode,
  onChange,
  label,
  placeholder = 'Caută localitatea…',
  disabled = false,
  required = false,
  requireCounty = true,
  showError = true,
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
  const prevCounty = useRef(countyCode);
  const inputId = useId();
  const listboxId = useId();

  const isDisabled = disabled || (requireCounty && !countyCode);
  const effectivePlaceholder =
    requireCounty && !countyCode ? 'Selectează mai întâi județul' : placeholder;

  const selectedLabel = labelFor(localValue);
  const isFiltering = searchQuery.trim().length > 0 && searchQuery.trim() !== selectedLabel;

  const options = useMemo(() => {
    if (!countyCode && requireCounty) return [];
    if (isFiltering) return searchLocalities(searchQuery, countyCode);
    return countyCode ? getLocalitiesByCounty(countyCode) : [];
  }, [countyCode, requireCounty, isFiltering, searchQuery]);

  const error = useMemo(() => {
    if (requireCounty && !countyCode) return 'Selectați mai întâi județul';
    if (required && !localValue) return 'Localitatea este obligatorie';
    return '';
  }, [required, requireCounty, localValue, countyCode]);

  useEffect(() => {
    setLocalValue(value);
    if (!openRef.current) {
      setSearchQuery(labelFor(value));
    }
  }, [value]);

  useEffect(() => {
    if (prevCounty.current === countyCode) return;
    prevCounty.current = countyCode;
    setLocalValue('');
    setSearchQuery('');
    setShowDropdown(false);
    openRef.current = false;
    onChange?.('');
  }, [countyCode, onChange]);

  const selectLocality = (locality: Locality) => {
    setLocalValue(locality.siruta);
    setSearchQuery(locality.name);
    setShowDropdown(false);
    openRef.current = false;
    onChange?.(locality.siruta);
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
          placeholder={effectivePlaceholder}
          disabled={isDisabled}
          className={inputClass}
          autoComplete="off"
          onChange={(e) => {
            if (isDisabled) return;
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
            if (isDisabled) return;
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
            if (isDisabled) return;
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setShowDropdown(true);
              setActiveIndex((i) => Math.min(i + 1, Math.max(options.length - 1, 0)));
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              setActiveIndex((i) => Math.max(i - 1, 0));
            } else if (e.key === 'Enter' && showDropdown && options[activeIndex]) {
              e.preventDefault();
              selectLocality(options[activeIndex]);
            } else if (e.key === 'Escape') {
              setShowDropdown(false);
            }
          }}
        />
        {localValue && !isDisabled && (
          <button
            type="button"
            className="carpat-combobox-clear"
            aria-label="Șterge localitatea"
            tabIndex={-1}
            onMouseDown={(e) => {
              e.preventDefault();
              clear();
            }}
          >
            ×
          </button>
        )}
        {showDropdown && !isDisabled && options.length > 0 && (
          <ul id={listboxId} role="listbox" className={dropdownClass}>
            {options.map((locality, index) => (
              <li
                key={locality.siruta}
                role="option"
                aria-selected={locality.siruta === localValue}
                className={[
                  index === activeIndex ? 'is-active' : '',
                  locality.siruta === localValue ? 'is-selected' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onMouseDown={(e) => {
                  e.preventDefault();
                  selectLocality(locality);
                }}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <span className="carpat-option-title">{locality.name}</span>
                <span className="carpat-option-meta">{locality.type}</span>
              </li>
            ))}
          </ul>
        )}
        {showDropdown && !isDisabled && isFiltering && options.length === 0 && (
          <p className="carpat-empty">Nicio localitate găsită</p>
        )}
      </div>
      {error && showError && <p className={errorClass}>{error}</p>}
    </div>
  );
};
