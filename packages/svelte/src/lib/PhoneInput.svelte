<script lang="ts">
  import { validatePhone, formatPhone } from '@carpat/core';
  
  export let value = '';
  export let label = '';
  export let placeholder = 'Număr de telefon';
  export let disabled = false;
  export let required = false;
  export let showError = true;
  export let showType = false;
  export let autoFormat = true;
  export let includeCountryCode = false;
  export let containerClass = 'carpat-field';
  export let labelClass = 'carpat-label';
  export let inputClass = 'carpat-input';
  export let errorClass = 'carpat-error';
  export let infoClass = 'carpat-info';

  let isTouched = false;
  
  $: result = validatePhone(value);
  $: error = isTouched && !result.valid ? result.error : '';
  
  function handleBlur() {
    isTouched = true;
    if (result.valid && autoFormat) {
      value = formatPhone(value, includeCountryCode);
    }
  }
</script>

<div class={containerClass}>
  {#if label}
    <label for="phone-input" class={labelClass}>
      {label}
      {#if required}<span class="required">*</span>{/if}
    </label>
  {/if}
  <input
    id="phone-input"
    type="tel"
    bind:value
    on:blur={handleBlur}
    {placeholder}
    {disabled}
    class={inputClass}
    maxlength="20"
  />
  {#if error && showError}
    <p class={errorClass}>{error}</p>
  {/if}
  {#if result.valid && result.type && showType}
    <p class={infoClass}>{result.type === 'mobile' ? 'Mobil' : 'Fix'}</p>
  {/if}
</div>
