"""
E-mails da palestra: confirmação de inscrição e lembrete do dia.

A configuração (SMTP e textos) vem do banco, editável na página de
configurações do admin — nada aqui depende de variável de ambiente.

Envio por SMTP com a biblioteca padrão. Nenhuma falha aqui pode derrubar uma
inscrição: quem chama trata o retorno e segue.
"""

import logging
import re
import smtplib
import ssl
from email.message import EmailMessage
from email.utils import formataddr, make_msgid

log = logging.getLogger("emails")

# --------------------------------------------------------------- o evento

EVENTO = {
    "data": "11 de setembro de 2026, sexta-feira",
    "hora": "19:30",
    "chegada": "19:15",
    "local": "ACIA — Associação Comercial de Açailândia",
    "cidade": "Açailândia — MA",
    "duracao": "45 minutos",
}

# Horários em UTC para o anexo de agenda (19:30 em Açailândia = 22:30 UTC).
ICS_INICIO = "20260911T223000Z"
ICS_FIM = "20260911T231500Z"

# As variáveis que podem ser usadas no assunto e no corpo, com a explicação
# que aparece na tela de configurações.
VARIAVEIS = [
    ("nome", "Nome completo de quem se inscreveu"),
    ("primeiro_nome", "Só o primeiro nome"),
    ("email", "E-mail informado"),
    ("whatsapp", "WhatsApp informado"),
    ("empresa", "Empresa (vazio se não informou)"),
    ("regime", "Regime tributário escolhido"),
    ("setor", "Setor de atuação"),
    ("data", EVENTO["data"]),
    ("hora", EVENTO["hora"]),
    ("chegada", EVENTO["chegada"]),
    ("local", EVENTO["local"]),
    ("cidade", EVENTO["cidade"]),
    ("duracao", EVENTO["duracao"]),
]

# ------------------------------------------------------ textos de fábrica

ASSUNTO_CONFIRMACAO = "Inscrição confirmada — palestra dia 11/09, às {{hora}}"

CORPO_CONFIRMACAO = """{{primeiro_nome}}, sua inscrição está confirmada.

Quando: {{data}}, às {{hora}}
Onde: {{local}} — {{cidade}}
Duração: {{duracao}}

Chegue às {{chegada}} para retirar o kit impresso na entrada: a árvore de decisão, a planilha de simulação e o acesso à ferramenta de diagnóstico.

Em anexo vai o convite para adicionar à sua agenda.

Qualquer dúvida, é só responder este e-mail ou chamar no WhatsApp."""

ASSUNTO_LEMBRETE = "É hoje: palestra às {{hora}} na ACIA"

CORPO_LEMBRETE = """{{primeiro_nome}}, é hoje!

A palestra começa às {{hora}}, no {{local}}, em {{cidade}}.

Chegue às {{chegada}} para pegar o kit impresso na entrada.
Não precisa levar nada além de caneta — o material é nosso.

Até logo mais!"""

PADRAO = {
    "smtp_host": "smtp.resend.com",
    "smtp_porta": "465",
    "smtp_usuario": "resend",
    "smtp_senha": "",
    "email_de": "",
    "nome_de": "Exatta Contabilidade Digital",
    "responder_para": "",
    "enviar_confirmacao": "1",
    "assunto_confirmacao": ASSUNTO_CONFIRMACAO,
    "corpo_confirmacao": CORPO_CONFIRMACAO,
    "assunto_lembrete": ASSUNTO_LEMBRETE,
    "corpo_lembrete": CORPO_LEMBRETE,
}

CHAVES_SECRETAS = {"smtp_senha"}


# ---------------------------------------------------------- substituição

def valores(inscricao=None):
    """Mapa de variáveis para {{...}}. Sem inscrição, usa exemplos."""
    i = inscricao or {
        "nome": "Maria Souza", "email": "maria@exemplo.com.br",
        "whatsapp": "(99) 99999-9999", "empresa": "Empresa Exemplo",
        "regime": "Simples Nacional", "setor": "Comércio",
    }
    nome = i.get("nome") or ""
    return {
        "nome": nome,
        "primeiro_nome": nome.split(" ")[0] if nome else "Olá",
        "email": i.get("email") or "",
        "whatsapp": i.get("whatsapp") or "",
        "empresa": i.get("empresa") or "",
        "regime": i.get("regime") or "",
        "setor": i.get("setor") or "",
        "data": EVENTO["data"],
        "hora": EVENTO["hora"],
        "chegada": EVENTO["chegada"],
        "local": EVENTO["local"],
        "cidade": EVENTO["cidade"],
        "duracao": EVENTO["duracao"],
    }


def aplicar(texto, vals):
    """Troca {{variavel}} pelo valor. Variável desconhecida vira vazio."""
    def troca(m):
        return str(vals.get(m.group(1).strip(), ""))
    return re.sub(r"\{\{\s*([a-z_]+)\s*\}\}", troca, texto or "")


# --------------------------------------------------------------- formato

def _escapar(t):
    return (t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"))


def _paragrafos(texto):
    """Texto puro vira HTML: linha em branco separa parágrafo."""
    blocos = [b.strip() for b in (texto or "").split("\n\n") if b.strip()]
    return "".join(
        "<p style='margin:0 0 16px'>" + _escapar(b).replace("\n", "<br>") + "</p>"
        for b in blocos
    )


def _html(titulo, corpo_texto, cfg):
    """Layout da marca. O usuário escreve texto puro; o enfeite é nosso."""
    whats = "5599991660824"
    return f"""<!DOCTYPE html>
<html lang="pt-BR"><body style="margin:0;padding:0;background:#F7F7FB">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"
       style="background:#F7F7FB;padding:24px 12px">
  <tr><td align="center">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
           style="max-width:560px;background:#FFFFFF;border-radius:14px;overflow:hidden">
      <tr><td style="background:#170F49;padding:24px 28px">
        <p style="margin:0;font:700 20px/1.3 Arial,sans-serif;color:#FFFFFF">
          {_escapar(titulo)}</p>
      </td></tr>
      <tr><td style="padding:28px;font:400 16px/1.6 Arial,sans-serif;color:#3D3D48">
        {_paragrafos(corpo_texto)}
      </td></tr>
      <tr><td style="padding:0 28px 28px">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%"
               style="background:#F7F7FB;border-radius:10px">
          <tr><td style="padding:16px 20px;font:400 15px/1.6 Arial,sans-serif;color:#3D3D48">
            <strong style="color:#17171C">{EVENTO['data']}, às {EVENTO['hora']}</strong><br>
            {EVENTO['local']}<br>{EVENTO['cidade']}
          </td></tr>
        </table>
      </td></tr>
      <tr><td style="padding:0 28px 28px;font:400 14px/1.6 Arial,sans-serif;color:#6E6E80">
        Dúvidas? Chame no
        <a href="https://wa.me/{whats}" style="color:#BF0202">WhatsApp (99) 99166-0824</a>.<br>
        {_escapar(cfg.get('nome_de') or 'Exatta Contabilidade Digital')}
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>"""


def _ics():
    return "\r\n".join([
        "BEGIN:VCALENDAR", "VERSION:2.0",
        "PRODID:-//Exatta Contabilidade Digital//Palestra//PT",
        "CALSCALE:GREGORIAN", "METHOD:PUBLISH", "BEGIN:VEVENT",
        "UID:palestra-setembro-2027@exatta",
        f"DTSTART:{ICS_INICIO}", f"DTEND:{ICS_FIM}",
        "SUMMARY:Palestra — Setembro decide 2027",
        f"LOCATION:{EVENTO['local']}, {EVENTO['cidade']}",
        "DESCRIPTION:Chegue às 19:15 para retirar o kit impresso na entrada.",
        "END:VEVENT", "END:VCALENDAR",
    ])


# ----------------------------------------------------------------- envio

def configurado(cfg):
    return bool((cfg.get("smtp_senha") or "").strip() and (cfg.get("email_de") or "").strip())


def montar(cfg, tipo, inscricao=None):
    """Devolve (assunto, texto, html) já com as variáveis trocadas."""
    vals = valores(inscricao)
    assunto = aplicar(cfg.get(f"assunto_{tipo}") or PADRAO[f"assunto_{tipo}"], vals)
    texto = aplicar(cfg.get(f"corpo_{tipo}") or PADRAO[f"corpo_{tipo}"], vals)
    return assunto, texto, _html(assunto, texto, cfg)


def enviar(cfg, destino, assunto, texto, html, anexar_agenda=False):
    """(ok, mensagem). Nunca levanta exceção."""
    if not configurado(cfg):
        return False, "SMTP não configurado: falta a senha ou o remetente."

    try:
        de = cfg["email_de"].strip()
        msg = EmailMessage()
        msg["Subject"] = assunto
        msg["From"] = formataddr((cfg.get("nome_de") or "", de))
        msg["To"] = destino
        msg["Message-ID"] = make_msgid(domain=de.split("@")[-1])
        if (cfg.get("responder_para") or "").strip():
            msg["Reply-To"] = cfg["responder_para"].strip()
        msg.set_content(texto)
        msg.add_alternative(html, subtype="html")

        if anexar_agenda:
            msg.add_attachment(
                _ics().encode("utf-8"), maintype="text", subtype="calendar",
                filename="palestra-11-09.ics",
            )

        host = cfg.get("smtp_host") or PADRAO["smtp_host"]
        porta = int(cfg.get("smtp_porta") or PADRAO["smtp_porta"])
        usuario = cfg.get("smtp_usuario") or PADRAO["smtp_usuario"]
        senha = cfg["smtp_senha"]

        contexto = ssl.create_default_context()
        if porta == 465:
            with smtplib.SMTP_SSL(host, porta, context=contexto, timeout=15) as s:
                s.login(usuario, senha)
                s.send_message(msg)
        else:
            with smtplib.SMTP(host, porta, timeout=15) as s:
                s.starttls(context=contexto)
                s.login(usuario, senha)
                s.send_message(msg)

        log.info("E-mail enviado para %s", destino)
        return True, "enviado"

    except smtplib.SMTPAuthenticationError:
        return False, "Login recusado pelo servidor SMTP. Confira usuário e senha."
    except smtplib.SMTPRecipientsRefused:
        return False, f"O servidor recusou o destinatário {destino}."
    except smtplib.SMTPSenderRefused as erro:
        return False, f"Remetente recusado: {erro}. O domínio está verificado no Resend?"
    except Exception as erro:
        log.error("Falha ao enviar para %s: %s", destino, erro)
        return False, f"Falha no envio: {erro}"
