# this is how we would have built a dev distribution...
# FROM node:24-alpine

# WORKDIR /app

# COPY ./package*.json ./

# RUN npm install

# COPY ./ ./

# CMD ["npm", "run", "dev"]

# however, we want to build a production distribution
FROM node:24-alpine as builder

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY ./ ./

RUN npm run build:docker

# at this point, a virtual image named "builder" exists with all the layers above
# meaning, it has a /dist folder with the static files of my react app

# now, i want an nginx server that has the dist folder contents inside it
FROM caddy:2-alpine
COPY --from=builder /app/dist /usr/share/caddy
COPY Caddyfile /etc/caddy/Caddyfile
EXPOSE 80 443

