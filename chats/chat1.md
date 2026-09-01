# Reforma Tributária: Setembro Decide 2027

_Started 2026-09-01 12:17 UTC_

---

## User

crie uma landingpage para a palestra do dia 11/09/2026 na acia - associação comecial de açailandia - ma as 19:30h, uma plestra sobre a reforma tributaria: aspectos práticos para setembro de 2027. titulo da palestra Reforma tributária: Simples híbrido ou convencional? que decidir até 30 de setembro. 1. Ficha da palestra
Item	Definição
Título	Setembro decide 2027 — o que sua empresa tem que resolver agora
Subtítulo	Simples híbrido ou convencional, nota fiscal com IBS e CBS, split payment e RAD
Público	Empresários optantes pelo Simples Nacional (clientes e prospects)
Formato	10 min de exposição + 25 a 30 min de bate-papo aberto + 5 min de apresentação do serviço de classificação
Duração total	45 minutos
Entregável	Kit prático: árvore de decisão impressa, planilha de simulação e ferramenta web de diagnóstico
Promessa	"Você sai daqui sabendo o que fazer na segunda-feira de manhã — e com o papel na mão." A reforma tributária deixou de ser assunto de 2033. Em setembro de 2026 abre a única janela do ano para a empresa do Simples Nacional decidir se vai apurar IBS e CBS dentro ou fora do DAS — e a escolha vale a partir de janeiro de 2027. Em paralelo, a nota fiscal já mudou: CST e cClassTrib passam a ser obrigatórios para o Simples em 4 de janeiro de 2027, e a rejeição da nota não avisa antes. Esta palestra vai direto ao que precisa ser decidido agora: o regime, o cadastro fiscal, o preço e o caixa. Sem teoria de transição, sem alíquota de 2033. Ao final, cada participante leva um framework de decisão preenchível e um plano de 90 dias. lembrando que a pagina é para as inscrições precisa ter o formulario de inscrição.

## Assistant

_[tool: list_files]_

_[tool: grep]_

_[tool: grep]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: list_files]_

_[tool: copy_files]_

_[tool: dc_write]_

_[tool: show_html]_

_[tool: ready_for_verification]_

Landing page pronta, em pt-BR e no sistema Exatta: hero navy com data/local/promessa, o bloco "por que agora" com seu texto na íntegra, as quatro decisões, ficha da palestra, kit prático e o formulário de inscrição (nome, WhatsApp, e-mail, empresa, regime, setor + opt-in do kit) com estado de confirmação.

Faltam dois dados que coloquei como suposição: o palestrante (nome/cargo não apareceu na ficha) e o endereço completo da ACIA. Me passe que eu insiro. O formulário hoje é só front-end — se quiser que envie para uma planilha, e-mail ou CRM, diga qual.

## User

Found issues — fixing…

## Assistant

_[tool: grep]_

_[tool: run_script]_

_[tool: ready_for_verification]_

Corrigi os tokens de tipografia (`--fw-extra` e substituição de `--type-caption`); os títulos voltaram à escala correta.

## User

como vai funcionar

## Assistant

_[tool: dc_html_str_replace]_

## User

adicione os contatos 99991660824 é whatsapp coloque o botão tbm do zap

## Assistant

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

WhatsApp (99) 99166-0824 em três pontos: botão no topo, botão "Dúvidas?" ao lado do CTA final e contato no rodapé — todos abrindo `wa.me/5599991660824`.

