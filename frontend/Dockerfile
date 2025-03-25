FROM nginx:alpine

# Copie de l'index.html dans le dossier par défaut nginx
COPY index.html /usr/share/nginx/html/

# Copie de la config nginx personnalisée
COPY default.conf /etc/nginx/conf.d/default.conf
