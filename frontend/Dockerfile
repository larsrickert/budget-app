# build stage
FROM node:18-alpine as build
WORKDIR /app

COPY pnpm-lock.yaml package.json ./

# install pnpm as defined in package.json
RUN npm i -g $(node -p "require('./package.json').packageManager")

RUN pnpm fetch --ignore-scripts

COPY . ./
RUN pnpm install --offline

ARG API_HOST=http://localhost:8090
ENV VITE_API_HOST $API_HOST

RUN pnpm build

# production stage
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
