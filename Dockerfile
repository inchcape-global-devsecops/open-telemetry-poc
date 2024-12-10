FROM node:current-alpine3.20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . . 

EXPOSE 8081


CMD ["node", "--require", "./instrumentation.js", "app.js"]