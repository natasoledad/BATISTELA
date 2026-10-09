/**
 * Batistela Gestão Empresarial — receptor dos formulários do site
 * ----------------------------------------------------------------
 * Recebe os envios do site (contato, downloads e listas de espera),
 * grava cada um na planilha vinculada e manda um aviso por e-mail.
 *
 * Como usar: veja o README.md nesta pasta.
 */

// E-mail que recebe o aviso de cada novo envio. Quando o info@batistelaconsultoria.com
// existir, basta trocar aqui e salvar (não precisa reimplantar).
const NOTIFY_EMAIL = 'natasoledadsilva@gmail.com';

// Abas da planilha por tipo de envio.
const SHEETS = {
  contato: { name: 'Contatos', headers: ['Data', 'Nome', 'E-mail', 'Telefone', 'Empresa', 'Assunto', 'Mensagem', 'Idioma', 'Página'] },
  download: { name: 'Downloads', headers: ['Data', 'Nome', 'E-mail', 'Material', 'Idioma', 'Página'] },
  waitlist: { name: 'Lista de espera', headers: ['Data', 'Nome', 'E-mail', 'Interesse', 'Idioma', 'Página'] },
};

/** Teste rápido no navegador: abrir a URL do app da Web deve mostrar {"ok":true}. */
function doGet() {
  return json_({ ok: true, service: 'batistela-forms' });
}

/** Recebe o POST do site (corpo em JSON). */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || '{}');

    // Honeypot: campo invisível que só robôs preenchem.
    if (data._honey) return json_({ ok: true });

    const tipo = ['contato', 'download', 'waitlist'].includes(data.tipo) ? data.tipo : 'contato';
    const nome = clean_(data.nome), email = clean_(data.email);
    if (!nome || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json_({ ok: false, error: 'invalid' }, 400);

    const now = new Date();
    const idioma = clean_(data.idioma) || 'pt';
    const pagina = clean_(data.pagina);
    let row, subject, body;

    if (tipo === 'contato') {
      row = [now, nome, email, clean_(data.telefone), clean_(data.empresa), clean_(data.assunto), clean_(data.mensagem), idioma, pagina];
      subject = `[Site] Contato: ${nome}` + (data.empresa ? ` (${clean_(data.empresa)})` : '');
      body = `Novo contato pelo site.\n\nNome: ${nome}\nE-mail: ${email}\nTelefone: ${clean_(data.telefone) || '-'}\nEmpresa: ${clean_(data.empresa) || '-'}\nAssunto: ${clean_(data.assunto) || '-'}\nIdioma: ${idioma}\n\nMensagem:\n${clean_(data.mensagem)}\n\nPágina: ${pagina}`;
    } else if (tipo === 'download') {
      row = [now, nome, email, clean_(data.material), idioma, pagina];
      subject = `[Site] Download: ${clean_(data.material)} — ${nome}`;
      body = `Novo download pelo site.\n\nMaterial: ${clean_(data.material)}\nNome: ${nome}\nE-mail: ${email}\nIdioma: ${idioma}\nPágina: ${pagina}`;
    } else {
      row = [now, nome, email, clean_(data.material), idioma, pagina];
      subject = `[Site] Lista de espera: ${clean_(data.material)} — ${nome}`;
      body = `Nova inscrição na lista de espera.\n\nInteresse: ${clean_(data.material)}\nNome: ${nome}\nE-mail: ${email}\nIdioma: ${idioma}\nPágina: ${pagina}`;
    }

    appendRow_(SHEETS[tipo], row);
    try {
      MailApp.sendEmail({ to: NOTIFY_EMAIL, subject: subject, body: body, replyTo: email, name: 'Site Batistela' });
    } catch (err) {
      // Se o e-mail falhar (cota do dia, por exemplo), o registro na planilha já foi feito.
      Logger.log('Falha ao enviar e-mail: ' + err);
    }
    return json_({ ok: true });
  } catch (err) {
    Logger.log('Erro: ' + err);
    return json_({ ok: false, error: 'server' }, 500);
  }
}

/** Grava uma linha na aba certa, criando a aba e o cabeçalho se ainda não existirem. */
function appendRow_(def, row) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(def.name);
    if (!sheet) {
      sheet = ss.insertSheet(def.name);
      sheet.appendRow(def.headers);
      sheet.getRange(1, 1, 1, def.headers.length).setFontWeight('bold').setBackground('#202a44').setFontColor('#ffffff');
      sheet.setFrozenRows(1);
      sheet.setColumnWidths(1, def.headers.length, 180);
    }
    sheet.appendRow(row);
    const last = sheet.getLastRow();
    sheet.getRange(last, 1).setNumberFormat('dd/mm/yyyy hh:mm');
    // Telefone como texto, para o Sheets não apagar o "+" nem os zeros à esquerda.
    const telIdx = def.headers.indexOf('Telefone');
    if (telIdx >= 0) sheet.getRange(last, telIdx + 1).setNumberFormat('@').setValue(String(row[telIdx] || ''));
  } finally {
    lock.releaseLock();
  }
}

function clean_(v) {
  return String(v == null ? '' : v).trim().slice(0, 5000);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** Executar uma vez no editor para autorizar e testar: cria uma linha de teste e envia o e-mail. */
function testar() {
  const fake = { postData: { contents: JSON.stringify({ tipo: 'contato', nome: 'Teste', email: NOTIFY_EMAIL, mensagem: 'Teste do script', assunto: 'Teste', idioma: 'pt', pagina: 'teste' }) } };
  Logger.log(doPost(fake).getContent());
}
