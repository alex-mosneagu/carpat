<script lang="ts">
  import { COUNTIES } from '@carpat/core/data';
  
  export let value = '';
  export let label = '';
  export let placeholder = 'Selectează județul';
  export let disabled = false;
  export let required = false;
  export let showError = true;
  export let containerClass = 'carpat-field';
  export let labelClass = 'carpat-label';
  export let inputClass = 'carpat-select';
  export let errorClass = 'carpat-error';

  $: error = required && !value ? 'Județul este obligatoriu' : '';
</script>

<div class={containerClass}>
  {#if label}
    <label for="county-select" class={labelClass}>
      {label}
      {#if required}<span class="required">*</span>{/if}
    </label>
  {/if}
  <select
    id="county-select"
    bind:value
    {disabled}
    class={inputClass}
  >
    <option value="">{placeholder}</option>
    {#each COUNTIES as county}
      <option value={county.code}>
        {county.name} ({county.auto})
      </option>
    {/each}
  </select>
  {#if error && showError}
    <p class={errorClass}>{error}</p>
  {/if}
</div>
