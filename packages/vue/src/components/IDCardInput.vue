<template>
  <div :class="containerClass">
    <label v-if="label" :class="labelClass">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>
    <div class="carpat-idcard-row">
      <div class="carpat-idcard-series">
        <label :for="seriesId" class="carpat-idcard-sublabel">Serie</label>
        <input
          :id="seriesId"
          :value="seriesValue"
          type="text"
          placeholder="CJ"
          :disabled="disabled"
          :class="inputClass"
          maxlength="2"
          autocomplete="off"
          spellcheck="false"
          @input="onSeriesInput"
          @blur="onBlur"
        />
      </div>
      <div class="carpat-idcard-number">
        <label :for="numberId" class="carpat-idcard-sublabel">Număr</label>
        <input
          :id="numberId"
          :value="numberValue"
          type="text"
          inputmode="numeric"
          placeholder="123456"
          :disabled="disabled"
          :class="inputClass"
          maxlength="6"
          autocomplete="off"
          @input="onNumberInput"
          @blur="onBlur"
        />
      </div>
    </div>
    <p v-if="error && showError" :class="errorClass">{{ error }}</p>
    <div v-if="result.valid && showInfo" :class="infoClass">
      <p>{{ result.series }} {{ result.number }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { validateIDCard } from '@carpat/core';

export interface IDCardInputProps {
  series?: string;
  number?: string;
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

const props = withDefaults(defineProps<IDCardInputProps>(), {
  series: '',
  number: '',
  label: 'Carte de identitate',
  showError: true,
  showInfo: false,
  containerClass: 'carpat-field',
  labelClass: 'carpat-label',
  inputClass: 'carpat-input',
  errorClass: 'carpat-error',
  infoClass: 'carpat-info',
});

const emit = defineEmits<{
  (e: 'update:series', value: string): void;
  (e: 'update:number', value: string): void;
  (e: 'validate', isValid: boolean): void;
}>();

const seriesValue = ref(props.series);
const numberValue = ref(props.number);
const isTouched = ref(false);
const uid = Math.random().toString(36).slice(2, 9);
const seriesId = `idcard-series-${uid}`;
const numberId = `idcard-number-${uid}`;

const result = computed(() => validateIDCard(seriesValue.value, numberValue.value));
const error = computed(() => {
  if (!isTouched.value) return '';
  if (props.required && !seriesValue.value && !numberValue.value) {
    return 'Seria și numărul sunt obligatorii';
  }
  if (!seriesValue.value && !numberValue.value) return '';
  return result.value.valid ? '' : result.value.error;
});

watch(
  () => props.series,
  (v) => {
    seriesValue.value = v;
  }
);
watch(
  () => props.number,
  (v) => {
    numberValue.value = v;
  }
);
watch(result, (r) => emit('validate', r.valid));

const onSeriesInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 2);
  seriesValue.value = value;
  emit('update:series', value);
};

const onNumberInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value.replace(/\D/g, '').slice(0, 6);
  numberValue.value = value;
  emit('update:number', value);
};

const onBlur = () => {
  isTouched.value = true;
};
</script>

<style scoped>
.carpat-idcard-row {
  display: grid;
  grid-template-columns: 5.5rem 1fr;
  gap: 0.75rem;
  align-items: end;
}

.carpat-idcard-sublabel {
  display: block;
  margin-bottom: 0.35rem;
  font-size: 0.8rem;
  font-weight: 500;
  opacity: 0.75;
}

.carpat-idcard-series :deep(.carpat-input),
.carpat-idcard-series .carpat-input {
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 600;
}
</style>
