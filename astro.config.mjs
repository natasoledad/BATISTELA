// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL e BASE_PATH vêm do workflow de deploy (GitHub Actions).
// Enquanto o domínio batistelaconsultoria.com não está ativo, o site
// é publicado em https://natasoledad.github.io/BATISTELA/.
const SITE_URL = process.env.SITE_URL || 'https://natasoledad.github.io';
const BASE_PATH = process.env.BASE_PATH || '/BATISTELA';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'es', 'en'],
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
  integrations: [
    sitemap({
      // A raiz só redireciona; não entra no sitemap.
      filter: (page) => /\/(pt|es|en)\//.test(page),
      i18n: {
        defaultLocale: 'pt',
        locales: { pt: 'pt-BR', es: 'es-CL', en: 'en-US' },
      },
    }),
  ],
  build: { format: 'directory' },
});
