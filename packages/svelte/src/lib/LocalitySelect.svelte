<script lang="ts">
  import {
    getLocalitiesByCounty,
    getLocalityBySiruta,
    searchLocalities,
  } from '@carpat/core/data';
  import type { Locality } from '@carpat/core';

  export let value = '';
  export let countyCode = '';
  export let label = '';
  export let placeholder = 'Caută localitatea…';
  export let disabled = false;
  export let required = false;
  export let requireCounty = true;
  export let showError = true;
  export let containerClass = 'carpat-field';
  export let labelClass = 'carpat-label';
  export let inputClass = 'carpat-input';
  export let errorClass = 'carpat-error';
  export let dropdownClass = 'carpat-dropdown';

  let searchQuery = '';
  let showDropdown = false;
  let activeIndex = 0;
  let prevCounty = countyCode;
  const uid = Math.random().toString(36).slice(2, 9);
  const inputId = `locality-select-${uid}`;
  const listboxId = `locality-list-${uid}`;

  function labelFor(siruta: string) {
    return getLocalityBySiruta(siruta)?.name ?? '';
  }

  $: isDisabled = disabled || (requireCounty && !countyCode);
  $: effectivePlaceholder =
    requireCounty && !countyCode ? 'Selectează mai întâi județul' : placeholder;
  $: selectedLabel = labelFor(value);
  $: isFiltering = searchQuery.trim().length > 0 && searchQuery.trim() !== selectedLabel;
  $: options =
    !countyCode && requireCounty
      ? []
      : isFiltering
        ? searchLocalities(searchQuery, countyCode)
        : countyCode
          ? getLocalitiesByCounty(countyCode)
          : [];
  $: error =
    requireCounty && !countyCode
      ? 'Selectați mai întâi județul'
      : required && !value
        ? 'Localitatea este obligatorie'
        : '';

  $: if (countyCode !== prevCounty) {
    prevCounty = countyCode;
    value = '';
    searchQuery = '';
    showDropdown = false;
  }

  $: if (!showDropdown) searchQuery = labelFor(value);

  function selectLocality(locality: Locality) {
    value = locality.siruta;
    searchQuery = locality.name;
    showDropdown = false;
  }

  function clear() {
    value = '';
    searchQuery = '';
    showDropdown = true;
    activeIndex = 0;
  }

  function onSearch() {
    if (isDisabled) return;
    showDropdown = true;
    activeIndex = 0;
    if (value && searchQuery !== selectedLabel) {
      value = '';
    }
  }

  function handleBlur() {
    setTimeout(() => {
      showDropdown = false;
      searchQuery = labelFor(value);
    }, 150);
  }

  function onKeydown(e: KeyboardEvent) {
    if (isDisabled) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      showDropdown = true;
      activeIndex = Math.min(activeIndex + 1, Math.max(options.length - 1, 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
    } else if (e.key === 'Enter' && showDropdown && options[activeIndex]) {
      e.preventDefault();
      selectLocality(options[activeIndex]);
    } else if (e.key === 'Escape') {
      showDropdown = false;
    }
  }
</script>

<div class={containerClass}>
  {#if label}
    <label for={inputId} class={labelClass}>
      {label}
      {#if required}<span class="required">*</span>{/if}
    </label>
  {/if}
  <div class="carpat-combobox">
    <input
      id={inputId}
      type="text"
      role="combobox"
      aria-expanded={showDropdown}
      aria-autocomplete="list"
      aria-controls={listboxId}
      bind:value={searchQuery}
      placeholder={effectivePlaceholder}
      disabled={isDisabled}
      class={inputClass}
      autocomplete="off"
      on:input={onSearch}
      on:focus={() => {
        if (isDisabled) return;
        showDropdown = true;
        activeIndex = 0;
      }}
      on:blur={handleBlur}
      on:keydown={onKeydown}
    />
    {#if value && !isDisabled}
      <button
        type="button"
        class="carpat-combobox-clear"
        aria-label="Șterge localitatea"
        tabindex="-1"
        on:mousedown|preventDefault={clear}
      >
        ×
      </button>
    {/if}
    {#if showDropdown && !isDisabled && options.length > 0}
      <ul id={listboxId} role="listbox" class={dropdownClass}>
        {#each options as locality, index}
          <li
            role="option"
            aria-selected={locality.siruta === value}
            class:is-active={index === activeIndex}
            class:is-selected={locality.siruta === value}
            on:mousedown|preventDefault={() => selectLocality(locality)}
            on:mouseenter={() => (activeIndex = index)}
          >
            <span class="carpat-option-title">{locality.name}</span>
            <span class="carpat-option-meta">{locality.type}</span>
          </li>
        {/each}
      </ul>
    {:else if showDropdown && !isDisabled && isFiltering}
      <p class="carpat-empty">Nicio localitate găsită</p>
    {/if}
  </div>
  {#if error && showError}
    <p class={errorClass}>{error}</p>
  {/if}
</div>
