# Batistela — Consultoria em Gestão e Finanças

Site institucional da **Batistela**, consultoria brasileira em gestão e finanças
empresariais. Página única (landing page) em português do Brasil, responsiva,
sem dependências de build: HTML, CSS e JavaScript puros.

## Estrutura

```
batistela/
├── index.html                  # página principal (todas as seções)
├── assets/
│   ├── css/styles.css          # tokens de design, layout e responsividade
│   ├── js/main.js              # menu mobile, animações e formulário de contato
│   └── img/logo.svg            # logotipo e favicon
└── .github/workflows/
    └── deploy-pages.yml        # publicação automática no GitHub Pages
```

## Seções da página

1. **Hero** — proposta de valor e chamada para o diagnóstico gratuito
2. **Indicadores** — números de credibilidade
3. **Sobre** — posicionamento e forma de atuar
4. **Serviços** — planejamento financeiro, controladoria, BPO financeiro,
   reestruturação, governança e valuation/M&A
5. **Como trabalhamos** — método em quatro etapas
6. **Resultados** — depoimentos de clientes
7. **Dúvidas frequentes**
8. **Contato** — WhatsApp, e-mail e formulário (com aviso LGPD)

## Rodar localmente

Basta abrir `index.html` no navegador, ou servir a pasta:

```bash
python3 -m http.server 8080
# http://localhost:8080
```

## Publicar

O workflow em `.github/workflows/deploy-pages.yml` publica o site no GitHub
Pages a cada push na branch `main`. Em **Settings → Pages**, escolha
*GitHub Actions* como fonte. O site também pode ser hospedado em qualquer
serviço de arquivos estáticos (Vercel, Netlify, Cloudflare Pages, S3).

## O que personalizar antes de ir ao ar

Procure por estes trechos em `index.html`:

- Telefone/WhatsApp: `+55 (00) 00000-0000` e o link `wa.me/5500000000000`
- E-mail: `contato@batistela.com.br` (também em `assets/js/main.js`)
- CNPJ e razão social no rodapé
- Números da seção de indicadores e depoimentos (são exemplos)
- Domínio nas meta tags Open Graph quando o site tiver URL definitiva

O formulário hoje abre o cliente de e-mail do visitante. Para receber as
mensagens em um CRM ou caixa de entrada sem depender disso, troque o envio
em `assets/js/main.js` por um endpoint (Formspree, Netlify Forms, ou um
backend próprio).
