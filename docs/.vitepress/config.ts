import { defineConfig } from 'vitepress';

const base = '/carpat/';

export default defineConfig({
  title: 'carpat',
  description: 'Romanian form inputs and validators for modern web applications',
  base,
  head: [
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap',
      },
    ],
    ['link', { rel: 'icon', href: `${base}favicon.svg`, type: 'image/svg+xml' }],
  ],
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'carpat',
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/core' },
      { text: 'CLI', link: '/api/cli' },
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
          { text: 'CLI', link: '/api/cli' },
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
