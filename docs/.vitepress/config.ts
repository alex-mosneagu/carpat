import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'carpat',
  description: 'Romanian form inputs and validators for modern web applications',
  base: '/carpat/',
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/core' },
      { text: 'Demos', link: '/demos/vue' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Installation', link: '/guide/installation' },
          { text: 'Core Concepts', link: '/guide/core-concepts' },
        ],
      },
      {
        text: 'API Reference',
        items: [
          { text: 'Core', link: '/api/core' },
          { text: 'Vue', link: '/api/vue' },
          { text: 'React', link: '/api/react' },
          { text: 'Svelte', link: '/api/svelte' },
        ],
      },
      {
        text: 'Live Demos',
        items: [
          { text: 'Vue', link: '/demos/vue' },
          { text: 'React', link: '/demos/react' },
          { text: 'Svelte', link: '/demos/svelte' },
        ],
      },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/alex-mosneagu/carpat' }],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 Alex Mosneagu',
    },
  },
});
