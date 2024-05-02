FROM node:20.9.0-alpine3.17

RUN apk --no-cache add curl
RUN apk add make g++ python3 git
RUN npm i -g node-pre-gyp

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY .env ./.env
COPY src ./src
COPY tsconfig.json ./tsconfig.json

CMD npm start