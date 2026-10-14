<template>
  <div :class="containerClass">
    <label v-if="label" :for="inputId" :class="labelClass">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>
    <select
      :id="inputId"
      v-model="localValue"
      :disabled="disabled"
      :class="inputClass"
      @change="onChange"
    >
      <option value="">{{ placeholder }}</option>
      <option v-for="county in counties" :key="county.code" :value="county.code">
        {{ county.name }} ({{ county.auto }})
      </option>
    </select>
    <p v-if="error && showError" :class="errorClass">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { COUNTIES } from '@carpat/core/data';

export interface CountySelectProps {
  modelValue?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  showError?: boolean;
  containerClass?: string;
  labelClass?: string;
  inputClass?: string;
  errorClass?: string;
}

const props = withDefaults(defineProps<CountySelectProps>(), {
  modelValue: '',
  placeholder: 'Selectează județul',
  showError: true,
  containerClass: 'carpat-field',
  labelClass: 'carpat-label',
  inputClass: 'carpat-select',
  errorClass: 'carpat-error',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const localValue = ref(props.modelValue);
const inputId = computed(() => `county-select-${Math.random().toString(36).substr(2, 9)}`);
const counties = COUNTIES;

const error = computed(() => {
  if (props.required && !localValue.value) {
    return 'Județul este obligatoriu';
  }
  return '';
});

watch(
  () => props.modelValue,
  (newValue) => {
    localValue.value = newValue;
  }
);

const onChange = () => {
  emit('update:modelValue', localValue.value);
};
</script>
