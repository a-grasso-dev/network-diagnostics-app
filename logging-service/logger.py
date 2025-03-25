import redis
import json
import time

try:
    r = redis.Redis(host='redis', port=6379, decode_responses=True)

    print("🔍 Logging-service démarré. Historique toutes les 15 secondes...\n")

    while True:
        print("🕒 Derniers diagnostics :")
        history = r.lrange("diagnostics", 0, 4)
        for i, item in enumerate(history, 1):
            entry = json.loads(item)
            print(f"{i}. Host: {entry['host']}")
        print("-" * 50)
        time.sleep(15)

except Exception as e:
    print("❌ Erreur dans logging-service :", e)
