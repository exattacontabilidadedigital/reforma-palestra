/* ==========================================================================
   Configuração da landing page — edite SÓ este arquivo para ajustar o evento.
   ========================================================================== */

window.CONFIG = {

  /* Para onde vai a inscrição. Vazio = não usa.
     A ordem de tentativa é: API → planilha → WhatsApp.

     1) API com banco SQLite (o padrão, no mesmo VPS).
        Deixe como está se você subiu com o docker-compose deste repositório. */
  ENDPOINT_INSCRICAO: '/api/inscricoes',

  /* 2) Planilha do Google (opcional). Se preenchido, a inscrição é enviada
        TAMBÉM para a planilha — útil para acompanhar pelo celular sem entrar
        no VPS. Passo a passo em site/apps-script/README.md. */
  ENDPOINT_PLANILHA: '',

  /* 3) WhatsApp: entra sozinho quando os dois acima falham ou estão vazios. */
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
