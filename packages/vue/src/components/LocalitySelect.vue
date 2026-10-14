<template>
  <div :class="containerClass">
    <label v-if="label" :for="inputId" :class="labelClass">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>
    <input
      v-if="searchable"
      :id="inputId"
      v-model="searchQuery"
      type="text"
      :placeholder="placeholder"
      :disabled="disabled || (!countyCode && requireCounty)"
      :class="inputClass"
      @input="onSearch"
      @focus="showDropdown = true"
      @blur="onBlur"
    />
    <select
      v-else
      :id="inputId"
      v-model="localValue"
      :disabled="disabled || (!countyCode && requireCounty)"
      :class="inputClass"
      @change="onChange"
    >
      <option value="">{{ placeholder }}</option>
      <option
        v-for="locality in filteredLocalities"
        :key="locality.siruta"
        :value="locality.siruta"
      >
        {{ locality.name }} ({{ locality.type }})
      </option>
    </select>
    <ul v-if="searchable && showDropdown && filteredLocalities.length > 0" :class="dropdownClass">
      <li
        v-for="locality in filteredLocalities"
        :key="locality.siruta"
        @mousedown="selectLocality(locality.siruta, locality.name)"
      >
        {{ locality.name }} ({{ locality.type }})
      </li>
    </ul>
    <p v-if="error && showError" :class="errorClass">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { getLocalitiesByCounty, searchLocalities } from '@carpat/core/data';

export interface LocalitySelectProps {
  modelValue?: string;
  countyCode?: string;
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

const props = withDefaults(defineProps<LocalitySelectProps>(), {
  modelValue: '',
  placeholder: 'Selectează localitatea',
  requireCounty: true,
  searchable: true,
  showError: true,
  containerClass: 'carpat-field',
  labelClass: 'carpat-label',
  inputClass: 'carpat-input',
  errorClass: 'carpat-error',
  dropdownClass: 'carpat-dropdown',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const localValue = ref(props.modelValue);
const searchQuery = ref('');
const showDropdown = ref(false);
const inputId = computed(() => `locality-select-${Math.random().toString(36).substr(2, 9)}`);

const filteredLocalities = computed(() => {
  if (props.searchable && searchQuery.value.length > 0) {
    return searchLocalities(searchQuery.value, props.countyCode);
  } else if (props.countyCode) {
    return getLocalitiesByCounty(props.countyCode);
  }
  return [];
});

const error = computed(() => {
  if (props.required && !localValue.value) {
    return 'Localitatea este obligatorie';
  }
  if (props.requireCounty && !props.countyCode) {
    return 'Selectați mai întâi județul';
  }
  return '';
});

watch(
  () => props.modelValue,
  (newValue) => {
    localValue.value = newValue;
  }
);

watch(
  () => props.countyCode,
  () => {
    localValue.value = '';
    searchQuery.value = '';
    emit('update:modelValue', '');
  }
);

const onSearch = () => {
  showDropdown.value = true;
};

const selectLocality = (siruta: string, name: string) => {
  localValue.value = siruta;
  searchQuery.value = name;
  showDropdown.value = false;
  emit('update:modelValue', siruta);
};

const onChange = () => {
  emit('update:modelValue', localValue.value);
};

const onBlur = () => {
  setTimeout(() => {
    showDropdown.value = false;
  }, 200);
};
</script>
