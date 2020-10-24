FROM node:12-alpine

RUN mkdir -p /app

WORKDIR /app

RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++

RUN yarn global add pm2 pino-pretty

RUN pm2 install pm2-logrotate

ADD ./package.json /app/

ADD ./yarn.lock    /app/

RUN yarn install --production --frozen-lockfile

RUN apk del build-dependencies

ADD ./src /app/src/

CMD node ./src/index.js
