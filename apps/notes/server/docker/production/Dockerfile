FROM node:16.19-alpine as installer

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production && yarn add -D nx nx-cloud

FROM node:16.19-alpine as builder

WORKDIR /app

ENV APP server
ENV APP_DIR apps/notes/$APP
ENV DATABASE_URL postgresql://postgres:postgres@db:5432/postgres?connect_timeout=10

COPY package.json ./
COPY yarn.lock ./
COPY $APP_DIR ./$APP_DIR
COPY apps/notes/db ./apps/notes/db
COPY apps/notes/prisma ./apps/notes/prisma
COPY libs/ ./libs
COPY tsconfig.base.json ./
COPY nx.json ./
COPY .git ./.git
COPY --from=installer /app/node_modules ./node_modules

RUN yarn nx build server --configuration=production --skip-nx-cache
RUN yarn nx generation prisma --skip-nx-cache

FROM node:16.19-alpine

ENV HOST=0.0.0.0
ENV PORT=3000
ENV APP server
ENV APP_DIR apps/notes/$APP

WORKDIR /app

RUN set -e; \
    apk update && apk add --no-cache --update \
    tini \
    openssl \
    zlib \
    libgcc \
    && apk del --purge apk-tools \
    && rm -rf /var/cache/apk/*

RUN addgroup --system $APP && \
    adduser --system -G $APP $APP

COPY --from=builder --chown=$APP:$APP /app/dist/$APP_DIR $APP
COPY --from=builder --chown=$APP:$APP /app/$APP_DIR/.env.skeleton ./
COPY --from=builder --chown=$APP:$APP /app/node_modules/@prisma ./node_modules/@prisma/

RUN npm --prefix $APP --omit=dev -f install

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["node", "server"]
