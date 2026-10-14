<script setup lang="ts">
import { withBase } from 'vitepress';

const linkStart = withBase('/guide/getting-started');
const linkInstall = withBase('/guide/installation');
const linkApi = withBase('/api/core');
const linkDemo = withBase('/demos/vue');

const validators = [
  { name: 'CNP', detail: 'Checksum, date, and county extraction' },
  { name: 'CUI / CIF', detail: 'Company IDs with RO prefix support' },
  { name: 'IBAN', detail: 'Mod-97 check and Romanian bank lookup' },
  { name: 'Phone', detail: 'Mobile and landline, +40 normalization' },
  { name: 'Postal code', detail: 'Six-digit Romanian codes' },
  { name: 'ID card', detail: 'Series and number validation' },
];

const frameworks = [
  { name: 'Core', package: '@carpat/core', note: 'Framework-agnostic' },
  { name: 'Vue 3', package: '@carpat/vue', note: 'Components + composable' },
  { name: 'React', package: '@carpat/react', note: 'Components + hook' },
  { name: 'Svelte', package: '@carpat/svelte', note: 'Svelte 4 components' },
];
</script>

<template>
  <div class="landing">
    <section class="hero">
      <div class="hero-atmosphere" aria-hidden="true" />
      <div class="hero-inner">
        <p class="hero-brand">carpat</p>
        <h1 class="hero-title">Romanian form validation, done properly</h1>
        <p class="hero-lead">
          Validators, formatters, and local data for CNP, CUI, IBAN, phones, and more — with ready
          components for Vue, React, and Svelte.
        </p>
        <div class="hero-actions">
          <a class="btn btn-primary" :href="linkStart">Get started</a>
          <a
            class="btn btn-ghost"
            href="https://github.com/alex-mosneagu/carpat"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>

    <section class="section validators">
      <div class="section-inner">
        <h2>What it checks</h2>
        <p class="section-lead">Correct algorithms and Romanian-specific rules, not just regex.</p>
        <ul class="validator-list">
          <li v-for="item in validators" :key="item.name">
            <span class="validator-name">{{ item.name }}</span>
            <span class="validator-detail">{{ item.detail }}</span>
          </li>
        </ul>
      </div>
    </section>

    <section class="section frameworks">
      <div class="section-inner">
        <h2>One core, three UI kits</h2>
        <p class="section-lead">
          Use the validators alone, or drop in accessible inputs for your stack.
        </p>
        <ul class="framework-list">
          <li v-for="fw in frameworks" :key="fw.package">
            <span class="fw-name">{{ fw.name }}</span>
            <code class="fw-package">{{ fw.package }}</code>
            <span class="fw-note">{{ fw.note }}</span>
          </li>
        </ul>
      </div>
    </section>

    <section class="section sample">
      <div class="section-inner">
        <h2>In practice</h2>
        <p class="section-lead">Validate a CNP and read structured data in a few lines.</p>
        <pre
          class="code-block"
          tabindex="0"
        ><code>import { validateCNP, formatPhone } from '@carpat/core';

const result = validateCNP('1800101221144');
if (result.valid) {
  // result.data → sex, birthDate, county, countyCode
}

formatPhone('+40 712 345 678'); // '0712 345 678'</code></pre>
        <div class="sample-actions">
          <a class="btn btn-primary" :href="linkApi">API reference</a>
          <a class="btn btn-ghost" :href="linkDemo">Live Vue demo</a>
        </div>
      </div>
    </section>

    <section class="section closing">
      <div class="section-inner closing-inner">
        <p class="closing-brand">carpat</p>
        <p class="closing-text">Built for Romanian products that need forms people can trust.</p>
        <a class="btn btn-primary" :href="linkInstall">Install</a>
      </div>
    </section>
  </div>
</template>
