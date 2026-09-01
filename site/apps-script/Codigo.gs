/**
 * Recebe as inscrições da landing page da palestra e grava numa planilha.
 *
 * Instalação: veja o README.md desta pasta.
 * Publicar como: Implantar > Nova implantação > App da Web
 *   - Executar como: Eu (sua conta)
 *   - Quem pode acessar: Qualquer pessoa
 */

var ABA = 'Inscricoes';

var COLUNAS = [
  ['enviadoEm', 'Data/hora'],
  ['nome',      'Nome'],
  ['whatsapp',  'WhatsApp'],
  ['email',     'E-mail'],
  ['empresa',   'Empresa'],
  ['regime',    'Regime'],
  ['setor',     'Setor'],
  ['kit',       'Quer o kit'],
  ['origem',    'Origem']
];

/* Avisa por e-mail a cada inscrição. Deixe '' para não enviar aviso. */
var EMAIL_AVISO = '';

function doPost(e) {
  var trava = LockService.getScriptLock();
  try {
    trava.waitLock(20000);

    var dados = lerParametros(e);
    if (!dados.nome || !dados.whatsapp || !dados.email) {
      return json({ ok: false, erro: 'Campos obrigatórios ausentes' });
    }

    var aba = obterAba();
    aba.appendRow(COLUNAS.map(function (col) {
      return col[0] === 'enviadoEm' ? formatarData(dados.enviadoEm) : (dados[col[0]] || '');
    }));

    avisar(dados);
    return json({ ok: true });

  } catch (erro) {
    return json({ ok: false, erro: String(erro) });
  } finally {
    try { trava.releaseLock(); } catch (ignorado) {}
  }
}

/** Permite testar a implantação abrindo a URL no navegador. */
function doGet() {
  return json({ ok: true, servico: 'Inscrições — palestra Setembro decide 2027' });
}

function lerParametros(e) {
  var p = (e && e.parameter) || {};
  /* Aceita também JSON puro, caso o front-end mude no futuro. */
  if (e && e.postData && e.postData.type === 'application/json') {
    try { p = JSON.parse(e.postData.contents); } catch (ignorado) {}
  }
  return p;
}

function obterAba() {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var aba = planilha.getSheetByName(ABA);
  if (!aba) {
    aba = planilha.insertSheet(ABA);
  }
  if (aba.getLastRow() === 0) {
    var titulos = COLUNAS.map(function (col) { return col[1]; });
    aba.appendRow(titulos);
    aba.getRange(1, 1, 1, titulos.length).setFontWeight('bold');
    aba.setFrozenRows(1);
  }
  return aba;
}

function formatarData(iso) {
  var data = iso ? new Date(iso) : new Date();
  if (isNaN(data.getTime())) data = new Date();
  return Utilities.formatDate(data, 'America/Fortaleza', 'dd/MM/yyyy HH:mm:ss');
}

function avisar(dados) {
  if (!EMAIL_AVISO) return;
  try {
    MailApp.sendEmail(
      EMAIL_AVISO,
      'Nova inscrição: ' + dados.nome,
      COLUNAS.map(function (col) { return col[1] + ': ' + (dados[col[0]] || '—'); }).join('\n')
    );
  } catch (ignorado) {}
}

function json(objeto) {
  return ContentService
    .createTextOutput(JSON.stringify(objeto))
    .setMimeType(ContentService.MimeType.JSON);
}
