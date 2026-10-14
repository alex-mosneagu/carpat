<script lang="ts">
  import { getCountyByCode, searchCounties } from '@carpat/core/data';
  import type { County } from '@carpat/core';

  export let value = '';
  export let label = '';
  export let placeholder = 'Caută județul…';
  export let disabled = false;
  export let required = false;
  export let showError = true;
  export let includeSectors = false;
  export let containerClass = 'carpat-field';
  export let labelClass = 'carpat-label';
  export let inputClass = 'carpat-input';
  export let errorClass = 'carpat-error';
  export let dropdownClass = 'carpat-dropdown';

  let searchQuery = '';
  let showDropdown = false;
  let activeIndex = 0;
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

  $: selectedLabel = labelFor(value);
  $: isFiltering = searchQuery.trim().length > 0 && searchQuery.trim() !== selectedLabel;
  $: options = searchCounties(isFiltering ? searchQuery : '', {
    includeSectors,
    limit: 48,
  });
  $: error = required && !value ? 'Județul este obligatoriu' : '';
  $: if (!showDropdown) searchQuery = labelFor(value);

  function selectCounty(county: County) {
    value = county.code;
    searchQuery = formatCounty(county);
    showDropdown = false;
  }

  function clear() {
    value = '';
    searchQuery = '';
    showDropdown = true;
    activeIndex = 0;
  }

  function onSearch() {
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
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      showDropdown = true;
      activeIndex = Math.min(activeIndex + 1, Math.max(options.length - 1, 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
    } else if (e.key === 'Enter' && showDropdown && options[activeIndex]) {
      e.preventDefault();
      selectCounty(options[activeIndex]);
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
      {placeholder}
      {disabled}
      class={inputClass}
      autocomplete="off"
      on:input={onSearch}
      on:focus={() => {
        showDropdown = true;
        activeIndex = 0;
      }}
      on:blur={handleBlur}
      on:keydown={onKeydown}
    />
    {#if value && !disabled}
      <button
        type="button"
        class="carpat-combobox-clear"
        aria-label="Șterge județul"
        tabindex="-1"
        on:mousedown|preventDefault={clear}
      >
        ×
      </button>
    {/if}
    {#if showDropdown && options.length > 0}
      <ul id={listboxId} role="listbox" class={dropdownClass}>
        {#each options as county, index}
          <li
            role="option"
            aria-selected={county.code === value}
            class:is-active={index === activeIndex}
            class:is-selected={county.code === value}
            on:mousedown|preventDefault={() => selectCounty(county)}
            on:mouseenter={() => (activeIndex = index)}
          >
            <span class="carpat-option-title">{county.name}</span>
            <span class="carpat-option-meta">{county.auto}</span>
          </li>
        {/each}
      </ul>
    {:else if showDropdown && isFiltering}
      <p class="carpat-empty">Niciun județ găsit</p>
    {/if}
  </div>
  {#if error && showError}
    <p class={errorClass}>{error}</p>
  {/if}
</div>
