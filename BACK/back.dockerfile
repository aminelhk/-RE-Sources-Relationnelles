# Stage 1: Build the application
FROM node:20-alpine AS build

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copy code
COPY . .

# Install dependencies
RUN yarn install

# Exposer le port que votre application utilise
EXPOSE 3000

# Démarrer l'application
CMD ["yarn", "start"]