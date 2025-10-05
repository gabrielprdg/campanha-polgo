FROM node:22
WORKDIR /usr/src/campanha-polgo

COPY ./package.json .

RUN npm install

COPY . .

# Copy DocumentDB certificate
COPY global-bundle.pem /usr/src/campanha-polgo/global-bundle.pem

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]