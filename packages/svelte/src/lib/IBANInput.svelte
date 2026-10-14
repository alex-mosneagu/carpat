<script lang="ts">
  import { validateIBAN, formatIBAN } from '@carpat/core';
  
  export let value = '';
  export let label = '';
  export let placeholder = 'IBAN (24 caractere)';
  export let disabled = false;
  export let required = false;
  export let showError = true;
  export let showBankInfo = true;
  export let autoFormat = true;
  export let containerClass = 'carpat-field';
  export let labelClass = 'carpat-label';
  export let inputClass = 'carpat-input';
  export let errorClass = 'carpat-error';
  export let infoClass = 'carpat-info';

  let isTouched = false;
  
  $: result = validateIBAN(value);
  $: error = isTouched && !result.valid ? result.error : '';
  
  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    value = target.value.toUpperCase();
  }
  
  function handleBlur() {
    isTouched = true;
    if (result.valid && autoFormat) {
      value = formatIBAN(value);
    }
  }
</script>

<div class={containerClass}>
  {#if label}
    <label for="iban-input" class={labelClass}>
      {label}
      {#if required}<span class="required">*</span>{/if}
    </label>
  {/if}
  <input
    id="iban-input"
    type="text"
    bind:value
    on:input={handleInput}
    on:blur={handleBlur}
    {placeholder}
    {disabled}
    class={inputClass}
    maxlength="34"
  />
  {#if error && showError}
    <p class={errorClass}>{error}</p>
  {/if}
  {#if result.valid && result.bankName && showBankInfo}
    <p class={infoClass}>Bancă: {result.bankName}</p>
  {/if}
</div>
