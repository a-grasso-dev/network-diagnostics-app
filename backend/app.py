from flask import Flask, request, jsonify
import subprocess
import redis
import json
from flask_cors import CORS

# Connexion Redis
r = redis.Redis(host='redis', port=6379, decode_responses=True)

app = Flask(__name__)
CORS(app)  # Autoriser les requêtes du frontend

@app.route("/diagnostic", methods=["GET"])
def diagnostic():
    host = request.args.get("host")
    if not host:
        return jsonify({"error": "Veuillez fournir un nom d'hôte ou une IP."}), 400

    def run_command(command, timeout=10):
        try:
            result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True, timeout=timeout)
            return result.stdout.decode("utf-8") + result.stderr.decode("utf-8")
        except subprocess.TimeoutExpired:
            return "Commande expirée"

    # Exécuter les commandes réseau
    ping_result = run_command(f"ping -c 4 {host}")
    nslookup_result = run_command(f"nslookup {host}")
    traceroute_result = run_command(f"traceroute {host}", timeout=40)

    # Stocker dans Redis
    entry = {
        "host": host,
        "ping": ping_result,
        "nslookup": nslookup_result,
        "traceroute": traceroute_result
    }
    r.lpush("diagnostics", json.dumps(entry))

    # Renvoyer les résultats au frontend
    return jsonify(entry)

@app.route("/history", methods=["GET"])
def history():
    history_list = r.lrange("diagnostics", 0, 9)  # Les 10 derniers
    return jsonify([json.loads(item) for item in history_list])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
