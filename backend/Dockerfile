FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build && npm prune --omit=dev

RUN chown -R node:node /app

EXPOSE 3000

USER node

CMD ["npm", "start"]