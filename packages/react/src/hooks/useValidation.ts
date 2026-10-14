import { useState, useCallback, useMemo } from 'react';
import type { ValidationResult } from '@carpat/core';

export function useValidation<T extends ValidationResult>(
  validator: (value: string) => T,
  initialValue = ''
) {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setIsDirty] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const result = useMemo(() => validator(value), [value, validator]);
  const isValid = result.valid;
  const error = isTouched && !isValid ? result.error : '';

  const handleChange = useCallback((newValue: string) => {
    setValue(newValue);
    setIsDirty(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsTouched(true);
  }, []);

  const reset = useCallback(() => {
    setValue('');
    setIsDirty(false);
    setIsTouched(false);
  }, []);

  return {
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
  };
}
