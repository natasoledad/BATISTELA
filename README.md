# Batistela Gestão Empresarial — site

Site institucional da **Batistela LTDA** (Batistela Gestão Empresarial), consultoria em
gestão empresarial e tecnologia em Florianópolis, SC. Três idiomas (português do Brasil,
espanhol do Chile e inglês dos EUA), gerado como site estático com [Astro](https://astro.build)
e publicado no GitHub Pages.

- Em produção: https://natasoledad.github.io/BATISTELA/ (até o domínio batistelaconsultoria.com ser ativado)
- Pendências: ver `PENDENCIAS.md`

## Páginas

| Página | pt | es | en |
|---|---|---|---|
| Home | `/pt/` | `/es/` | `/en/` |
| Quem somos | `/pt/quem-somos/` | `/es/quienes-somos/` | `/en/about-us/` |
| Soluções (10 páginas) | `/pt/solucoes/…` | `/es/soluciones/…` | `/en/solutions/…` |
| Ferramentas (calculadora + planilhas) | `/pt/ferramentas/` | `/es/herramientas/` | `/en/tools/` |
| Conhecimento (e-books + cursos) | `/pt/conhecimento/` | `/es/conocimiento/` | `/en/learning/` |
| Artigos (blog) | `/pt/artigos/` | `/es/articulos/` | `/en/articles/` |
| Contato | `/pt/contato/` | `/es/contacto/` | `/en/contact/` |
| Privacidade | `/pt/politica-de-privacidade/` | `/es/politica-de-privacidad/` | `/en/privacy-policy/` |

## Estrutura

```
src/
├── i18n/            textos de todas as páginas, por idioma (pt.ts, es.ts, en.ts)
│   └── index.ts     rotas localizadas e helpers (href, asset)
├── lib/site.ts      e-mail, WhatsApp, endereço, endpoint do formulário
├── layouts/Base.astro   <head> com SEO, hreflang, JSON-LD, header, footer, WhatsApp, cookies
├── components/      Header, Footer, Calculadora, formulários, modal de download, ícones
│   └── pages/       um componente por página (Home, About, Solutions, Solution, Tools, ...)
├── pages/           rotas: [lang]/index.astro e [lang]/[...slug].astro
├── content/artigos/ artigos do blog em Markdown (ver README.md.txt na pasta)
└── styles/global.css    tokens de design e estilos
public/
├── img/             logos (SVG extraídos do manual), og-image
├── fonts/           Area Extended e Moneta Sans (woff2)
└── downloads/       planilhas e e-books oferecidos no site
brand/               referência da identidade visual
```

## Como editar textos

Todos os textos ficam em `src/i18n/pt.ts`, `es.ts` e `en.ts`. Cada arquivo tem a mesma
estrutura. Para mudar um texto, altere nos três idiomas e faça o commit.

Dados de contato (e-mail, WhatsApp, endereço) ficam em `src/lib/site.ts`.

## Rodar localmente

```bash
npm install
npm run dev      # http://localhost:4321/BATISTELA/pt/
npm run build    # gera a pasta dist/
```

## Publicação

O workflow `.github/workflows/deploy-pages.yml` constrói e publica o site a cada push na
branch `main`. Em **Settings → Pages**, escolha *GitHub Actions* como fonte.

Quando o domínio estiver ativo, siga os passos comentados no início do workflow
(variáveis `SITE_URL` e `BASE_PATH`).

## Formulários

Contato, downloads e listas de espera enviam para um **Google Apps Script** próprio, que
grava cada envio na planilha "Batistela - Leads do site" e avisa por e-mail. Instalação e
manutenção em `integracoes/google-apps-script/README.md`. A URL do script fica em
`src/lib/site.ts` (`formEndpoint`).

## Identidade visual

- Azul: `#202A44` · Ouro fosco: `#AD965F` · Amarelo claro: `#F5ECD5`
- Azul secundário: `#4D5F80` · Azul claro: `#C8D8EB` · Cinza: `#D9D9D6`
- Títulos: Area Extended · Texto: Moneta Sans
