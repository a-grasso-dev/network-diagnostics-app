FROM python:3.11-slim AS builder

WORKDIR /app
COPY app.py .

# Install Flask et Redis dans un répertoire isolé
RUN pip install --prefix=/install flask flask-cors redis

# Install des commandes système réseau
RUN apt-get update && apt-get install -y \
  iputils-ping \
  dnsutils \
  traceroute \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

# ========================

FROM python:3.11-slim

WORKDIR /app

COPY --from=builder /app /app
COPY --from=builder /install /usr/local

# Copie des commandes système
COPY --from=builder /bin/ping /bin/ping
COPY --from=builder /usr/bin/nslookup /usr/bin/nslookup
COPY --from=builder /usr/bin/traceroute /usr/bin/traceroute
COPY --from=builder /lib /lib
COPY --from=builder /lib64 /lib64
COPY --from=builder /usr/lib /usr/lib

RUN useradd -m flaskuser
USER flaskuser

CMD ["python", "app.py"]
