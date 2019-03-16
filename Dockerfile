FROM node:lts-slim

WORKDIR /prueba-valiu-front

COPY package*.json ./

RUN npm install

EXPOSE 8080
CMD [ "npm", "run", "serve" ]
