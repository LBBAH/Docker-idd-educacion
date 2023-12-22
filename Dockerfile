FROM node:18.17.1-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install

COPY . /app
RUN npm run build --prod

FROM nginx:1.25.3-alpine3.18

COPY --from=build-step /app/dist/app-v2 /usr/share/nginx/html