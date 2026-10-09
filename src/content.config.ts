import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Artigos do blog: um arquivo Markdown por artigo em src/content/artigos/.
// Escritos em português; nas versões ES e EN o site oferece tradução automática.
const artigos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/artigos' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    category: z.enum(['empresarial', 'pessoal']).default('empresarial'),
    readingMinutes: z.number().default(5),
    draft: z.boolean().default(false),
  }),
});

export const collections = { artigos };
