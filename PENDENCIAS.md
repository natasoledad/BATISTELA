# Pendências do site Batistela

Lista viva do que falta para o site ficar completo. Atualizada a cada etapa.

## Conteúdo que depende da Batistela

- [x] Mini currículos de Saulo, Sandra e Natalia publicados em Quem somos.
- [ ] **LinkedIn dos consultores** (opcional): links para os perfis, a incluir nos cartões.
- [ ] **Fotos dos consultores** para a página Quem somos (hoje aparecem as iniciais).
- [x] E-book "Além do Lucro" publicado em Conhecimento, com logo novo, domínio e e-mail atualizados (script em `integracoes/ebook-alem-do-lucro/`).
- [ ] **Fotos** para a Home e Quem somos (escritório, equipe). As imagens do Drive (mockups, Imagem 2, Imagem 17) são grandes demais para baixar pela integração; subir direto no GitHub em `public/img/`.
- [ ] **Manual de identidade visual (PDF de 26 MB)**: não foi possível ler pela integração do Drive. As cores e fontes foram extraídas do arquivo Logo RGB. Se o manual define regras diferentes (área de respiro, usos proibidos), avisar.
- [ ] **Redes sociais**: links do Instagram e LinkedIn em `src/lib/site.ts` (`social`).
- [ ] **Licença das fontes**: Area Extended e Moneta Sans são fontes comerciais. Confirmar que a licença adquirida cobre uso em site (webfont). Caso contrário, trocar por fontes livres parecidas (ex.: Outfit e Inter) em `src/layouts/Base.astro` e `src/styles/global.css`.

## Artigos do blog (5 primeiros)

Escrever em português, um arquivo Markdown por artigo em `src/content/artigos/` (instruções no `README.md.txt` da pasta). Versões ES e EN usam tradução automática.

- [ ] Fluxo de caixa e sua importância
- [ ] Indicadores de desempenho e por que usá-los
- [ ] Importância da Margem de Contribuição e o IMC
- [ ] Descrição de cargos e os impactos de não tê-las na sua empresa
- [ ] NPS como ferramenta de venda

## Plataformas (segundo momento)

- [ ] **Plataforma de cursos** própria, conectada ao site. Hoje os quatro cursos aparecem com "Em breve" e botão de lista de espera (os inscritos chegam por e-mail).
- [ ] **Software de gestão empresarial** (indústria, comércio e serviços) com acesso demo. Hoje a seção em Ferramentas mostra "Em breve" com lista de espera.

## Infraestrutura

- [ ] **Registrar o domínio** batistelaconsultoria.com (Registro.br ou outro). Depois, no GitHub: Settings → Pages → Custom domain, e criar as variáveis `SITE_URL` e `BASE_PATH` conforme descrito em `.github/workflows/deploy-pages.yml`.
- [ ] **Ativar o GitHub Pages**: Settings → Pages → Source: GitHub Actions. O site publica sozinho a cada push na `main`.
- [x] **Script dos formulários** instalado e configurado em `src/lib/site.ts`. Os envios caem na planilha "Batistela - Leads do site" e avisam por e-mail.
- [ ] **E-mail info@batistelaconsultoria.com**: precisa existir (Google Workspace, Zoho ou o e-mail do registrador). Quando existir, trocar o `NOTIFY_EMAIL` no script.
- [ ] **Google Search Console** e **Google Analytics**: criar as contas e adicionar a tag de medição em `src/layouts/Base.astro`.
- [ ] **Perfil no Google Business** com o endereço R. Santos Dumont, 182, Centro, Florianópolis (SEO local).
