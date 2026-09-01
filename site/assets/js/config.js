/* ==========================================================================
   Configuração da landing page — edite SÓ este arquivo para ajustar o evento.
   ========================================================================== */

window.CONFIG = {

  /* URL do app da web publicado a partir do Google Apps Script.
     Passo a passo em site/apps-script/README.md.
     Enquanto estiver vazia, o formulário valida os campos e cai direto
     no envio pelo WhatsApp (nada é perdido). */
  ENDPOINT_PLANILHA: '',

  /* WhatsApp de contato — só dígitos, com DDI e DDD. */
  WHATSAPP: '5599991660824',

  /* Prazo do contador regressivo do hero (ano, mês-1, dia, hora, minuto). */
  PRAZO_DECISAO: new Date(2026, 8, 30, 23, 59),

  /* Endereço completo da ACIA. Quando preenchido, substitui a linha
     "Açailândia — MA" no card de Local do hero.
     Ex.: 'Rua Goiás, 100 — Centro, Açailândia — MA' */
  ENDERECO: '',

  /* Rótulos usados na mensagem de fallback do WhatsApp. */
  EVENTO: 'Palestra Setembro decide 2027 — 11/09/2026, 19:30, ACIA'
};
