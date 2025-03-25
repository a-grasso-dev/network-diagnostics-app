FROM python:3.11-slim

WORKDIR /app

COPY app.py .

# Installer Flask + outils réseau
RUN apt-get update && apt-get install -y \
    iputils-ping \
    dnsutils \
    traceroute \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN pip install flask flask-cors redis

EXPOSE 5000

CMD ["python", "app.py"]
