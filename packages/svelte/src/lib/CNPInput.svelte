<script lang="ts">
  import { validateCNP, formatCNP } from '@carpat/core';
  
  export let value = '';
  export let label = '';
  export let placeholder = 'CNP (13 cifre)';
  export let disabled = false;
  export let required = false;
  export let showInfo = false;
  export let showError = true;
  export let autoFormat = false;
  export let containerClass = 'carpat-field';
  export let labelClass = 'carpat-label';
  export let inputClass = 'carpat-input';
  export let errorClass = 'carpat-error';
  export let infoClass = 'carpat-info';

  let isTouched = false;
  
  $: result = validateCNP(value);
  $: error = isTouched && !result.valid ? result.error : '';
  
  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    let newValue = target.value.replace(/\D/g, '');
    
    if (autoFormat && newValue.length === 13) {
      newValue = formatCNP(newValue);
    }
    
    value = newValue;
  }
  
  function handleBlur() {
    isTouched = true;
  }
  
  function formatDate(date: Date): string {
    return date.toLocaleDateString('ro-RO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
</script>

<div class={containerClass}>
  {#if label}
    <label for="cnp-input" class={labelClass}>
      {label}
      {#if required}<span class="required">*</span>{/if}
    </label>
  {/if}
  <input
    id="cnp-input"
    type="text"
    bind:value
    on:input={handleInput}
    on:blur={handleBlur}
    {placeholder}
    {disabled}
    class={inputClass}
    maxlength="17"
  />
  {#if error && showError}
    <p class={errorClass}>{error}</p>
  {/if}
  {#if result.valid && result.data && showInfo}
    <div class={infoClass}>
      <p>Sex: {result.data.sex === 'M' ? 'Masculin' : 'Feminin'}</p>
      <p>Data nașterii: {formatDate(result.data.birthDate)}</p>
      <p>Județ: {result.data.county}</p>
    </div>
  {/if}
</div>
