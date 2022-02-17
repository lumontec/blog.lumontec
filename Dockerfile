# builder
FROM node:12.2.0-alpine as builder
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/package.json
RUN yarn install
COPY . /usr/src/app
RUN yarn run build
CMD ["yarn", "start"]
