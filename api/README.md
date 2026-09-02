# API de inscrições

Serviço mínimo em Python (Flask) que grava as inscrições da landing page num
banco **SQLite**. Roda atrás do Caddy, sem porta publicada: a internet só chega
aqui através de `/api/` no domínio do site.

## Rotas

| Método | Rota | O que faz |
|---|---|---|
| `POST` | `/inscricoes` | Grava uma inscrição. Aceita JSON ou formulário. |
| `GET` | `/inscricoes.json` 🔒 | Lista + resumo. Alimenta a página `/admin.html`. |
| `GET` | `/inscricoes.csv` 🔒 | Exporta tudo em CSV. |
| `DELETE` | `/inscricoes/<id>` 🔒 | Apaga uma inscrição (teste seu ou cadastro falso). |
| `GET` | `/config` 🔒 | Configuração de e-mail + lista de variáveis. |
| `POST` | `/config` 🔒 | Salva a configuração de e-mail. |
| `POST` | `/email/teste` 🔒 | Manda um e-mail de teste para um endereço. |
| `POST` | `/lembretes` 🔒 | Envia o lembrete a quem ainda não recebeu. |
| `GET` | `/health` | Usado pelo healthcheck do Docker. Devolve o total. |

Pelo domínio, essas rotas ficam sob `/api/` — o Caddy corta o prefixo antes de
encaminhar.

## A senha vai no cabeçalho

Todas as rotas marcadas com 🔒 exigem o `TOKEN_ADMIN`, **num cabeçalho**:

```bash
curl -H "X-Token: sua-senha" https://SEU-DOMINIO/api/inscricoes.json
curl -H "Authorization: Bearer sua-senha" https://SEU-DOMINIO/api/inscricoes.csv -o lista.csv
```

Não vai na URL de propósito: query string entra no log de acesso do servidor e
no histórico do navegador, e a senha viajaria junto em cada requisição. Quem
tentar pela URL recebe um `403` explicando o formato certo.

Sem `TOKEN_ADMIN` configurado, essas rotas respondem `403` e a área restrita
fica desligada.

A comparação é feita com `secrets.compare_digest`: comparação comum termina no
primeiro caractere diferente, e esse tempo a mais entrega o token aos poucos
para quem estiver medindo.

### Respostas do `POST /inscricoes`

| Situação | Status | Corpo |
|---|---|---|
| Gravou | `201` | `{"ok": true, "id": 12}` |
| Repetida em menos de 10 min | `200` | `{"ok": true, "id": 12, "duplicada": true}` |
| Campo inválido | `422` | `{"ok": false, "erros": {"email": "E-mail inválido."}}` |
| Campo isca preenchido | `201` | `{"ok": true}` — e **nada é gravado** |

A página usa o `422` para marcar o campo errado em vermelho, com a mesma
mensagem que a validação do navegador mostraria.

## Configuração

| Variável | Para quê |
|---|---|
| `BANCO` | Caminho do arquivo do banco. Padrão: `/data/inscricoes.db` |
| `TOKEN_ADMIN` | Senha da exportação em CSV. Vazio = exportação desligada |

## O banco

Uma tabela só, `inscricoes`. Além do que a pessoa preenche, guarda `criado_em`,
a página de origem, o navegador e o IP — úteis se aparecer inscrição estranha.

O `whatsapp` é gravado como a pessoa digitou e também só em dígitos
(`whatsapp_digitos`), que é o formato para procurar e para montar link do
`wa.me`.

O banco roda em modo WAL: baixar o CSV não trava quem está se inscrevendo
naquele instante.

## Decisões que valem explicar

**Por que SQLite e não Postgres.** Uma palestra num auditório gera dezenas de
inscrições, não milhares por segundo. SQLite é um arquivo só: sem container de
banco, sem senha de banco, sem tuning — e o backup é copiar um arquivo.

**Por que os códigos e não os rótulos.** O banco guarda `simples`, `servicos`.
Os nomes por extenso ("Simples Nacional", "Serviços") aparecem na hora de
exportar. Assim, mudar um rótulo na página não bagunça o histórico.

**Por que a API valida de novo.** A validação do navegador é conveniência, não
segurança: qualquer um manda um POST direto. Toda regra da página está repetida
aqui, e é esta que vale.

## Mexer no código

Depois de qualquer alteração nesta pasta, é preciso reconstruir o container:

```bash
cd /opt/palestra && docker compose up -d --build
```

Para rodar fora do Docker durante o desenvolvimento:

```bash
cd api
pip install -r requirements.txt
BANCO=./teste.db TOKEN_ADMIN=teste python3 app.py
# a API sobe em http://127.0.0.1:3000
```

## E-mails

`emails.py` monta e envia a confirmação da inscrição e o lembrete do dia,
usando `smtplib` da biblioteca padrão — sem dependência nova.

**A configuração fica no banco, não em variável de ambiente.** Toda ela é
editada na aba "E-mails" da página `/admin.html`: servidor SMTP, remetente,
assunto e corpo das duas mensagens. Isso existe para você poder mudar o texto
de um e-mail sem mexer em código nem reimplantar container.

### Como o texto vira e-mail

Você escreve **texto puro**, com `{{variaveis}}`. No envio:

1. As variáveis são trocadas pelos dados de cada inscrito
2. Linha em branco vira parágrafo
3. O texto entra no layout com a marca da Exatta

Ou seja: quem escreve não precisa saber HTML, e o e-mail sai com cara de
profissional. A versão em texto puro vai junto, para cliente de e-mail que não
mostra HTML.

As variáveis disponíveis estão em `VARIAVEIS`, e aparecem clicáveis na tela.
Variável desconhecida vira vazio — nunca aparece `{{errado}}` no e-mail.

### Decisões que valem explicar

**A senha nunca volta para a tela.** O `GET /config` devolve todos os campos
menos a senha, mais um booleano dizendo se existe uma salva. Ao salvar com o
campo em branco, a senha atual é mantida — em vez de apagada.

**O envio da confirmação é em segundo plano.** Uma thread cuida disso, então
SMTP lento ou fora do ar não segura a resposta nem faz a inscrição falhar. Se
o e-mail não sair, a inscrição está salva do mesmo jeito.

**O lembrete não manda em dobro.** Cada inscrição guarda `lembrete_enviado_em`;
o disparo só pega quem está sem essa marca, e a marca só é gravada quando o
envio dá certo. Clicar duas vezes por engano não incomoda ninguém.

**A confirmação leva o convite de agenda anexado** (`.ics`), para a pessoa
salvar a data com um clique.
