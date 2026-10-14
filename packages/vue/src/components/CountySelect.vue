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
        :placeholder="placeholder"
        :disabled="disabled"
        :class="inputClass"
        autocomplete="off"
        @input="onSearch"
        @focus="openDropdown"
        @keydown="onKeydown"
        @blur="onBlur"
      />
      <button
        v-if="localValue && !disabled"
        type="button"
        class="carpat-combobox-clear"
        aria-label="Șterge județul"
        tabindex="-1"
        @mousedown.prevent="clear"
      >
        ×
      </button>
      <ul
        v-if="showDropdown && options.length > 0"
        :id="listboxId"
        role="listbox"
        :class="dropdownClass"
      >
        <li
          v-for="(county, index) in options"
          :key="county.code"
          role="option"
          :aria-selected="county.code === localValue"
          :class="{ 'is-active': index === activeIndex, 'is-selected': county.code === localValue }"
          @mousedown.prevent="selectCounty(county)"
          @mouseenter="activeIndex = index"
        >
          <span class="carpat-option-title">{{ county.name }}</span>
          <span class="carpat-option-meta">{{ county.auto }}</span>
        </li>
      </ul>
      <p v-else-if="showDropdown && isFiltering" class="carpat-empty">Niciun județ găsit</p>
    </div>
    <p v-if="error && showError" :class="errorClass">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { getCountyByCode, searchCounties } from '@carpat/core/data';
import type { County } from '@carpat/core';

export interface CountySelectProps {
  modelValue?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  showError?: boolean;
  includeSectors?: boolean;
  containerClass?: string;
  labelClass?: string;
  inputClass?: string;
  errorClass?: string;
  dropdownClass?: string;
}

const props = withDefaults(defineProps<CountySelectProps>(), {
  modelValue: '',
  placeholder: 'Caută județul…',
  showError: true,
  includeSectors: false,
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
const inputId = `county-select-${uid}`;
const listboxId = `county-list-${uid}`;

function formatCounty(county: County) {
  return `${county.name} (${county.auto})`;
}

function labelFor(code: string) {
  const county = getCountyByCode(code);
  return county ? formatCounty(county) : '';
}

const selectedLabel = computed(() => labelFor(localValue.value));

const isFiltering = computed(() => {
  const q = searchQuery.value.trim();
  return q.length > 0 && q !== selectedLabel.value;
});

const options = computed(() =>
  searchCounties(isFiltering.value ? searchQuery.value : '', {
    includeSectors: props.includeSectors,
    limit: 48,
  })
);

const error = computed(() => {
  if (props.required && !localValue.value) return 'Județul este obligatoriu';
  return '';
});

watch(
  () => props.modelValue,
  (code) => {
    localValue.value = code;
    if (!showDropdown.value) {
      searchQuery.value = labelFor(code);
    }
  },
  { immediate: true }
);

const onSearch = () => {
  showDropdown.value = true;
  activeIndex.value = 0;
  if (localValue.value && searchQuery.value !== selectedLabel.value) {
    localValue.value = '';
    emit('update:modelValue', '');
  }
};

const openDropdown = () => {
  showDropdown.value = true;
  activeIndex.value = 0;
};

const selectCounty = (county: County) => {
  localValue.value = county.code;
  searchQuery.value = formatCounty(county);
  showDropdown.value = false;
  emit('update:modelValue', county.code);
};

const clear = () => {
  localValue.value = '';
  searchQuery.value = '';
  showDropdown.value = true;
  activeIndex.value = 0;
  emit('update:modelValue', '');
};

const onKeydown = (e: KeyboardEvent) => {
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
    selectCounty(list[activeIndex.value]);
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
