/* ==========================================================================
   Landing page de inscrições — palestra "Setembro decide 2027"
   Exatta Contabilidade Digital
   ========================================================================== */
(function () {
  'use strict';

  var CFG = window.CONFIG || {};
  var form = document.getElementById('form-inscricao');
  var botao = document.querySelector('[data-submit]');
  var alerta = document.querySelector('[data-form-alert]');
  var alertaTexto = document.querySelector('[data-form-alert-text]');
  var linkFallback = document.querySelector('[data-wa-fallback]');
  var telaFormulario = document.querySelector('[data-state="formulario"]');
  var telaConfirmado = document.querySelector('[data-state="confirmado"]');

  /* ---------------------------------------------------------------- hero */

  function pluralDias(n) {
    return n === 1 ? '1 dia' : n + ' dias';
  }

  (function contador() {
    var el = document.querySelector('[data-dias-restantes]');
    if (!el) return;
    var prazo = CFG.PRAZO_DECISAO || new Date(2026, 8, 30, 23, 59);
    var dias = Math.max(0, Math.ceil((prazo - new Date()) / 86400000));
    el.textContent = pluralDias(dias);
  })();

  (function endereco() {
    var el = document.querySelector('[data-endereco]');
    if (el && CFG.ENDERECO) el.textContent = CFG.ENDERECO;
  })();

  /* -------------------------------------------------------- select vazio */

  Array.prototype.forEach.call(document.querySelectorAll('.control-select select'), function (sel) {
    sel.addEventListener('change', function () {
      sel.classList.toggle('is-placeholder', sel.value === '');
    });
  });

  if (!form) return;

  /* ------------------------------------------------- máscara de WhatsApp */

  var campoWhats = document.getElementById('whats');

  function mascaraTelefone(valor) {
    var d = valor.replace(/\D/g, '').slice(0, 11);
    if (d.length <= 2) return d.length ? '(' + d : '';
    if (d.length <= 6) return '(' + d.slice(0, 2) + ') ' + d.slice(2);
    if (d.length <= 10) return '(' + d.slice(0, 2) + ') ' + d.slice(2, 6) + '-' + d.slice(6);
    return '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7);
  }

  campoWhats.addEventListener('input', function () {
    var posFim = campoWhats.selectionStart === campoWhats.value.length;
    campoWhats.value = mascaraTelefone(campoWhats.value);
    if (posFim) campoWhats.setSelectionRange(campoWhats.value.length, campoWhats.value.length);
  });

  /* ----------------------------------------------------------- validação */

  var REGRAS = {
    nome: function (v) {
      if (!v.trim()) return 'Informe seu nome.';
      if (v.trim().split(/\s+/).length < 2) return 'Informe nome e sobrenome.';
      return '';
    },
    whats: function (v) {
      var d = v.replace(/\D/g, '');
      if (!d) return 'Informe seu WhatsApp.';
      if (d.length < 10 || d.length > 11) return 'Informe o número com DDD, ex.: (99) 99999-9999.';
      return '';
    },
    email: function (v) {
      if (!v.trim()) return 'Informe seu e-mail.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) return 'E-mail inválido.';
      return '';
    }
  };

  function marcarErro(nome, mensagem) {
    var campo = document.getElementById(nome);
    var wrapper = campo.closest('.field');
    var span = document.querySelector('[data-error-for="' + nome + '"]');
    wrapper.classList.toggle('has-error', !!mensagem);
    if (span) {
      span.textContent = mensagem;
      span.hidden = !mensagem;
    }
    campo.setAttribute('aria-invalid', mensagem ? 'true' : 'false');
  }

  Object.keys(REGRAS).forEach(function (nome) {
    var campo = document.getElementById(nome);
    campo.addEventListener('blur', function () {
      marcarErro(nome, REGRAS[nome](campo.value));
    });
    campo.addEventListener('input', function () {
      if (campo.closest('.field').classList.contains('has-error')) {
        marcarErro(nome, REGRAS[nome](campo.value));
      }
    });
  });

  function validar() {
    var primeiroErro = null;
    Object.keys(REGRAS).forEach(function (nome) {
      var campo = document.getElementById(nome);
      var msg = REGRAS[nome](campo.value);
      marcarErro(nome, msg);
      if (msg && !primeiroErro) primeiroErro = campo;
    });
    if (primeiroErro) primeiroErro.focus();
    return !primeiroErro;
  }

  /* -------------------------------------------------------------- envio */

  var ROTULO_REGIME = {
    simples: 'Simples Nacional', presumido: 'Lucro Presumido', real: 'Lucro Real',
    mei: 'MEI', 'nao-sei': 'Não sei / vou abrir empresa'
  };
  var ROTULO_SETOR = {
    comercio: 'Comércio', servicos: 'Serviços', industria: 'Indústria',
    agro: 'Agronegócio', transporte: 'Transporte e logística', outro: 'Outro'
  };

  /* Valores crus, como estão no formulário — é o que a API espera. */
  function coletar() {
    return {
      nome: document.getElementById('nome').value.trim(),
      whatsapp: document.getElementById('whats').value.trim(),
      email: document.getElementById('email').value.trim(),
      empresa: document.getElementById('empresa').value.trim(),
      regime: document.getElementById('regime').value,
      setor: document.getElementById('setor').value,
      kit: document.getElementById('kit').checked ? '1' : '0',
      website: document.getElementById('website').value,
      origem: window.location.href
    };
  }

  /* Mesma inscrição com os rótulos por extenso — para a planilha e o WhatsApp,
     que são lidos por gente, não por código. */
  function comRotulos(dados) {
    return {
      nome: dados.nome,
      whatsapp: dados.whatsapp,
      email: dados.email,
      empresa: dados.empresa,
      regime: ROTULO_REGIME[dados.regime] || '',
      setor: ROTULO_SETOR[dados.setor] || '',
      kit: dados.kit === '1' ? 'Sim' : 'Não',
      origem: dados.origem,
      enviadoEm: new Date().toISOString()
    };
  }

  function mensagemWhats(dados) {
    var linhas = [
      'Quero me inscrever na palestra.',
      '',
      'Evento: ' + (CFG.EVENTO || ''),
      'Nome: ' + dados.nome,
      'WhatsApp: ' + dados.whatsapp,
      'E-mail: ' + dados.email
    ];
    if (dados.empresa) linhas.push('Empresa: ' + dados.empresa);
    if (dados.regime) linhas.push('Regime: ' + dados.regime);
    if (dados.setor) linhas.push('Setor: ' + dados.setor);
    linhas.push('Quer o kit por e-mail: ' + dados.kit);
    return linhas.join('\n');
  }

  function linkWhats(dados) {
    return 'https://wa.me/' + (CFG.WHATSAPP || '5599991660824') +
           '?text=' + encodeURIComponent(mensagemWhats(dados));
  }

  /* Abre o WhatsApp em outra aba. Se o bloqueador de pop-up barrar o
     window.open, tenta de novo com um link clicado — é o caminho que os
     bloqueadores costumam deixar passar. */
  function abrirWhats(dados) {
    var url = linkWhats(dados);
    var aba = null;
    try { aba = window.open(url, '_blank', 'noopener'); } catch (ignorado) {}
    if (aba) return;
    var link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function carregando(ativo) {
    botao.disabled = ativo;
    botao.innerHTML = ativo
      ? '<span class="btn-spinner" aria-hidden="true"></span>Enviando…'
      : 'Confirmar inscrição';
  }

  function mostrarAlerta(texto, dados) {
    alertaTexto.textContent = texto;
    linkFallback.href = linkWhats(dados);
    alerta.hidden = false;
  }

  function confirmar() {
    telaFormulario.hidden = true;
    telaConfirmado.hidden = false;
    telaConfirmado.setAttribute('tabindex', '-1');
    telaConfirmado.focus();
    document.getElementById('inscricao').scrollIntoView({ block: 'center' });
  }

  /* Envia para a API do próprio servidor, que grava no banco SQLite.
     Mesma origem da página: sem CORS, e a resposta pode ser lida de verdade —
     é por isso que aqui dá para devolver erro campo a campo. */
  function enviarParaApi(dados) {
    return fetch(CFG.ENDPOINT_INSCRICAO, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (json) {
        if (r.status === 422 && json.erros) {
          var e = new Error('validacao');
          e.erros = json.erros;
          throw e;
        }
        if (!r.ok || json.ok === false) throw new Error('HTTP ' + r.status);
        return true;
      });
    });
  }

  /* Envia para o app da web do Apps Script.
     Corpo em application/x-www-form-urlencoded para evitar preflight CORS.
     Se a leitura da resposta falhar (CORS/rede), tenta uma segunda vez em
     no-cors: a linha ainda é gravada na planilha, só não conseguimos ler o
     retorno. Só depois disso é que caímos no fallback do WhatsApp. */
  function enviarParaPlanilha(dados) {
    var corpo = new URLSearchParams(dados);
    return fetch(CFG.ENDPOINT_PLANILHA, { method: 'POST', body: corpo })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (json) {
        if (json && json.ok === false) throw new Error(json.erro || 'Falha ao gravar');
        return true;
      })
      .catch(function () {
        return fetch(CFG.ENDPOINT_PLANILHA, { method: 'POST', mode: 'no-cors', body: corpo })
          .then(function () { return true; });
      });
  }

  /* Erros que a API devolveu (422) viram marcação nos campos, como se a
     validação tivesse acontecido aqui. */
  function aplicarErrosDaApi(erros) {
    var primeiro = null;
    var mapa = { nome: 'nome', whatsapp: 'whats', email: 'email' };
    Object.keys(erros).forEach(function (chave) {
      var id = mapa[chave];
      if (!id) return;
      marcarErro(id, erros[chave]);
      if (!primeiro) primeiro = document.getElementById(id);
    });
    if (primeiro) primeiro.focus();
  }

  /* Ordem de tentativa: API (banco SQLite) → planilha → WhatsApp.
     Com a API no ar e a planilha também configurada, a planilha recebe uma
     cópia sem segurar a confirmação: se ela falhar, a inscrição já está
     salva no banco e nada muda para quem se inscreveu. */
  function enviar(dados, rotulados) {
    if (CFG.ENDPOINT_INSCRICAO) {
      return enviarParaApi(dados).then(function () {
        if (CFG.ENDPOINT_PLANILHA) {
          enviarParaPlanilha(rotulados).catch(function () {});
        }
        return true;
      }).catch(function (erro) {
        if (erro && erro.erros) throw erro;
        if (CFG.ENDPOINT_PLANILHA) return enviarParaPlanilha(rotulados);
        throw erro;
      });
    }
    return enviarParaPlanilha(rotulados);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    alerta.hidden = true;
    if (!validar()) return;

    var dados = coletar();
    var rotulados = comRotulos(dados);

    /* Nenhum destino configurado: manda pelo WhatsApp e confirma. */
    if (!CFG.ENDPOINT_INSCRICAO && !CFG.ENDPOINT_PLANILHA) {
      abrirWhats(rotulados);
      confirmar();
      return;
    }

    carregando(true);
    enviar(dados, rotulados)
      .then(confirmar)
      .catch(function (erro) {
        if (erro && erro.erros) {
          aplicarErrosDaApi(erro.erros);
          return;
        }
        mostrarAlerta(
          'Não conseguimos registrar sua inscrição agora. Tente de novo em instantes ou envie pelo WhatsApp — a gente confirma na hora.',
          rotulados
        );
      })
      .then(function () { carregando(false); });
  });
})();
