FROM python:3.12-alpine

# sqlite: o cliente de linha de comando, para consultar o banco no VPS quando
# você quiser (docker compose exec api sqlite3 /data/inscricoes.db)
RUN apk add --no-cache sqlite

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py .

# Roda sem privilégio de root. O /data é montado pelo compose e precisa
# pertencer a este usuário para o SQLite conseguir escrever.
RUN adduser -D -u 1000 palestra && mkdir -p /data && chown palestra:palestra /data
USER palestra

EXPOSE 3000

# 2 workers dão conta de sobra do volume de uma palestra e mantêm o container
# leve. --threads permite atender o export do CSV sem segurar as inscrições.
CMD ["gunicorn", "--bind", "0.0.0.0:3000", "--workers", "2", "--threads", "4", \
     "--access-logfile", "-", "--error-logfile", "-", "app:app"]
