# Étape 1 : construire l'application
FROM node:20-alpine AS build

# Copier le reste des fichiers de l'application
COPY . .

# Installer les dépendances
RUN yarn install

# Installer Expo CLI globalement
RUN yarn global add expo-cli

# Construire l'application
RUN yarn expo export -p web

# Étape 2 : servir l'application
FROM nginx:alpine

# Déclaration de la variable d'env VERSION
ENV VERSION 'dev'

# Copier les fichiers de l'application construits dans le répertoire par défaut de Nginx
COPY --from=build /dist /usr/share/nginx/html

# Créer une nouvelle configuration Nginx qui écoute sur le port 8080
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Exposer le port 80
EXPOSE 80

# Copier le script d'entrée
COPY entrypoint.sh /usr/local/bin/entrypoint.sh

# Ajouter les permissions d'exécution
RUN chmod +x /usr/local/bin/entrypoint.sh

# Définir le point d'entrée pour utiliser /bin/sh ou /bin/bash
ENTRYPOINT ["/bin/sh", "-c"]

# Démarrer Nginx
CMD ["/usr/local/bin/entrypoint.sh"]