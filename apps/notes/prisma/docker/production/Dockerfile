FROM node:16.19-alpine as installer

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production && yarn add -D nx nx-cloud

FROM node:16.19-alpine as builder

RUN set -e; \
    apk update && apk add --no-cache --update \
    bash \
    wget \
    openssl \
    zlib \
    libgcc \
    git \
    && apk del --purge apk-tools \
    && rm -rf /var/cache/apk/*

WORKDIR /app

ENV APP prisma
ENV APP_DIR apps/notes/$APP
ENV DATABASE_URL postgresql://postgres:postgres@db:5432/postgres?connect_timeout=10
ENV PRISMA_SKIP_POSTINSTALL_GENERATE 1

COPY package.json ./
COPY yarn.lock ./
COPY $APP_DIR ./$APP_DIR
COPY libs/ ./libs
COPY tsconfig.base.json ./
COPY nx.json ./
COPY .git ./.git
COPY --from=installer /app/node_modules ./node_modules
RUN yarn nx generation prisma --skip-nx-cache

FROM node:16.19-alpine

RUN set -e; \
    apk update && apk add --no-cache --update \
    bash \
    wget \
    openssl \
    zlib \
    libgcc \
    git \
    && apk del --purge apk-tools \
    && rm -rf /var/cache/apk/*

WORKDIR /app

ENV APP prisma
ENV APP_DIR apps/notes/$APP
ENV DATABASE_URL postgresql://postgres:postgres@db:5432/postgres?connect_timeout=10
ENV PRISMA_SKIP_POSTINSTALL_GENERATE 1

COPY $APP_DIR ./$APP_DIR
COPY package.json ./
COPY yarn.lock ./
COPY libs/ ./libs
COPY tsconfig.base.json ./
COPY nx.json ./
COPY .git ./.git
COPY --from=builder /app/node_modules ./node_modules

RUN wget https://github.com/vishnubob/wait-for-it/raw/master/wait-for-it.sh --no-check-certificate && \
    chmod +x wait-for-it.sh

ENTRYPOINT [ "/bin/bash", "-c" ]
CMD ["/app/wait-for-it.sh db:5432 --strict --timeout=300 -- yarn nx seed prisma --skip-nx-cache"]
