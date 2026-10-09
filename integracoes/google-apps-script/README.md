# Formulários do site → Google Sheets + e-mail

O site é estático e não tem servidor. Os formulários (contato, downloads e listas de
espera) enviam os dados para um **Google Apps Script** ligado a uma planilha do Google
Sheets na conta da Batistela. O script grava cada envio numa aba da planilha e manda um
aviso por e-mail. Sem serviços de terceiros, sem custo.

## Instalar (uma vez, cerca de 5 minutos)

1. Abra a planilha **"Batistela - Leads do site"** no Google Drive (ou crie uma planilha
   nova com esse nome).
2. No menu da planilha: **Extensões → Apps Script**.
3. Apague o conteúdo do editor, cole o código do arquivo `Code.gs` desta pasta e salve
   (ícone de disquete ou Ctrl+S).
4. Confira a linha `const NOTIFY_EMAIL = '...'` no topo: é o e-mail que recebe os avisos.
   Quando o info@batistelaconsultoria.com existir, troque aqui e salve.
5. (Opcional) Na barra de funções, escolha `testar` e clique em **Executar**. O Google
   vai pedir autorização: "Revisar permissões" → escolha a conta → "Avançado" →
   "Acessar Batistela (não seguro)" → "Permitir". Isso é normal para scripts próprios.
   Deve aparecer uma linha de teste na aba "Contatos" e um e-mail na sua caixa.
6. Clique em **Implantar → Nova implantação**. Na engrenagem, escolha **App da Web**:
   - Descrição: `Formulários do site`
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
   - Clique em **Implantar** e autorize, se pedir.
7. Copie a **URL do app da Web** (termina em `/exec`) e coloque em
   `src/lib/site.ts`, no campo `formEndpoint`. Faça o commit; o site republica sozinho.

Para testar: abra a URL `/exec` no navegador; deve mostrar `{"ok":true,...}`.

## Alterar o código depois

Edite no Apps Script, salve e vá em **Implantar → Gerenciar implantações → editar
(lápis) → Versão: Nova versão → Implantar**. A URL continua a mesma.
Trocar só o `NOTIFY_EMAIL` não exige nova implantação.

## Limites

O Gmail permite cerca de 100 e-mails por dia enviados por script numa conta pessoal
(1.500 no Google Workspace). Se um dia passar disso, os registros continuam entrando
na planilha; só o aviso por e-mail deixa de sair.
