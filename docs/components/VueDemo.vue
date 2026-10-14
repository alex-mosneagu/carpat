<script setup lang="ts">
import { ref } from 'vue';
import {
  CNPInput,
  CUIInput,
  IBANInput,
  PhoneInput,
  CountySelect,
  LocalitySelect,
} from '@carpat/vue';

const cnp = ref('');
const cui = ref('');
const iban = ref('');
const phone = ref('');
const county = ref('');
const locality = ref('');
</script>

<template>
  <div class="vue-demo">
    <section class="demo-block">
      <header class="demo-block-head">
        <h2>CNP</h2>
        <p>Personal ID with checksum, date, and county.</p>
      </header>
      <CNPInput
        v-model="cnp"
        label="CNP (Cod Numeric Personal)"
        :show-info="true"
        :show-error="true"
        :required="true"
      />
      <p class="hint">
        Try <code>1990101123450</code> (male) or <code>2850623234566</code> (female).
      </p>
    </section>

    <section class="demo-block">
      <header class="demo-block-head">
        <h2>CUI / CIF</h2>
        <p>Company identifier with optional RO prefix.</p>
      </header>
      <CUIInput v-model="cui" label="CUI/CIF" :include-prefix="true" />
      <p class="hint">Try <code>18547290</code> or <code>RO18547290</code>.</p>
    </section>

    <section class="demo-block">
      <header class="demo-block-head">
        <h2>IBAN</h2>
        <p>Mod-97 check and Romanian bank lookup.</p>
      </header>
      <IBANInput
        v-model="iban"
        label="IBAN"
        :show-bank-info="true"
        :auto-format="true"
      />
      <p class="hint">
        Try <code>RO90RNCB0000000000001234</code> (BCR) or
        <code>RO36BTRL0130123456789012</code> (Transilvania).
      </p>
    </section>

    <section class="demo-block">
      <header class="demo-block-head">
        <h2>Phone</h2>
        <p>Mobile and landline, with +40 normalization.</p>
      </header>
      <PhoneInput
        v-model="phone"
        label="Telefon"
        :show-type="true"
        :auto-format="true"
      />
      <p class="hint">Try <code>0712345678</code> or <code>0212345678</code>.</p>
    </section>

    <section class="demo-block">
      <header class="demo-block-head">
        <h2>County and locality</h2>
        <p>Search a județ, then a locality in that county.</p>
      </header>
      <div class="demo-grid">
        <CountySelect v-model="county" label="Județ" :required="true" />
        <LocalitySelect
          v-model="locality"
          :county-code="county"
          label="Localitate"
          :require-county="true"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.vue-demo {
  display: grid;
  gap: 1rem;
  margin: 1.5rem 0 2.5rem;
}

.demo-block {
  padding: 1.35rem 1.35rem 1.1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-alt);
}

.demo-block-head {
  margin-bottom: 1rem;
}

.demo-block-head h2 {
  margin: 0 0 0.35rem;
  border: none;
  padding: 0;
  font-size: 1.05rem;
  font-weight: 650;
  letter-spacing: -0.02em;
  line-height: 1.3;
  color: var(--vp-c-text-1);
}

.demo-block-head h2::before {
  display: none;
}

.demo-block-head p {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

.hint {
  margin: 0.15rem 0 0;
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--vp-c-text-2);
}

.hint code {
  font-size: 0.84em;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  padding: 0.12em 0.4em;
  border-radius: 4px;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

@media (max-width: 640px) {
  .demo-block {
    padding: 1.15rem 1rem 1rem;
  }
}
</style>
