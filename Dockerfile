# build stage
FROM node:22-alpine AS build
WORKDIR /app

COPY pnpm-lock.yaml package.json ./

# install pnpm as defined in package.json
RUN npm i -g $(node -p "require('./package.json').packageManager")

COPY . ./
RUN pnpm install --frozen-lockfile

RUN pnpm build

# production stage
FROM node:22-alpine
WORKDIR /app

COPY --from=build /app/.output /app/.output
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
