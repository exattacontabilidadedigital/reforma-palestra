# Publicar no VPS da Hostinger com Docker

Sobem dois containers:

- **site** — Caddy: serve a página e emite o certificado HTTPS sozinho
  (Let's Encrypt). A pasta `site/` é montada direto no container.
- **api** — grava as inscrições num banco **SQLite**. Não tem porta publicada:
  só o Caddy alcança, em `/api/`.

O banco fica num volume do Docker (`inscricoes`), separado do código — atualizar
o site não encosta nos dados.

Tempo total: uns 10 minutos.

---

## 1. Apontar o domínio para o VPS

No painel onde fica o DNS do domínio (hPanel da Hostinger, se o domínio for de
lá), crie um registro:

| Tipo | Nome | Valor | TTL |
|---|---|---|---|
| A | `palestra` | IP do seu VPS | 300 |

Isso publica em `palestra.seudominio.com.br`. Para usar o domínio raiz, use
`@` no lugar de `palestra`.

Confira se propagou antes de seguir — na sua máquina:

```bash
nslookup palestra.seudominio.com.br
```

Tem que responder o IP do VPS. **Não pule esta conferência:** se o DNS ainda não
apontar, o Let's Encrypt nega o certificado e o Caddy fica retentando.

## 2. Liberar as portas 80 e 443

No hPanel da Hostinger: **VPS → seu servidor → Firewall**. Precisa ter regras
aceitando TCP 80 e TCP 443. Se o VPS também tiver `ufw` ligado por dentro:

```bash
ufw allow 80/tcp && ufw allow 443/tcp
```

## 3. Entrar no VPS e conferir o Docker

```bash
ssh root@IP-DO-SEU-VPS
docker --version && docker compose version
```

Se não vier versão nenhuma, instale:

```bash
curl -fsSL https://get.docker.com | sh
```

## 4. Baixar o projeto

O repositório é **privado**, então o VPS precisa de credencial para clonar.
O jeito mais seguro é uma chave de deploy (só leitura, só neste repositório):

```bash
# no VPS
ssh-keygen -t ed25519 -C "vps-hostinger-palestra" -f ~/.ssh/id_palestra -N ""
cat ~/.ssh/id_palestra.pub
```

Copie o que apareceu e cole em: **GitHub → repositório `reforma-palestra` →
Settings → Deploy keys → Add deploy key** (pode deixar *Allow write access*
desmarcado).

Depois, ainda no VPS:

```bash
cat >> ~/.ssh/config <<'EOF'
Host github-palestra
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_palestra
EOF

git clone github-palestra:exattacontabilidadedigital/reforma-palestra.git /opt/palestra
cd /opt/palestra
```

## 5. Configurar e subir

Gere a senha da exportação de inscritos:

```bash
openssl rand -hex 24
```

Copie o resultado — vai em `TOKEN_ADMIN` no próximo passo.

```bash
cp .env.example .env
nano .env      # DOMINIO, EMAIL_TLS e TOKEN_ADMIN. Ctrl+O salva, Ctrl+X sai
docker compose up -d --build
```

O `--build` é necessário na primeira vez (e sempre que a pasta `api/` mudar),
porque o container da API é construído a partir do `api/Dockerfile`.

Acompanhe a emissão do certificado:

```bash
docker compose logs -f
```

Quando aparecer `certificate obtained successfully`, pode abrir
`https://palestra.seudominio.com.br` no navegador. Ctrl+C só sai do log, o
container continua rodando.

---

---

## Ver e baixar os inscritos

**Pelo navegador (o jeito do dia a dia).** Abra, trocando pelo seu domínio e
pelo `TOKEN_ADMIN` do `.env`:

```
https://palestra.seudominio.com.br/api/inscricoes.csv?token=SEU-TOKEN
```

Baixa um CSV que o Excel abre com dois cliques — separador `;` e acentuação
correta. Guarde esse link nos favoritos do celular: é a sua lista de presença.

**Pelo terminal, se quiser consultar na hora:**

```bash
cd /opt/palestra
docker compose exec api sqlite3 -header -column /data/inscricoes.db \
  "SELECT id, criado_em, nome, whatsapp, email FROM inscricoes ORDER BY id DESC LIMIT 20;"

# quantas inscrições até agora
docker compose exec api sqlite3 /data/inscricoes.db "SELECT COUNT(*) FROM inscricoes;"
```

## Backup do banco

O banco é um arquivo só, dentro do volume `inscricoes`. Para copiar para a sua
máquina — faça isso na véspera da palestra:

```bash
# no VPS: gera uma cópia consistente (não interrompe as inscrições)
docker compose exec api sqlite3 /data/inscricoes.db ".backup '/data/backup.db'"
docker compose cp api:/data/backup.db ./inscricoes-backup.db

# na sua máquina
scp root@IP-DO-SEU-VPS:/opt/palestra/inscricoes-backup.db .
```

Use sempre `.backup` em vez de copiar o arquivo direto: o SQLite escreve em WAL,
e uma cópia crua no meio de uma gravação pode sair incompleta.

---

## Atualizar a página depois

Como a pasta `site/` é montada no container, **um `git pull` já publica**:

```bash
cd /opt/palestra && git pull
```

Não precisa reiniciar nada. Reinicie só se mexer no `Caddyfile`, no
`docker-compose.yml` ou no `.env`:

```bash
docker compose up -d
```

Se a mudança for na pasta `api/`, aí precisa reconstruir o container:

```bash
docker compose up -d --build
```

O banco não é afetado por nenhum desses comandos — ele vive no volume.

## Comandos do dia a dia

| O que | Comando |
|---|---|
| Ver se está no ar | `docker compose ps` |
| Ver os logs | `docker compose logs -f` |
| Reiniciar | `docker compose restart` |
| Parar | `docker compose down` |
| Subir de novo | `docker compose up -d` |

## Se der problema

**"connection refused" ou a página não abre**
Veja se o container está de pé (`docker compose ps`) e se as portas 80/443
estão liberadas no firewall da Hostinger. Outro serviço ocupando a porta 80
(um Nginx ou Apache instalado antes) impede o Caddy de subir — confira com
`ss -tlnp | grep -E ':80|:443'`.

**O certificado não sai**
Quase sempre é DNS. Confirme com `nslookup` que o domínio responde o IP do VPS
e olhe `docker compose logs` — a mensagem do Let's Encrypt costuma dizer
exatamente o que faltou. O Let's Encrypt limita 5 tentativas por hora para o
mesmo domínio; se estourar, espere uma hora antes de tentar de novo.

**Mudei o `config.js` e o navegador continua com o antigo**
Não deveria acontecer: HTML, CSS e JS vão com `Cache-Control: no-cache`, então
revalidam a cada visita. Se persistir, é cache do próprio navegador —
Ctrl+Shift+R force o recarregamento.

**O formulário mostra "não conseguimos registrar sua inscrição agora"**
É a API que não respondeu. Veja `docker compose ps` (a `api` tem que estar
`healthy`) e `docker compose logs api`. Enquanto isso, ninguém fica sem se
inscrever: a própria mensagem oferece o botão do WhatsApp com os dados já
preenchidos.

**⚠️ Cuidado ao limpar o Docker**
`docker compose down -v` apaga os volumes — e agora um deles é o **banco de
inscrições**. O comando destrói a lista de inscritos e os certificados de uma
vez. Para parar tudo sem perder nada, use `docker compose down` sem o `-v`.

## Adicionar o `www`

Se quiser que `www.palestra.seudominio.com.br` também funcione: crie o registro
DNS do `www` apontando para o mesmo IP e só então descomente o bloco `www.` no
final do `Caddyfile`. Depois, `docker compose restart`.
