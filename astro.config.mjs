import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://yousifneamaawad.github.io',
  base: '/ENB',
  output: 'static',
  integrations: [sitemap()],
});
