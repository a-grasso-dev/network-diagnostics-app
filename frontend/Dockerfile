FROM nginx:alpine

LABEL maintainer="andrea.grasso@etu.univ-lyon1.fr"
LABEL description="Frontend statique avec Nginx et reverse proxy vers Flask backend"

COPY index.html /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /tmp/nginx && chown -R nginx:nginx /tmp/nginx
