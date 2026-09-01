/* ==========================================================================
   Painel de inscritos — lê a API e monta a tela.
   A senha (TOKEN_ADMIN) fica no sessionStorage: some ao fechar a aba.
   ========================================================================== */
(function () {
  'use strict';

  var API = '/api';
  var CHAVE = 'palestra:token';
  var INTERVALO = 60000;

  var telaEntrada = document.querySelector('[data-tela="entrada"]');
  var telaPainel = document.querySelector('[data-tela="painel"]');
  var formEntrada = document.getElementById('form-entrada');
  var campoToken = document.getElementById('token');
  var erroEntrada = document.querySelector('[data-erro-entrada]');
  var aviso = document.querySelector('[data-aviso]');
  var avisoTexto = document.querySelector('[data-aviso-texto]');
  var corpoTabela = document.querySelector('[data-corpo-tabela]');
  var campoBusca = document.querySelector('[data-busca]');
  var vazio = document.querySelector('[data-vazio]');
  var atualizadoEm = document.querySelector('[data-atualizado-em]');

  var token = '';
  var inscricoes = [];
  var timer = null;

  /* ------------------------------------------------------------ utilidades */

  function guardarToken(valor) {
    try { sessionStorage.setItem(CHAVE, valor); } catch (ignorado) {}
  }

  function lerToken() {
    try { return sessionStorage.getItem(CHAVE) || ''; } catch (ignorado) { return ''; }
  }

  function esquecerToken() {
    try { sessionStorage.removeItem(CHAVE); } catch (ignorado) {}
  }

  function escapar(texto) {
    return String(texto == null ? '' : texto)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatarData(iso) {
    var data = new Date(iso);
    if (isNaN(data.getTime())) return iso || '—';
    var d = String(data.getDate()).padStart(2, '0');
    var m = String(data.getMonth() + 1).padStart(2, '0');
    var h = String(data.getHours()).padStart(2, '0');
    var min = String(data.getMinutes()).padStart(2, '0');
    return d + '/' + m + ' ' + h + ':' + min;
  }

  function formatarTelefone(digitos) {
    var d = String(digitos || '');
    if (d.length === 11) return '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7);
    if (d.length === 10) return '(' + d.slice(0, 2) + ') ' + d.slice(2, 6) + '-' + d.slice(6);
    return d;
  }

  function mostrarAviso(texto) {
    avisoTexto.textContent = texto;
    aviso.hidden = false;
  }

  /* ----------------------------------------------------------------- telas */

  function abrirEntrada(mensagem) {
    telaPainel.hidden = true;
    telaEntrada.hidden = false;
    if (timer) { clearInterval(timer); timer = null; }
    if (mensagem) {
      erroEntrada.textContent = mensagem;
      erroEntrada.hidden = false;
      campoToken.closest('.campo').classList.add('com-erro');
    }
    campoToken.focus();
  }

  function abrirPainel() {
    telaEntrada.hidden = true;
    telaPainel.hidden = false;
    document.querySelector('[data-baixar-csv]').href =
      API + '/inscricoes.csv?token=' + encodeURIComponent(token);
    if (!timer) timer = setInterval(function () { carregar(true); }, INTERVALO);
  }

  /* ------------------------------------------------------------------ dados */

  function carregar(silencioso) {
    return fetch(API + '/inscricoes.json?token=' + encodeURIComponent(token))
      .then(function (r) {
        if (r.status === 403) { var e = new Error('403'); e.negado = true; throw e; }
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (dados) {
        aviso.hidden = true;
        inscricoes = dados.inscricoes || [];
        renderizarResumo(dados.resumo || {});
        renderizarBarras('regime', dados.porRegime || []);
        renderizarBarras('setor', dados.porSetor || []);
        renderizarTabela();
        atualizadoEm.textContent = formatarData(new Date().toISOString());
        return true;
      })
      .catch(function (erro) {
        if (erro && erro.negado) {
          esquecerToken();
          abrirEntrada('Senha inválida ou área restrita desativada no servidor.');
          throw erro;
        }
        if (!silencioso) {
          mostrarAviso('Não conseguimos falar com o servidor. Verifique se a API está no ar (docker compose ps).');
        }
        throw erro;
      });
  }

  function renderizarResumo(resumo) {
    ['total', 'ultimas24h', 'simples', 'querKit'].forEach(function (chave) {
      var el = document.querySelector('[data-kpi="' + chave + '"]');
      if (el) el.textContent = resumo[chave] == null ? '—' : resumo[chave];
    });
  }

  /* Barras de uma série só: tom único, valor rotulado no fim, sem legenda —
     a categoria já está escrita à esquerda. */
  function renderizarBarras(qual, itens) {
    var alvo = document.querySelector('[data-barras="' + qual + '"]');
    if (!itens.length) {
      alvo.innerHTML = '<p class="barras-vazio">Ainda sem inscrições.</p>';
      return;
    }
    var maior = itens.reduce(function (m, i) { return Math.max(m, i.total); }, 0) || 1;
    var total = itens.reduce(function (s, i) { return s + i.total; }, 0) || 1;

    alvo.innerHTML = itens.map(function (item) {
      var pct = Math.round((item.total / total) * 100);
      return '<div class="barra" title="' + escapar(item.rotulo) + ': ' + item.total +
             ' (' + pct + '%)">' +
               '<span class="barra-rotulo">' + escapar(item.rotulo) + '</span>' +
               '<span class="barra-trilha"><span class="barra-preenchimento" style="width:' +
                 ((item.total / maior) * 100).toFixed(1) + '%"></span></span>' +
               '<span class="barra-valor">' + item.total + '</span>' +
             '</div>';
    }).join('');
  }

  function filtradas() {
    var termo = (campoBusca.value || '').trim().toLowerCase();
    if (!termo) return inscricoes;
    return inscricoes.filter(function (i) {
      return [i.nome, i.empresa, i.email, i.whatsapp, i.regime, i.setor]
        .join(' ').toLowerCase().indexOf(termo) !== -1;
    });
  }

  function renderizarTabela() {
    var lista = filtradas();

    if (!lista.length) {
      corpoTabela.innerHTML = '';
      vazio.textContent = inscricoes.length
        ? 'Nenhum inscrito corresponde à busca.'
        : 'Nenhuma inscrição ainda. Assim que alguém preencher o formulário, aparece aqui.';
      vazio.hidden = false;
      return;
    }
    vazio.hidden = true;

    corpoTabela.innerHTML = lista.map(function (i) {
      var zap = 'https://wa.me/55' + i.whatsappDigitos;
      var regime = i.regime
        ? '<span class="etiqueta ' + (i.regime === 'Simples Nacional' ? 'etiqueta--simples' : 'etiqueta--neutra') +
          '">' + escapar(i.regime) + '</span>'
        : '<span class="etiqueta etiqueta--neutra">Não informado</span>';

      return '<tr>' +
        '<td class="celula-id">' + i.id + '</td>' +
        '<td class="celula-data">' + formatarData(i.criadoEm) + '</td>' +
        '<td class="celula-nome">' + escapar(i.nome) + '</td>' +
        '<td class="celula-empresa">' + (escapar(i.empresa) || '—') + '</td>' +
        '<td class="celula-contato-td"><span class="celula-contato">' +
          '<a class="contato-zap" href="' + zap + '" target="_blank" rel="noopener">' +
            '<svg class="ico-14"><use href="#i-whatsapp"></use></svg>' +
            formatarTelefone(i.whatsappDigitos) + '</a>' +
          '<a class="contato-email" href="mailto:' + escapar(i.email) + '">' + escapar(i.email) + '</a>' +
        '</span></td>' +
        '<td class="celula-regime">' + regime + '</td>' +
        '<td class="celula-setor">' + (escapar(i.setor) || '—') + '</td>' +
        '<td class="celula-kit"><span class="etiqueta ' +
          (i.querKit ? 'etiqueta--sim' : 'etiqueta--nao') + '">' +
          (i.querKit ? 'Kit: sim' : 'Kit: não') + '</span></td>' +
        '<td class="celula-acoes"><button class="botao-apagar" type="button" data-apagar="' + i.id +
          '" title="Apagar inscrição" aria-label="Apagar inscrição de ' + escapar(i.nome) + '">' +
          '<svg class="ico-14"><use href="#i-trash"></use></svg></button></td>' +
      '</tr>';
    }).join('');
  }

  /* ------------------------------------------------------------------ ações */

  formEntrada.addEventListener('submit', function (e) {
    e.preventDefault();
    erroEntrada.hidden = true;
    campoToken.closest('.campo').classList.remove('com-erro');
    token = campoToken.value.trim();
    if (!token) return;

    carregar()
      .then(function () {
        guardarToken(token);
        campoToken.value = '';
        abrirPainel();
      })
      .catch(function () {});
  });

  document.querySelector('[data-atualizar]').addEventListener('click', function () {
    carregar().catch(function () {});
  });

  document.querySelector('[data-sair]').addEventListener('click', function () {
    esquecerToken();
    token = '';
    inscricoes = [];
    abrirEntrada();
  });

  campoBusca.addEventListener('input', renderizarTabela);

  document.querySelector('[data-copiar-emails]').addEventListener('click', function (e) {
    var lista = filtradas().map(function (i) { return i.email; });
    if (!lista.length) return;
    var botao = e.currentTarget;
    var texto = lista.join(', ');
    var aviso2 = botao.querySelector('span');
    var original = aviso2.textContent;

    var pronto = function () {
      aviso2.textContent = lista.length + ' copiados';
      setTimeout(function () { aviso2.textContent = original; }, 2000);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texto).then(pronto, function () { window.prompt('Copie os e-mails:', texto); });
    } else {
      window.prompt('Copie os e-mails:', texto);
    }
  });

  corpoTabela.addEventListener('click', function (e) {
    var botao = e.target.closest('[data-apagar]');
    if (!botao) return;
    var id = botao.getAttribute('data-apagar');
    var pessoa = inscricoes.filter(function (i) { return String(i.id) === String(id); })[0];
    if (!window.confirm('Apagar a inscrição de ' + (pessoa ? pessoa.nome : id) + '? Isso não tem volta.')) return;

    botao.disabled = true;
    fetch(API + '/inscricoes/' + id + '?token=' + encodeURIComponent(token), { method: 'DELETE' })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return carregar();
      })
      .catch(function () {
        botao.disabled = false;
        mostrarAviso('Não conseguimos apagar essa inscrição. Tente novamente.');
      });
  });

  /* -------------------------------------------------------------- abertura */

  token = lerToken();
  if (token) {
    carregar().then(abrirPainel).catch(function () {});
  } else {
    abrirEntrada();
  }
})();
