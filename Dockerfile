FROM node:10.16-alpine as client

WORKDIR /usr/app/client/

COPY client/package*.json ./

RUN yarn install

COPY client/ ./

RUN yarn build

FROM node:10.16-alpine

WORKDIR /usr/src/app/
COPY --from=client /usr/app/client/build/ ./client/build/

WORKDIR /usr/src/app/server/
COPY server/package*.json ./
RUN yarn install
COPY server/ ./

ENV PORT 5000

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

EXPOSE 5000

CMD ["yarn", "start"]
