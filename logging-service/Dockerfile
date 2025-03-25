FROM python:3.11-slim

WORKDIR /app

COPY logger.py .

RUN pip install redis

CMD ["python", "logger.py"]
