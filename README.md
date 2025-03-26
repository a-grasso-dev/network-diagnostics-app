# Network diagnostics - Application  d'analyse réseau

Cette application permet de diagnostiquer une adresse IP ou un nom de domaine (ping, nslookup, traceroute) via une interface web responsive.

## Fonctionnalités

- Ping, traceroute, et nslookup d'une adresse réseau
- Interface web stylée avec TailwindCSS
- Historique des tests stocké dans Redis
- Architecture multi-conteneurs (frontend + backend + redis + logger)
- Seul le frontend est exposé (port 8080)
- Images légères (~300 Mo max)
- Mise en cache gzip côté nginx

## Architecture des conteneurs

```
[Client navigateur]
       ↓
[Frontend nginx:8080] → [Backend Flask:5000] → [Redis:6379]
                                 ↓
                        [Logging-service]
```
## Prérequis
- Avoir une connexion internet
- Installer Docker et Docker Compose
```sh
sudo apt update && sudo apt install -y git docker docker-compose
```

## Lancement du projet

### Cloner le Projet
```sh
git clone https://github.com/a-grasso-dev/network-diagnostics-app.git \

cd network-diagnostics-app
```
### Lancer l’Application

```bash
docker compose up --build
```
### Accéder à l’Application depuis l'interface
 
http://localhost:8080

## Comment tester

1. Saisir un nom de domaine (ex: `google.com`)
2. Cliquer sur **"Tester"**
3. Résultats affichés : `ping`, `nslookup`, `traceroute`
4. Cliquer sur **"Voir l'historique"** pour revoir les tests précédents

## Limitations connues

- Les résultats `traceroute` peuvent afficher `* * *` à cause de l'isolation réseau Docker ou des pare-feux intermédiaires (comportement attendu).
- L'application est pensée pour un usage local, sans sécurité HTTPS.

## Composition du projet

- `frontend/` : HTML, CSS (Tailwind via CDN), JS séparé, nginx avec reverse proxy
- `backend/` : Flask + Redis, diagnostic réseau, historique
- `logging-service/` : microservice qui lit les logs depuis Redis
- `docker-compose.yml` : coordination des services
- `README.md` : ce fichier

## Auteur
**Andrea GRASSO** - [GitHub](https://github.com/a-grasso-dev)\
_LP DEVOPS - IUT Lyon 1_\
_2024 / 2025_