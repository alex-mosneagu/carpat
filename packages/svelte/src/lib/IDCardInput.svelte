<script lang="ts">
  import { validateIDCard } from '@carpat/core';

  export let series = '';
  export let number = '';
  export let label = 'Carte de identitate';
  export let disabled = false;
  export let required = false;
  export let showError = true;
  export let showInfo = false;
  export let containerClass = 'carpat-field';
  export let labelClass = 'carpat-label';
  export let inputClass = 'carpat-input';
  export let errorClass = 'carpat-error';
  export let infoClass = 'carpat-info';

  let isTouched = false;
  const uid = Math.random().toString(36).slice(2, 9);
  const seriesId = `idcard-series-${uid}`;
  const numberId = `idcard-number-${uid}`;

  $: result = validateIDCard(series, number);
  $: error = !isTouched
    ? ''
    : required && !series && !number
      ? 'Seria și numărul sunt obligatorii'
      : !series && !number
        ? ''
        : result.valid
          ? ''
          : result.error || '';

  function onSeriesInput(e: Event) {
    const target = e.target as HTMLInputElement;
    series = target.value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 2);
  }

  function onNumberInput(e: Event) {
    const target = e.target as HTMLInputElement;
    number = target.value.replace(/\D/g, '').slice(0, 6);
  }
</script>

<div class={containerClass}>
  {#if label}
    <label class={labelClass}>
      {label}
      {#if required}<span class="required">*</span>{/if}
    </label>
  {/if}
  <div class="carpat-idcard-row">
    <div class="carpat-idcard-series">
      <label for={seriesId} class="carpat-idcard-sublabel">Serie</label>
      <input
        id={seriesId}
        type="text"
        value={series}
        placeholder="CJ"
        {disabled}
        class={inputClass}
        maxlength="2"
        autocomplete="off"
        spellcheck="false"
        on:input={onSeriesInput}
        on:blur={() => (isTouched = true)}
      />
    </div>
    <div class="carpat-idcard-number">
      <label for={numberId} class="carpat-idcard-sublabel">Număr</label>
      <input
        id={numberId}
        type="text"
        inputmode="numeric"
        value={number}
        placeholder="123456"
        {disabled}
        class={inputClass}
        maxlength="6"
        autocomplete="off"
        on:input={onNumberInput}
        on:blur={() => (isTouched = true)}
      />
    </div>
  </div>
  {#if error && showError}
    <p class={errorClass}>{error}</p>
  {/if}
  {#if result.valid && showInfo}
    <div class={infoClass}>
      <p>{result.series} {result.number}</p>
    </div>
  {/if}
</div>

<style>
  .carpat-idcard-row {
    display: grid;
    grid-template-columns: 5.5rem 1fr;
    gap: 0.75rem;
    align-items: end;
  }

  .carpat-idcard-sublabel {
    display: block;
    margin-bottom: 0.35rem;
    font-size: 0.8rem;
    font-weight: 500;
    opacity: 0.75;
  }

  .carpat-idcard-series .carpat-input {
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-weight: 600;
  }
</style>
