FROM node:16.13.1-alpine3.14
WORKDIR /usr/app
COPY package*.json .
RUN npm i
COPY . .
RUN npm run build
CMD npm run start:prod
