# build stage
FROM node:18-alpine as build
WORKDIR /app

# install pnpm
RUN npm i -g pnpm@8.6.0

COPY pnpm-lock.yaml ./
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
