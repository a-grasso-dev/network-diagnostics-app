FROM python:3.11-slim as builder

WORKDIR /app
COPY logger.py .
RUN pip install --prefix=/install redis

FROM python:3.11-slim

WORKDIR /app
COPY --from=builder /app /app
COPY --from=builder /install /usr/local

RUN useradd -m logger
USER logger

CMD ["python", "logger.py"]
