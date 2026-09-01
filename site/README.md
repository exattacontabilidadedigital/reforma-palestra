# Landing page de inscrições — Palestra "Setembro decide 2027"

Página de inscrições da palestra sobre a reforma tributária na ACIA
(Açailândia — MA), 11/09/2026 às 19:30. Implementada a partir do design
exportado do Claude Design (`../project/Palestra Reforma Tributaria.dc.html`).

Site estático puro: **não tem build, não tem dependência, não tem npm.** É só
subir a pasta.

## Estrutura

```
site/
├── index.html                  a página inteira
├── assets/
│   ├── css/
│   │   ├── tokens/             tokens do design system Exatta (cópia fiel)
│   │   └── styles.css          estilos da página
│   ├── js/
│   │   ├── config.js           ← o que você edita: endpoint, WhatsApp, endereço
│   │   └── app.js              máscara, validação e envio
│   └── img/                    logo e marca
└── apps-script/
    ├── Codigo.gs               script que grava as inscrições na planilha
    └── README.md               passo a passo da instalação (5 min)
```

## Como publicar

A publicação é no **VPS da Hostinger com Docker** — um container Caddy servindo
esta pasta, com HTTPS automático. O passo a passo está em
[`../DEPLOY.md`](../DEPLOY.md).

Depois de publicado, atualizar a página é só `git pull` no VPS: a pasta `site/`
é montada dentro do container, então o conteúdo novo entra no ar na hora, sem
reiniciar nada.

Para testar na sua máquina antes:

```bash
cd .. && docker compose up --build
# abra http://localhost   (o Caddy tenta HTTPS no domínio do .env; para testar
#                          local, coloque DOMINIO=:80 no .env)
```

Para olhar só o visual, sem banco nem Docker, um servidor estático resolve. Aí
o envio mostra o aviso de falha com o botão do WhatsApp, porque a API não
existe nesse modo:

```bash
cd site && python3 -m http.server 8000
# abra http://localhost:8000
```

## Para onde vai a inscrição

Três destinos, tentados nesta ordem — o primeiro que funcionar confirma:

1. **Banco SQLite** (o padrão) — a API em [`../api/`](../api/) grava no
   `/data/inscricoes.db`, dentro do VPS. Configurado em `config.js` como
   `ENDPOINT_INSCRICAO: '/api/inscricoes'`. Para ver a lista, veja
   *Ver e baixar os inscritos* no [`../DEPLOY.md`](../DEPLOY.md).
2. **Planilha do Google** (opcional) — se você preencher `ENDPOINT_PLANILHA`,
   cada inscrição também é copiada para uma planilha, útil para acompanhar pelo
   celular sem entrar no VPS. Passo a passo em
   [`apps-script/README.md`](./apps-script/README.md). Se a planilha falhar, não
   atrapalha: a inscrição já está no banco.
3. **WhatsApp** — entra sozinho quando os dois de cima falham ou estão vazios.
   A página monta a mensagem com os dados preenchidos e abre o `wa.me`.

Ou seja: **ninguém fica sem se inscrever**, nem se a API cair, nem enquanto
você ainda está configurando as coisas.

### Anti-spam

O formulário tem um campo isca invisível (`#website`). Gente não vê nem
alcança pelo teclado; robô de spam preenche. Quando vem preenchido, o servidor
descarta a inscrição respondendo como se tivesse dado certo — assim o robô não
insiste. A API também ignora inscrições repetidas (mesmo e-mail ou mesmo
WhatsApp) dentro de 10 minutos, o que cobre o duplo-clique no botão.

## O que dá para ajustar sem mexer em código

Tudo em `assets/js/config.js`:

| Item | Campo |
|---|---|
| Endereço da API que grava no banco | `ENDPOINT_INSCRICAO` |
| URL da planilha (opcional) | `ENDPOINT_PLANILHA` |
| Número do WhatsApp | `WHATSAPP` (só dígitos, com DDI e DDD) |
| Data do contador regressivo | `PRAZO_DECISAO` |
| Endereço completo da ACIA | `ENDERECO` (quando preenchido, aparece no card de Local) |

Textos, títulos e a ficha da palestra estão direto no `index.html`, em
português e sem template — é só editar o texto entre as tags.

## Pendências do design

Dois dados ficaram em aberto desde a conversa no Claude Design:

1. **Palestrante** — nome e cargo não apareceram na ficha, então a página não
   tem seção de palestrante. Se quiser incluir, é um bloco novo.
2. **Endereço completo da ACIA** — hoje a página diz apenas "Açailândia — MA".
   Preencha `ENDERECO` no `config.js` quando tiver o endereço da rua.

## Compartilhamento no WhatsApp

A página já tem as tags Open Graph (título, descrição e imagem) para o preview
do link no zap. A imagem hoje é o logo (`assets/img/exatta-logo-color.jpg`).
Para um preview melhor, vale trocar por uma arte de 1200×630 px com o título da
palestra e a data — troque a linha `og:image` no `index.html`.

## Acessibilidade e compatibilidade

- Layout responsivo (testado em 1280px e 390px de largura).
- Rótulos ligados aos campos, `aria-invalid` nos campos com erro, foco visível.
- Respeita `prefers-reduced-motion`.
- Chrome, Edge, Safari e Firefox atuais. O estilo do checkbox usa `:has()`
  (suportado em todos eles desde 2023); em navegador muito antigo o checkbox
  aparece sem o preenchimento vermelho, mas continua funcionando.
