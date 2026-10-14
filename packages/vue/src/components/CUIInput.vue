<template>
  <div :class="containerClass">
    <label v-if="label" :for="inputId" :class="labelClass">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>
    <input
      :id="inputId"
      v-model="localValue"
      type="text"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="inputClass"
      maxlength="12"
      @input="onInput"
      @blur="onBlur"
    />
    <p v-if="error && showError" :class="errorClass">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { validateCUI, formatCUI } from '@carpat/core';

export interface CUIInputProps {
  modelValue?: string;
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

const props = withDefaults(defineProps<CUIInputProps>(), {
  modelValue: '',
  placeholder: 'CUI/CIF',
  showError: true,
  includePrefix: true,
  containerClass: 'carpat-field',
  labelClass: 'carpat-label',
  inputClass: 'carpat-input',
  errorClass: 'carpat-error',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'validate', isValid: boolean): void;
}>();

const localValue = ref(props.modelValue);
const isTouched = ref(false);
const inputId = computed(() => `cui-input-${Math.random().toString(36).substr(2, 9)}`);

const result = computed(() => validateCUI(localValue.value));
const error = computed(() => (isTouched.value && !result.value.valid ? result.value.error : ''));

watch(
  () => props.modelValue,
  (newValue) => {
    localValue.value = newValue;
  }
);

watch(result, (newResult) => {
  emit('validate', newResult.valid);
});

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  localValue.value = target.value.toUpperCase();
  emit('update:modelValue', localValue.value);
};

const onBlur = () => {
  isTouched.value = true;
  if (result.value.valid && props.includePrefix) {
    localValue.value = formatCUI(localValue.value);
    emit('update:modelValue', localValue.value);
  }
};
</script>
