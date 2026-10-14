# Installation

## Package Manager

carpat is available on npm and can be installed with your preferred package manager:

::: code-group

```bash [pnpm]
pnpm add @carpat/core

# Install framework package as needed
pnpm add @carpat/vue
pnpm add @carpat/react
pnpm add @carpat/svelte

# Optional CLI
pnpm add -g @carpat/cli
```

```bash [npm]
npm install @carpat/core

# Install framework package as needed
npm install @carpat/vue
npm install @carpat/react
npm install @carpat/svelte

# Optional CLI
npm install -g @carpat/cli
```

```bash [yarn]
yarn add @carpat/core

# Install framework package as needed
yarn add @carpat/vue
yarn add @carpat/react
yarn add @carpat/svelte

# Optional CLI
yarn global add @carpat/cli
```

:::

## Core Only

If you're building your own UI or just need validators:

```bash
pnpm add @carpat/core
```

The core package has zero runtime dependencies and is fully tree-shakeable.

## Framework Packages

Framework packages depend on `@carpat/core` and should be installed together:

### Vue

```bash
pnpm add @carpat/core @carpat/vue
```

**Requirements:** Vue 3.3+

### React

```bash
pnpm add @carpat/core @carpat/react
```

**Requirements:** React 18+

### Svelte

```bash
pnpm add @carpat/core @carpat/svelte
```

**Requirements:** Svelte 4+

## CLI

Validate from the terminal with `@carpat/cli` (currently **0.1.1**):

```bash
pnpm add -g @carpat/cli
carpat cnp 1990101123450
carpat --version
```

See the [CLI reference](/api/cli) for all commands.

## TypeScript

All packages include TypeScript definitions. No additional `@types/*` packages needed.

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "strict": true
  }
}
```

## Next Steps

- Learn about [Core Concepts](/guide/core-concepts)
- Try the [Vue Demo](/demos/vue)
- Check the [API Reference](/api/core) or [CLI](/api/cli)
