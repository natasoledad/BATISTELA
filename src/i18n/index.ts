import type { Dictionary, Locale } from './types';
import { pt } from './pt';
import { es } from './es';
import { en } from './en';

export type { Dictionary, Locale };

export const locales: Locale[] = ['pt', 'es', 'en'];
export const defaultLocale: Locale = 'pt';
export const dictionaries: Record<Locale, Dictionary> = { pt, es, en };

export const t = (locale: Locale): Dictionary => dictionaries[locale] ?? pt;

export type PageKey = 'home' | 'about' | 'solutions' | 'tools' | 'knowledge' | 'articles' | 'contact' | 'privacy';

// Slugs localizados por página (melhor para SEO em cada idioma).
export const routes: Record<PageKey, Record<Locale, string>> = {
  home: { pt: '', es: '', en: '' },
  about: { pt: 'quem-somos', es: 'quienes-somos', en: 'about-us' },
  solutions: { pt: 'solucoes', es: 'soluciones', en: 'solutions' },
  tools: { pt: 'ferramentas', es: 'herramientas', en: 'tools' },
  knowledge: { pt: 'conhecimento', es: 'conocimiento', en: 'learning' },
  articles: { pt: 'artigos', es: 'articulos', en: 'articles' },
  contact: { pt: 'contato', es: 'contacto', en: 'contact' },
  privacy: { pt: 'politica-de-privacidade', es: 'politica-de-privacidad', en: 'privacy-policy' },
};

const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');

/** Caminho absoluto (com base path) para uma rota em um idioma. */
export function href(locale: Locale, page: PageKey, sub?: string): string {
  const slug = routes[page][locale];
  const parts = [locale, slug, sub].filter(Boolean);
  return `${base}/${parts.join('/')}/`;
}

/** Caminho para um arquivo em /public. */
export function asset(path: string): string {
  return `${base}/${path.replace(/^\/+/, '')}`;
}

/** Slug de solução equivalente em outro idioma (mesmo índice na lista). */
export function solutionSlugIn(target: Locale, from: Locale, slug: string): string | undefined {
  const idx = dictionaries[from].solutions.items.findIndex((s) => s.slug === slug);
  return idx >= 0 ? dictionaries[target].solutions.items[idx]?.slug : undefined;
}

export const solutionIcons = ['search', 'file-text', 'clipboard', 'target', 'wallet', 'megaphone', 'git-branch', 'code', 'globe', 'workflow'];
export const managementCount = 7; // primeiras 7 soluções = Gestão de Negócios; demais = Tecnologia
