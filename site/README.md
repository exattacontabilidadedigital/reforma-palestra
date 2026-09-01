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
cd site && python3 -m http.server 8000
# abra http://localhost:8000
```

## Ligar o formulário à planilha

O formulário grava cada inscrição numa planilha do Google via Apps Script.
O passo a passo está em [`apps-script/README.md`](./apps-script/README.md) —
no fim você cola a URL em `assets/js/config.js`:

```js
ENDPOINT_PLANILHA: 'https://script.google.com/macros/s/AKfycb.../exec',
```

**Enquanto essa URL estiver vazia**, o botão continua funcionando: valida os
campos e abre o WhatsApp com a mensagem de inscrição já montada. Ninguém fica
sem se inscrever enquanto você configura a planilha.

E mesmo com a planilha ligada, se a internet do inscrito falhar no momento do
envio, a página mostra um aviso com o link do WhatsApp preenchido — a inscrição
não se perde.

## O que dá para ajustar sem mexer em código

Tudo em `assets/js/config.js`:

| Item | Campo |
|---|---|
| URL da planilha | `ENDPOINT_PLANILHA` |
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
