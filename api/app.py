"""
API de inscrições da palestra — grava num banco SQLite.

Roda atrás do Caddy: nada aqui fica exposto direto na internet. O Caddy
encaminha tudo que chega em /api/ para este serviço.

Rotas:
    POST /inscricoes          grava uma inscrição
    GET  /inscricoes.csv      exporta tudo em CSV (exige token)
    GET  /health              usado pelo healthcheck do Docker
"""

import csv
import io
import os
import re
import secrets
import sqlite3
import threading
import unicodedata
from datetime import datetime, timedelta, timezone

from flask import Flask, Response, g, jsonify, request

import emails

BANCO = os.environ.get("BANCO", "/data/inscricoes.db")
TOKEN_ADMIN = os.environ.get("TOKEN_ADMIN", "").strip()

# Fuso de Açailândia (sem horário de verão desde 2019).
FUSO = timezone(timedelta(hours=-3))

# Duas inscrições iguais dentro desta janela contam como uma só. Cobre o
# duplo-clique no botão e o "será que enviou?" de quem recarrega a página.
JANELA_DUPLICADA = timedelta(minutes=10)

REGIMES = {"simples", "presumido", "real", "mei", "nao-sei"}
SETORES = {"comercio", "servicos", "industria", "agro", "transporte", "outro"}

app = Flask(__name__)


# --------------------------------------------------------------- banco

ESQUEMA = """
CREATE TABLE IF NOT EXISTS inscricoes (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    criado_em         TEXT    NOT NULL,
    nome              TEXT    NOT NULL,
    whatsapp          TEXT    NOT NULL,
    whatsapp_digitos  TEXT    NOT NULL,
    email             TEXT    NOT NULL,
    empresa           TEXT,
    regime            TEXT,
    setor             TEXT,
    quer_kit          INTEGER NOT NULL DEFAULT 0,
    origem            TEXT,
    user_agent        TEXT,
    ip                TEXT
);
CREATE INDEX IF NOT EXISTS idx_inscricoes_email    ON inscricoes (email);
CREATE INDEX IF NOT EXISTS idx_inscricoes_whatsapp ON inscricoes (whatsapp_digitos);
CREATE INDEX IF NOT EXISTS idx_inscricoes_criado   ON inscricoes (criado_em);

CREATE TABLE IF NOT EXISTS config (
    chave         TEXT PRIMARY KEY,
    valor         TEXT NOT NULL,
    atualizado_em TEXT
);
"""

# Colunas acrescentadas depois da primeira versão. Entram sem apagar nada:
# um banco que já tem inscrições continua valendo.
COLUNAS_NOVAS = {
    "confirmacao_enviada_em": "TEXT",
    "lembrete_enviado_em": "TEXT",
}


def conectar():
    if "db" not in g:
        g.db = sqlite3.connect(BANCO, timeout=10)
        g.db.row_factory = sqlite3.Row
        g.db.execute("PRAGMA busy_timeout = 5000")
    return g.db


@app.teardown_appcontext
def fechar(_erro):
    db = g.pop("db", None)
    if db is not None:
        db.close()


def preparar_banco():
    os.makedirs(os.path.dirname(BANCO), exist_ok=True)
    db = sqlite3.connect(BANCO, timeout=10)
    try:
        # WAL: leitura (o export em CSV) não trava a escrita de quem se inscreve.
        db.execute("PRAGMA journal_mode = WAL")
        db.executescript(ESQUEMA)

        existentes = {c[1] for c in db.execute("PRAGMA table_info(inscricoes)")}
        for coluna, tipo in COLUNAS_NOVAS.items():
            if coluna not in existentes:
                db.execute(f"ALTER TABLE inscricoes ADD COLUMN {coluna} {tipo}")

        db.commit()
    finally:
        db.close()


# ------------------------------------------------------------ configuração

def ler_config(db=None):
    """Configuração completa: o que está salvo, com os padrões preenchendo."""
    db = db or conectar()
    cfg = dict(emails.PADRAO)
    for linha in db.execute("SELECT chave, valor FROM config"):
        if linha["chave"] in cfg:
            cfg[linha["chave"]] = linha["valor"]
    return cfg


def gravar_config(db, mudancas):
    agora = datetime.now(FUSO).isoformat()
    for chave, valor in mudancas.items():
        if chave not in emails.PADRAO:
            continue
        db.execute(
            """INSERT INTO config (chave, valor, atualizado_em) VALUES (?, ?, ?)
               ON CONFLICT(chave) DO UPDATE SET valor = excluded.valor,
                                                atualizado_em = excluded.atualizado_em""",
            (chave, str(valor), agora),
        )
    db.commit()


def config_publica(cfg):
    """O que a tela pode ver: a senha nunca sai daqui, só se existe."""
    visivel = {k: v for k, v in cfg.items() if k not in emails.CHAVES_SECRETAS}
    visivel["smtp_senha_definida"] = bool((cfg.get("smtp_senha") or "").strip())
    visivel["pronto_para_enviar"] = emails.configurado(cfg)
    return visivel


def enviar_em_segundo_plano(cfg, inscricao_id, inscricao):
    """O e-mail não pode segurar (nem derrubar) a resposta da inscrição."""
    def tarefa():
        assunto, texto, html = emails.montar(cfg, "confirmacao", inscricao)
        ok, _ = emails.enviar(cfg, inscricao["email"], assunto, texto, html,
                              anexar_agenda=True)
        if not ok:
            return
        try:
            db = sqlite3.connect(BANCO, timeout=10)
            db.execute("UPDATE inscricoes SET confirmacao_enviada_em = ? WHERE id = ?",
                       (datetime.now(FUSO).isoformat(), inscricao_id))
            db.commit()
            db.close()
        except Exception as erro:
            app.logger.error("Não consegui marcar a confirmação: %s", erro)

    threading.Thread(target=tarefa, daemon=True).start()


# ------------------------------------------------------------ validação

RE_EMAIL = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]{2,}$")


def limpar(valor, limite=200):
    """Texto sem caracteres de controle e com tamanho limitado."""
    texto = str(valor or "")
    texto = "".join(c for c in texto if unicodedata.category(c)[0] != "C")
    return texto.strip()[:limite]


def so_digitos(valor):
    return re.sub(r"\D", "", str(valor or ""))


def validar(dados):
    """Devolve (limpos, erros). Espelha a validação da página."""
    erros = {}

    nome = limpar(dados.get("nome"), 120)
    if not nome:
        erros["nome"] = "Informe seu nome."
    elif len(nome.split()) < 2:
        erros["nome"] = "Informe nome e sobrenome."

    whatsapp = limpar(dados.get("whatsapp") or dados.get("whats"), 40)
    digitos = so_digitos(whatsapp)
    if not digitos:
        erros["whatsapp"] = "Informe seu WhatsApp."
    elif not 10 <= len(digitos) <= 11:
        erros["whatsapp"] = "Informe o número com DDD."

    email = limpar(dados.get("email"), 160).lower()
    if not email:
        erros["email"] = "Informe seu e-mail."
    elif not RE_EMAIL.match(email):
        erros["email"] = "E-mail inválido."

    regime = limpar(dados.get("regime"), 20)
    setor = limpar(dados.get("setor"), 20)

    limpos = {
        "nome": nome,
        "whatsapp": whatsapp,
        "whatsapp_digitos": digitos,
        "email": email,
        "empresa": limpar(dados.get("empresa"), 160),
        "regime": regime if regime in REGIMES else "",
        "setor": setor if setor in SETORES else "",
        "quer_kit": 1 if str(dados.get("kit", "")).lower() in ("1", "true", "on", "sim") else 0,
        "origem": limpar(dados.get("origem"), 300),
    }
    return limpos, erros


def corpo_da_requisicao():
    if request.is_json:
        return request.get_json(silent=True) or {}
    return request.form.to_dict()


# --------------------------------------------------------------- rotas

@app.post("/inscricoes")
def criar_inscricao():
    dados = corpo_da_requisicao()

    # Campo isca: fica escondido na página, então só robô preenche.
    # Responde como se tivesse dado certo, para o robô não tentar de novo.
    if limpar(dados.get("website")):
        return jsonify({"ok": True}), 201

    limpos, erros = validar(dados)
    if erros:
        return jsonify({"ok": False, "erros": erros}), 422

    db = conectar()
    agora = datetime.now(FUSO)

    recente = db.execute(
        """SELECT id FROM inscricoes
           WHERE (email = ? OR whatsapp_digitos = ?) AND criado_em >= ?
           ORDER BY id DESC LIMIT 1""",
        (limpos["email"], limpos["whatsapp_digitos"],
         (agora - JANELA_DUPLICADA).isoformat()),
    ).fetchone()
    if recente:
        return jsonify({"ok": True, "id": recente["id"], "duplicada": True}), 200

    cursor = db.execute(
        """INSERT INTO inscricoes
           (criado_em, nome, whatsapp, whatsapp_digitos, email, empresa,
            regime, setor, quer_kit, origem, user_agent, ip)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
        (
            agora.isoformat(),
            limpos["nome"], limpos["whatsapp"], limpos["whatsapp_digitos"],
            limpos["email"], limpos["empresa"], limpos["regime"],
            limpos["setor"], limpos["quer_kit"], limpos["origem"],
            limpar(request.headers.get("User-Agent"), 300),
            limpar(request.headers.get("X-Forwarded-For", request.remote_addr), 60),
        ),
    )
    db.commit()
    inscricao_id = cursor.lastrowid

    cfg = ler_config(db)
    if cfg.get("enviar_confirmacao") == "1" and emails.configurado(cfg):
        enviar_em_segundo_plano(cfg, inscricao_id, {
            "nome": limpos["nome"], "email": limpos["email"],
            "whatsapp": limpos["whatsapp"], "empresa": limpos["empresa"],
            "regime": ROTULOS_REGIME.get(limpos["regime"], ""),
            "setor": ROTULOS_SETOR.get(limpos["setor"], ""),
        })

    return jsonify({"ok": True, "id": inscricao_id}), 201


ROTULOS_REGIME = {
    "simples": "Simples Nacional", "presumido": "Lucro Presumido",
    "real": "Lucro Real", "mei": "MEI", "nao-sei": "Não sei / vou abrir empresa",
}
ROTULOS_SETOR = {
    "comercio": "Comércio", "servicos": "Serviços", "industria": "Indústria",
    "agro": "Agronegócio", "transporte": "Transporte e logística", "outro": "Outro",
}


def token_confere():
    """
    O token vem por cabeçalho, nunca pela URL: query string entra no log do
    servidor e no histórico do navegador, e a senha viajaria junto.

    Aceita 'X-Token: senha' ou 'Authorization: Bearer senha'.

    A comparação é em tempo constante — comparação normal termina no primeiro
    caractere diferente, e esse tempo a mais entrega o token aos poucos.
    """
    if not TOKEN_ADMIN:
        return False

    enviado = request.headers.get("X-Token", "")
    if not enviado:
        autorizacao = request.headers.get("Authorization", "")
        if autorizacao.startswith("Bearer "):
            enviado = autorizacao[7:]

    return secrets.compare_digest(enviado, TOKEN_ADMIN)


def negar():
    if not TOKEN_ADMIN:
        return jsonify({"ok": False, "erro": "Área restrita desativada: defina TOKEN_ADMIN."}), 403
    if request.args.get("token"):
        return jsonify({"ok": False, "erro":
                        "A senha agora vai no cabeçalho, não na URL. "
                        "Use: -H \"X-Token: sua-senha\""}), 403
    return jsonify({"ok": False, "erro": "Senha inválida."}), 403


def contar(linhas, campo, rotulos):
    """Distribuição por categoria, da mais frequente para a menos."""
    totais = {}
    for linha in linhas:
        codigo = linha[campo] or ""
        totais[codigo] = totais.get(codigo, 0) + 1
    itens = [
        {"codigo": c, "rotulo": rotulos.get(c, "Não informado"), "total": n}
        for c, n in totais.items()
    ]
    itens.sort(key=lambda i: (-i["total"], i["rotulo"]))
    return itens


@app.get("/inscricoes.json")
def listar_json():
    """Alimenta a página /admin.html."""
    if not token_confere():
        return negar()

    linhas = conectar().execute("SELECT * FROM inscricoes ORDER BY id DESC").fetchall()
    agora = datetime.now(FUSO)
    limite_24h = (agora - timedelta(hours=24)).isoformat()

    inscricoes = [{
        "id": l["id"],
        "criadoEm": l["criado_em"],
        "nome": l["nome"],
        "whatsapp": l["whatsapp"],
        "whatsappDigitos": l["whatsapp_digitos"],
        "email": l["email"],
        "empresa": l["empresa"] or "",
        "regime": ROTULOS_REGIME.get(l["regime"], ""),
        "setor": ROTULOS_SETOR.get(l["setor"], ""),
        "querKit": bool(l["quer_kit"]),
        "confirmacaoEnviada": bool(l["confirmacao_enviada_em"]),
        "lembreteEnviado": bool(l["lembrete_enviado_em"]),
    } for l in linhas]

    return jsonify({
        "ok": True,
        "resumo": {
            "total": len(linhas),
            "querKit": sum(1 for l in linhas if l["quer_kit"]),
            "simples": sum(1 for l in linhas if l["regime"] == "simples"),
            "ultimas24h": sum(1 for l in linhas if l["criado_em"] >= limite_24h),
            "lembretePendente": sum(1 for l in linhas if not l["lembrete_enviado_em"]),
        },
        "porRegime": contar(linhas, "regime", ROTULOS_REGIME),
        "porSetor": contar(linhas, "setor", ROTULOS_SETOR),
        "inscricoes": inscricoes,
    })


@app.delete("/inscricoes/<int:inscricao_id>")
def apagar_inscricao(inscricao_id):
    """Para tirar da lista um teste seu ou um cadastro claramente falso."""
    if not token_confere():
        return negar()

    db = conectar()
    cursor = db.execute("DELETE FROM inscricoes WHERE id = ?", (inscricao_id,))
    db.commit()
    if cursor.rowcount == 0:
        return jsonify({"ok": False, "erro": "Inscrição não encontrada."}), 404
    return jsonify({"ok": True})


@app.get("/config")
def obter_config():
    if not token_confere():
        return negar()
    return jsonify({
        "ok": True,
        "config": config_publica(ler_config()),
        "variaveis": [{"nome": n, "descricao": d} for n, d in emails.VARIAVEIS],
        "padroes": {k: emails.PADRAO[k] for k in
                    ("assunto_confirmacao", "corpo_confirmacao",
                     "assunto_lembrete", "corpo_lembrete")},
    })


@app.post("/config")
def salvar_config():
    if not token_confere():
        return negar()

    dados = corpo_da_requisicao()
    mudancas = {}
    for chave in emails.PADRAO:
        if chave not in dados:
            continue
        valor = dados[chave]
        # Senha em branco significa "mantenha a que já está", não "apague".
        if chave in emails.CHAVES_SECRETAS and not str(valor).strip():
            continue
        mudancas[chave] = valor

    if "smtp_porta" in mudancas:
        try:
            int(mudancas["smtp_porta"])
        except (TypeError, ValueError):
            return jsonify({"ok": False, "erro": "Porta inválida."}), 422

    gravar_config(conectar(), mudancas)
    return jsonify({"ok": True, "config": config_publica(ler_config())})


@app.post("/email/teste")
def testar_email():
    """Manda um e-mail de teste com a configuração salva."""
    if not token_confere():
        return negar()

    dados = corpo_da_requisicao()
    destino = limpar(dados.get("destino"), 160)
    if not RE_EMAIL.match(destino):
        return jsonify({"ok": False, "erro": "Informe um e-mail válido para o teste."}), 422

    tipo = dados.get("tipo") if dados.get("tipo") in ("confirmacao", "lembrete") else "confirmacao"
    cfg = ler_config()
    assunto, texto, html = emails.montar(cfg, tipo)
    ok, mensagem = emails.enviar(cfg, destino, assunto, texto, html,
                                 anexar_agenda=(tipo == "confirmacao"))
    return jsonify({"ok": ok, "mensagem": mensagem}), (200 if ok else 502)


@app.post("/lembretes")
def enviar_lembretes():
    """Dispara o lembrete para quem ainda não recebeu."""
    if not token_confere():
        return negar()

    cfg = ler_config()
    if not emails.configurado(cfg):
        return jsonify({"ok": False, "erro": "Configure o SMTP antes de enviar."}), 422

    db = conectar()
    pendentes = db.execute(
        "SELECT * FROM inscricoes WHERE lembrete_enviado_em IS NULL ORDER BY id"
    ).fetchall()

    enviados, falhas, ultimo_erro = 0, 0, ""
    for linha in pendentes:
        assunto, texto, html = emails.montar(cfg, "lembrete", {
            "nome": linha["nome"], "email": linha["email"],
            "whatsapp": linha["whatsapp"], "empresa": linha["empresa"],
            "regime": ROTULOS_REGIME.get(linha["regime"], ""),
            "setor": ROTULOS_SETOR.get(linha["setor"], ""),
        })
        ok, mensagem = emails.enviar(cfg, linha["email"], assunto, texto, html)
        if ok:
            db.execute("UPDATE inscricoes SET lembrete_enviado_em = ? WHERE id = ?",
                       (datetime.now(FUSO).isoformat(), linha["id"]))
            db.commit()
            enviados += 1
        else:
            falhas += 1
            ultimo_erro = mensagem

    return jsonify({"ok": True, "enviados": enviados, "falhas": falhas,
                    "pendentes": len(pendentes), "erro": ultimo_erro})


@app.get("/inscricoes.csv")
def exportar_csv():
    if not token_confere():
        return negar()

    linhas = conectar().execute(
        "SELECT * FROM inscricoes ORDER BY id"
    ).fetchall()

    buffer = io.StringIO()
    # Ponto e vírgula é o separador que o Excel em português abre com dois cliques.
    escritor = csv.writer(buffer, delimiter=";", quoting=csv.QUOTE_MINIMAL)
    escritor.writerow(["#", "Data/hora", "Nome", "WhatsApp", "E-mail", "Empresa",
                       "Regime", "Setor", "Quer o kit"])
    for linha in linhas:
        try:
            momento = datetime.fromisoformat(linha["criado_em"]).strftime("%d/%m/%Y %H:%M")
        except ValueError:
            momento = linha["criado_em"]
        escritor.writerow([
            linha["id"], momento, linha["nome"], linha["whatsapp"], linha["email"],
            linha["empresa"] or "",
            ROTULOS_REGIME.get(linha["regime"], ""),
            ROTULOS_SETOR.get(linha["setor"], ""),
            "Sim" if linha["quer_kit"] else "Não",
        ])

    # BOM no começo: sem ele o Excel come os acentos.
    conteudo = "﻿" + buffer.getvalue()
    return Response(
        conteudo,
        mimetype="text/csv; charset=utf-8",
        headers={"Content-Disposition":
                 'attachment; filename="inscricoes-palestra.csv"'},
    )


@app.get("/health")
def health():
    total = conectar().execute("SELECT COUNT(*) AS n FROM inscricoes").fetchone()["n"]
    return jsonify({"ok": True, "inscricoes": total})


preparar_banco()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000)
