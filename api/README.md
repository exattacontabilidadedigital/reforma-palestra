# API de inscrições

Serviço mínimo em Python (Flask) que grava as inscrições da landing page num
banco **SQLite**. Roda atrás do Caddy, sem porta publicada: a internet só chega
aqui através de `/api/` no domínio do site.

## Rotas

| Método | Rota | O que faz |
|---|---|---|
| `POST` | `/inscricoes` | Grava uma inscrição. Aceita JSON ou formulário. |
| `GET` | `/inscricoes.csv?token=…` | Exporta tudo em CSV (exige `TOKEN_ADMIN`). |
| `GET` | `/health` | Usado pelo healthcheck do Docker. Devolve o total. |

Pelo domínio, essas rotas ficam em `/api/inscricoes`, `/api/inscricoes.csv` e
`/api/health` — o Caddy corta o prefixo `/api` antes de encaminhar.

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
