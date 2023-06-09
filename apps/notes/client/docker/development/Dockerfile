FROM node:16.19-alpine as builder

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

FROM node:16.19-alpine as runner

RUN set -e; \
    apk update && apk add --no-cache --update \
    tini \
    openssl \
    zlib \
    libgcc \
    && apk del --purge apk-tools \
    && rm -rf /var/cache/apk/*

ENV PORT 4200
ENV HOST 0.0.0.0
ENV HOSTNAME localhost
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.base.json ./
COPY tailwind.config.ts ./
COPY apps/notes/prisma ./apps/notes/prisma
COPY --from=builder /app/node_modules ./node_modules

EXPOSE $PORT

RUN yarn nx generation prisma --skip-nx-cache

ENTRYPOINT ["/sbin/tini", "--"]
