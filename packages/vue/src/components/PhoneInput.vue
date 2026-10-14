<template>
  <div :class="containerClass">
    <label v-if="label" :for="inputId" :class="labelClass">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>
    <input
      :id="inputId"
      v-model="localValue"
      type="tel"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="inputClass"
      maxlength="20"
      @input="onInput"
      @blur="onBlur"
    />
    <p v-if="error && showError" :class="errorClass">{{ error }}</p>
    <p v-if="result.valid && result.type && showType" :class="infoClass">
      {{ result.type === 'mobile' ? 'Mobil' : 'Fix' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { validatePhone, formatPhone } from '@carpat/core';

export interface PhoneInputProps {
  modelValue?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  showError?: boolean;
  showType?: boolean;
  autoFormat?: boolean;
  includeCountryCode?: boolean;
  containerClass?: string;
  labelClass?: string;
  inputClass?: string;
  errorClass?: string;
  infoClass?: string;
}

const props = withDefaults(defineProps<PhoneInputProps>(), {
  modelValue: '',
  placeholder: 'Număr de telefon',
  showError: true,
  showType: false,
  autoFormat: true,
  includeCountryCode: false,
  containerClass: 'carpat-field',
  labelClass: 'carpat-label',
  inputClass: 'carpat-input',
  errorClass: 'carpat-error',
  infoClass: 'carpat-info',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'validate', isValid: boolean): void;
}>();

const localValue = ref(props.modelValue);
const isTouched = ref(false);
const inputId = computed(() => `phone-input-${Math.random().toString(36).substr(2, 9)}`);

const result = computed(() => validatePhone(localValue.value));
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
  localValue.value = target.value;
  emit('update:modelValue', localValue.value);
};

const onBlur = () => {
  isTouched.value = true;
  if (result.value.valid && props.autoFormat) {
    localValue.value = formatPhone(localValue.value, props.includeCountryCode);
    emit('update:modelValue', localValue.value);
  }
};
</script>
