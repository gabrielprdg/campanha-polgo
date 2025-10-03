FROM node:22
WORKDIR /usr/src/campanha-polgo

COPY ./package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]