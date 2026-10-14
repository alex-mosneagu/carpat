<template>
  <div :class="containerClass">
    <label v-if="label" :for="inputId" :class="labelClass">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>
    <div class="carpat-combobox">
      <input
        :id="inputId"
        v-model="searchQuery"
        type="text"
        role="combobox"
        :aria-expanded="showDropdown"
        aria-autocomplete="list"
        :aria-controls="listboxId"
        :placeholder="effectivePlaceholder"
        :disabled="isDisabled"
        :class="inputClass"
        autocomplete="off"
        @input="onSearch"
        @focus="openDropdown"
        @keydown="onKeydown"
        @blur="onBlur"
      />
      <button
        v-if="localValue && !isDisabled"
        type="button"
        class="carpat-combobox-clear"
        aria-label="Șterge localitatea"
        tabindex="-1"
        @mousedown.prevent="clear"
      >
        ×
      </button>
      <ul
        v-if="showDropdown && !isDisabled && options.length > 0"
        :id="listboxId"
        role="listbox"
        :class="dropdownClass"
      >
        <li
          v-for="(locality, index) in options"
          :key="locality.siruta"
          role="option"
          :aria-selected="locality.siruta === localValue"
          :class="{
            'is-active': index === activeIndex,
            'is-selected': locality.siruta === localValue,
          }"
          @mousedown.prevent="selectLocality(locality)"
          @mouseenter="activeIndex = index"
        >
          <span class="carpat-option-title">{{ locality.name }}</span>
          <span class="carpat-option-meta">{{ locality.type }}</span>
        </li>
      </ul>
      <p v-else-if="showDropdown && !isDisabled && isFiltering" class="carpat-empty">
        Nicio localitate găsită
      </p>
    </div>
    <p v-if="error && showError" :class="errorClass">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import {
  getLocalitiesByCounty,
  getLocalityBySiruta,
  searchLocalities,
} from '@carpat/core/data';
import type { Locality } from '@carpat/core';

export interface LocalitySelectProps {
  modelValue?: string;
  countyCode?: string;
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

const props = withDefaults(defineProps<LocalitySelectProps>(), {
  modelValue: '',
  placeholder: 'Caută localitatea…',
  requireCounty: true,
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
const activeIndex = ref(0);
const uid = Math.random().toString(36).slice(2, 9);
const inputId = `locality-select-${uid}`;
const listboxId = `locality-list-${uid}`;

const isDisabled = computed(
  () => props.disabled || (props.requireCounty && !props.countyCode)
);

const effectivePlaceholder = computed(() => {
  if (props.requireCounty && !props.countyCode) return 'Selectează mai întâi județul';
  return props.placeholder;
});

function labelFor(siruta: string) {
  return getLocalityBySiruta(siruta)?.name ?? '';
}

const selectedLabel = computed(() => labelFor(localValue.value));

const isFiltering = computed(() => {
  const q = searchQuery.value.trim();
  return q.length > 0 && q !== selectedLabel.value;
});

const options = computed(() => {
  if (!props.countyCode && props.requireCounty) return [];
  if (isFiltering.value) {
    return searchLocalities(searchQuery.value, props.countyCode);
  }
  return props.countyCode ? getLocalitiesByCounty(props.countyCode) : [];
});

const error = computed(() => {
  if (props.requireCounty && !props.countyCode) return 'Selectați mai întâi județul';
  if (props.required && !localValue.value) return 'Localitatea este obligatorie';
  return '';
});

watch(
  () => props.modelValue,
  (siruta) => {
    localValue.value = siruta;
    if (!showDropdown.value) {
      searchQuery.value = labelFor(siruta);
    }
  },
  { immediate: true }
);

watch(
  () => props.countyCode,
  () => {
    localValue.value = '';
    searchQuery.value = '';
    showDropdown.value = false;
    emit('update:modelValue', '');
  }
);

const onSearch = () => {
  if (isDisabled.value) return;
  showDropdown.value = true;
  activeIndex.value = 0;
  if (localValue.value && searchQuery.value !== selectedLabel.value) {
    localValue.value = '';
    emit('update:modelValue', '');
  }
};

const openDropdown = () => {
  if (isDisabled.value) return;
  showDropdown.value = true;
  activeIndex.value = 0;
};

const selectLocality = (locality: Locality) => {
  localValue.value = locality.siruta;
  searchQuery.value = locality.name;
  showDropdown.value = false;
  emit('update:modelValue', locality.siruta);
};

const clear = () => {
  localValue.value = '';
  searchQuery.value = '';
  showDropdown.value = true;
  activeIndex.value = 0;
  emit('update:modelValue', '');
};

const onKeydown = (e: KeyboardEvent) => {
  if (isDisabled.value) return;
  const list = options.value;
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    showDropdown.value = true;
    activeIndex.value = Math.min(activeIndex.value + 1, Math.max(list.length - 1, 0));
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    activeIndex.value = Math.max(activeIndex.value - 1, 0);
  } else if (e.key === 'Enter' && showDropdown.value && list[activeIndex.value]) {
    e.preventDefault();
    selectLocality(list[activeIndex.value]);
  } else if (e.key === 'Escape') {
    showDropdown.value = false;
  }
};

const onBlur = () => {
  setTimeout(() => {
    showDropdown.value = false;
    searchQuery.value = labelFor(localValue.value);
  }, 150);
};
</script>
