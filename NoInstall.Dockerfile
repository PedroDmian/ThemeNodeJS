FROM node:12-alpine

ARG NODE_ENV=development
ARG PORT=3000

RUN mkdir -p /app
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# COPY dist dist
# COPY node_modules .
# COPY package.json package.json
# COPY package-lock.json package-lock.json


# Packages
RUN apk add --no-cache \
  curl

EXPOSE $PORT

CMD npm run start