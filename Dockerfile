FROM alpine:latest

RUN apk update --no-cache
RUN apk add --update nodejs npm git vim make g++
RUN apk add  --no-cache ffmpeg
RUN apk add --no-cache python3

RUN npm i --save discord.js node-opus
RUN npm i @discordjs/opus
RUN npm i dotenv


WORKDIR /var/www/html
COPY package*.json ./

CMD ["node", "index"]