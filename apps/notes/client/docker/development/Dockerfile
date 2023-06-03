FROM node:16.19-alpine as builder

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

FROM node:16.19-alpine as runner

RUN set -e; \
    apk update && apk add --no-cache --update \
    tini \
    && apk del --purge apk-tools \
    && rm -rf /var/cache/apk/*

ENV APP web
ENV APP_DIR apps/$APP
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
COPY --from=builder /app/node_modules ./node_modules

EXPOSE $PORT

ENTRYPOINT ["/sbin/tini", "--"]
