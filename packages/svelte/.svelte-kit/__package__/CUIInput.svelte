<script lang="ts">
  import { validateCUI, formatCUI } from '@carpat/core';
  
  export let value = '';
  export let label = '';
  export let placeholder = 'CUI/CIF';
  export let disabled = false;
  export let required = false;
  export let showError = true;
  export let includePrefix = true;
  export let containerClass = 'carpat-field';
  export let labelClass = 'carpat-label';
  export let inputClass = 'carpat-input';
  export let errorClass = 'carpat-error';

  let isTouched = false;
  
  $: result = validateCUI(value);
  $: error = isTouched && !result.valid ? result.error : '';
  
  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    value = target.value.toUpperCase();
  }
  
  function handleBlur() {
    isTouched = true;
    if (result.valid && includePrefix) {
      value = formatCUI(value);
    }
  }
</script>

<div class={containerClass}>
  {#if label}
    <label for="cui-input" class={labelClass}>
      {label}
      {#if required}<span class="required">*</span>{/if}
    </label>
  {/if}
  <input
    id="cui-input"
    type="text"
    bind:value
    on:input={handleInput}
    on:blur={handleBlur}
    {placeholder}
    {disabled}
    class={inputClass}
    maxlength="12"
  />
  {#if error && showError}
    <p class={errorClass}>{error}</p>
  {/if}
</div>
