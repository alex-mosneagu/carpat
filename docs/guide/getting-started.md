# Getting Started

carpat is a comprehensive toolkit for building Romanian-specific forms in modern web applications. It provides validators, formatters, data, and ready-to-use components for Vue, React, and Svelte.

## What is carpat?

carpat helps you build forms that work with Romanian data:

- **CNP** (Cod Numeric Personal) - Personal identification numbers
- **CUI/CIF** - Company identification numbers  
- **IBAN** - Bank account numbers with Romanian bank lookup
- **Phone numbers** - Mobile and landline validation
- **Addresses** - County/locality selectors with SIRUTA data
- **ID cards** - Series and number validation
- **Postal codes** - Romanian 6-digit codes

## Architecture

carpat is organized as a monorepo with multiple packages:

### @carpat/core
Framework-agnostic validators, formatters, and data. Zero runtime dependencies, fully tree-shakeable.

### @carpat/vue
Vue 3 components with full TypeScript support, Composition API, and Nuxt compatibility.

### @carpat/react
React 18+ components with hooks and TypeScript.

### @carpat/svelte
Svelte 4 components with full reactivity.

## Philosophy

1. **All logic in core** - Framework packages are thin wrappers around core validators
2. **Zero runtime dependencies** - Core has no dependencies for minimal bundle size
3. **Offline-first** - All data (SIRUTA, banks, counties) bundled locally
4. **Type-safe** - Full TypeScript support throughout
5. **Accessible** - Components follow WCAG guidelines
6. **Unstyled by default** - Bring your own styles or design system

## Next Steps

- [Installation](/guide/installation) - Install and configure carpat
- [Core Concepts](/guide/core-concepts) - Learn the fundamentals
- [Vue Demo](/demos/vue) - Try the Vue components
- [React Demo](/demos/react) - Try the React components
- [Svelte Demo](/demos/svelte) - Try the Svelte components
