import React, { useState, useEffect, useMemo, useId } from 'react';
import { getLocalitiesByCounty, searchLocalities } from '@carpat/core/data';

export interface LocalitySelectProps {
  value?: string;
  countyCode?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  requireCounty?: boolean;
  searchable?: boolean;
  showError?: boolean;
  containerClass?: string;
  labelClass?: string;
  inputClass?: string;
  errorClass?: string;
  dropdownClass?: string;
}

export const LocalitySelect: React.FC<LocalitySelectProps> = ({
  value = '',
  countyCode,
  onChange,
  label,
  placeholder = 'Selectează localitatea',
  disabled = false,
  required = false,
  requireCounty = true,
  searchable = true,
  showError = true,
  containerClass = 'carpat-field',
  labelClass = 'carpat-label',
  inputClass = 'carpat-input',
  errorClass = 'carpat-error',
  dropdownClass = 'carpat-dropdown',
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const inputId = useId();

  const filteredLocalities = useMemo(() => {
    if (searchable && searchQuery.length > 0) {
      return searchLocalities(searchQuery, countyCode);
    } else if (countyCode) {
      return getLocalitiesByCounty(countyCode);
    }
    return [];
  }, [searchable, searchQuery, countyCode]);

  const error = useMemo(() => {
    if (required && !localValue) {
      return 'Localitatea este obligatorie';
    }
    if (requireCounty && !countyCode) {
      return 'Selectați mai întâi județul';
    }
    return '';
  }, [required, requireCounty, localValue, countyCode]);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    setLocalValue('');
    setSearchQuery('');
    onChange?.('');
  }, [countyCode, onChange]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowDropdown(true);
  };

  const selectLocality = (siruta: string, name: string) => {
    setLocalValue(siruta);
    setSearchQuery(name);
    setShowDropdown(false);
    onChange?.(siruta);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange?.(newValue);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  };

  return (
    <div className={containerClass}>
      {label && (
        <label htmlFor={inputId} className={labelClass}>
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      {searchable ? (
        <>
          <input
            id={inputId}
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            onFocus={() => setShowDropdown(true)}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled || (!countyCode && requireCounty)}
            className={inputClass}
          />
          {showDropdown && filteredLocalities.length > 0 && (
            <ul className={dropdownClass}>
              {filteredLocalities.map((locality) => (
                <li
                  key={locality.siruta}
                  onMouseDown={() => selectLocality(locality.siruta, locality.name)}
                >
                  {locality.name} ({locality.type})
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <select
          id={inputId}
          value={localValue}
          onChange={handleSelectChange}
          disabled={disabled || (!countyCode && requireCounty)}
          className={inputClass}
        >
          <option value="">{placeholder}</option>
          {filteredLocalities.map((locality) => (
            <option key={locality.siruta} value={locality.siruta}>
              {locality.name} ({locality.type})
            </option>
          ))}
        </select>
      )}
      {error && showError && <p className={errorClass}>{error}</p>}
    </div>
  );
};
