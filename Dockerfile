FROM node:16.13.1-alpine3.14
WORKDIR /usr/app
COPY package*.json .
RUN npm i
COPY . .
CMD ["npm", "start"]
