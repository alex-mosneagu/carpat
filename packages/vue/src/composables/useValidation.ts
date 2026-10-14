import { ref, computed } from 'vue';
import type { ValidationResult } from '@carpat/core';

export function useValidation<T extends ValidationResult>(validator: (value: string) => T) {
  const value = ref('');
  const isDirty = ref(false);
  const isTouched = ref(false);

  const result = computed(() => validator(value.value));
  const isValid = computed(() => result.value.valid);
  const error = computed(() => (isTouched.value && !isValid.value ? result.value.error : ''));

  const handleInput = (newValue: string) => {
    value.value = newValue;
    isDirty.value = true;
  };

  const handleBlur = () => {
    isTouched.value = true;
  };

  const reset = () => {
    value.value = '';
    isDirty.value = false;
    isTouched.value = false;
  };

  return {
    value,
    result,
    isValid,
    error,
    isDirty,
    isTouched,
    handleInput,
    handleBlur,
    reset,
  };
}
