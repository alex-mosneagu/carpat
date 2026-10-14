<script lang="ts">
  import { getLocalitiesByCounty, searchLocalities } from '@carpat/core/data';
  
  export let value = '';
  export let countyCode = '';
  export let label = '';
  export let placeholder = 'Selectează localitatea';
  export let disabled = false;
  export let required = false;
  export let requireCounty = true;
  export let searchable = true;
  export let showError = true;
  export let containerClass = 'carpat-field';
  export let labelClass = 'carpat-label';
  export let inputClass = 'carpat-input';
  export let errorClass = 'carpat-error';
  export let dropdownClass = 'carpat-dropdown';

  let searchQuery = '';
  let showDropdown = false;
  
  $: filteredLocalities = searchable && searchQuery.length > 0
    ? searchLocalities(searchQuery, countyCode)
    : countyCode
    ? getLocalitiesByCounty(countyCode)
    : [];
  
  $: error = required && !value
    ? 'Localitatea este obligatorie'
    : requireCounty && !countyCode
    ? 'Selectați mai întâi județul'
    : '';
  
  $: if (countyCode) {
    value = '';
    searchQuery = '';
  }
  
  function selectLocality(siruta: string, name: string) {
    value = siruta;
    searchQuery = name;
    showDropdown = false;
  }
  
  function handleBlur() {
    setTimeout(() => {
      showDropdown = false;
    }, 200);
  }
</script>

<div class={containerClass}>
  {#if label}
    <label for="locality-select" class={labelClass}>
      {label}
      {#if required}<span class="required">*</span>{/if}
    </label>
  {/if}
  {#if searchable}
    <input
      id="locality-select"
      type="text"
      bind:value={searchQuery}
      on:focus={() => (showDropdown = true)}
      on:blur={handleBlur}
      {placeholder}
      disabled={disabled || (!countyCode && requireCounty)}
      class={inputClass}
    />
    {#if showDropdown && filteredLocalities.length > 0}
      <ul class={dropdownClass}>
        {#each filteredLocalities as locality}
          <li on:mousedown={() => selectLocality(locality.siruta, locality.name)}>
            {locality.name} ({locality.type})
          </li>
        {/each}
      </ul>
    {/if}
  {:else}
    <select
      id="locality-select"
      bind:value
      disabled={disabled || (!countyCode && requireCounty)}
      class={inputClass}
    >
      <option value="">{placeholder}</option>
      {#each filteredLocalities as locality}
        <option value={locality.siruta}>
          {locality.name} ({locality.type})
        </option>
      {/each}
    </select>
  {/if}
  {#if error && showError}
    <p class={errorClass}>{error}</p>
  {/if}
</div>
