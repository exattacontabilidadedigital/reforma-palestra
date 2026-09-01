# Ligar o formulário à planilha do Google

Leva uns 5 minutos e não custa nada. No fim você terá uma URL para colar em
`site/assets/js/config.js`.

## 1. Criar a planilha

1. Abra [sheets.new](https://sheets.new) e dê um nome, ex.: **Inscrições — Palestra 11/09**.
2. Não precisa criar aba nem cabeçalho: o script cria a aba `Inscricoes`
   com os títulos na primeira gravação.

## 2. Colar o script

1. Na planilha: **Extensões → Apps Script**.
2. Apague o conteúdo de `Código.gs` e cole tudo o que está em
   [`Codigo.gs`](./Codigo.gs).
3. Se quiser receber um e-mail a cada inscrição, preencha a linha
   `var EMAIL_AVISO = '';` com o seu e-mail — ex.:
   `var EMAIL_AVISO = 'seu-email@exemplo.com.br';`
4. Salve (ícone de disquete).

## 3. Publicar como app da web

1. Botão **Implantar → Nova implantação**.
2. Em **Selecionar tipo** (engrenagem), escolha **App da Web**.
3. Preencha:
   - **Descrição:** inscrições palestra
   - **Executar como:** *Eu* (sua conta)
   - **Quem pode acessar:** **Qualquer pessoa** ← essencial, senão o site não
     consegue gravar
4. **Implantar**. O Google vai pedir autorização: **Revisar permissões → sua
   conta → Avançado → Acessar (não seguro) → Permitir**. Esse aviso aparece
   porque o script é seu e não passou por revisão do Google — é normal.
5. Copie a **URL do app da web** (termina em `/exec`).

## 4. Colar a URL no site

Em `site/assets/js/config.js`:

```js
ENDPOINT_PLANILHA: 'https://script.google.com/macros/s/AKfycb.../exec',
```

Pronto. Abra a página, faça uma inscrição de teste e confira a planilha.

## Se precisar mudar o script depois

Toda vez que alterar o `Codigo.gs`, faça **Implantar → Gerenciar implantações →
✏️ (editar) → Versão: Nova versão → Implantar**. A URL continua a mesma. Se
criar uma implantação nova em vez de editar a existente, a URL muda e você
precisa atualizar o `config.js`.

## Enquanto a URL não estiver configurada

O site continua funcionando: com `ENDPOINT_PLANILHA` vazio, o botão valida os
campos e abre o WhatsApp já com a mensagem de inscrição preenchida. Nenhuma
inscrição se perde.
