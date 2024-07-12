# Stage 1: Build the application
FROM node:20-alpine AS build

# Copy the rest of the code
COPY . .

# Install dependencies
RUN yarn install

# Expose the application port
EXPOSE 80

CMD [ "yarn","start"]