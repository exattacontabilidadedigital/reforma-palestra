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
import sqlite3
import unicodedata
from datetime import datetime, timedelta, timezone

from flask import Flask, Response, g, jsonify, request

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
"""


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
        db.commit()
    finally:
        db.close()


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
    return jsonify({"ok": True, "id": cursor.lastrowid}), 201


ROTULOS_REGIME = {
    "simples": "Simples Nacional", "presumido": "Lucro Presumido",
    "real": "Lucro Real", "mei": "MEI", "nao-sei": "Não sei / vou abrir empresa",
}
ROTULOS_SETOR = {
    "comercio": "Comércio", "servicos": "Serviços", "industria": "Indústria",
    "agro": "Agronegócio", "transporte": "Transporte e logística", "outro": "Outro",
}


@app.get("/inscricoes.csv")
def exportar_csv():
    if not TOKEN_ADMIN:
        return jsonify({"ok": False, "erro": "Exportação desativada: defina TOKEN_ADMIN."}), 403
    if request.args.get("token", "") != TOKEN_ADMIN:
        return jsonify({"ok": False, "erro": "Token inválido."}), 403

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
