FROM node:18-alpine

WORKDIR /usr/src/nuxt-app

COPY package*.json ./
RUN npm ci

COPY . ./
RUN npm run build

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

EXPOSE 3000

ENTRYPOINT ["node", ".output/server/index.mjs"]
