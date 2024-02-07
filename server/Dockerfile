FROM node:20

WORKDIR /app

COPY . .

RUN npm install

CMD npm run migrate && npm run start