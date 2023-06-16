FROM node:16.19-alpine as installer

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production && yarn add -D nx nx-cloud

FROM node:16.19-alpine as builder

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED 1

COPY package.json ./
COPY yarn.lock ./
COPY apps/notes ./apps/notes
COPY libs ./libs
COPY tailwind.config.ts ./
COPY tsconfig.base.json ./
COPY nx.json ./
COPY .git ./
COPY --from=installer /app/node_modules ./node_modules

RUN yarn nx build client --configuration=production --skip-nx-cache
RUN yarn nx generation prisma --skip-nx-cache

FROM node:16.19-alpine

RUN set -e; \
    apk update && apk add --no-cache --update \
    tini \
    openssl \
    zlib \
    libgcc \
    && apk del --purge apk-tools \
    && rm -rf /var/cache/apk/*

RUN addgroup -g 2000 nodejs \
    && adduser -D -G nodejs -u 2000 nextjs

ENV APP_HOME /app
ENV APP client
ENV APP_DIR apps/notes/$APP
ENV PORT 4200
ENV HOST 0.0.0.0
ENV HOSTNAME localhost
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR $APP_HOME

USER nextjs

COPY --from=builder --chown=nextjs:nodejs /app/dist/$APP_DIR/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/dist/$APP_DIR/public ./$APP_DIR/public
COPY --from=builder --chown=nextjs:nodejs /app/dist/$APP_DIR/.next/static ./dist/$APP_DIR/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma/

EXPOSE $PORT

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["node", "/app/apps/notes/client/server.js"]
