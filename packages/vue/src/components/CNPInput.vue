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
      maxlength="17"
      @input="onInput"
      @blur="onBlur"
    />
    <p v-if="error && showError" :class="errorClass">{{ error }}</p>
    <div v-if="result.valid && result.data && showInfo" :class="infoClass">
      <p>
        Sex:
        {{
          result.data.sex === 'M'
            ? 'Masculin'
            : result.data.sex === 'F'
              ? 'Feminin'
              : 'Nespecificat'
        }}
      </p>
      <p>Data nașterii: {{ formatDate(result.data.birthDate) }}</p>
      <p>Județ: {{ result.data.county }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { validateCNP, formatCNP } from '@carpat/core';

export interface CNPInputProps {
  modelValue?: string;
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

const props = withDefaults(defineProps<CNPInputProps>(), {
  modelValue: '',
  placeholder: 'CNP (13 cifre)',
  showInfo: false,
  showError: true,
  autoFormat: false,
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
const inputId = computed(() => `cnp-input-${Math.random().toString(36).substr(2, 9)}`);

const result = computed(() => validateCNP(localValue.value));
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
  let value = target.value.replace(/\D/g, '');

  if (props.autoFormat && value.length === 13) {
    value = formatCNP(value);
  }

  localValue.value = value;
  emit('update:modelValue', value);
};

const onBlur = () => {
  isTouched.value = true;
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('ro-RO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};
</script>
