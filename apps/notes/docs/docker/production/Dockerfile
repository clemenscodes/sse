FROM node:16.19-alpine as installer

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production && yarn add -D nx nx-cloud

FROM node:16.19-alpine as builder

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY apps/notes ./apps/notes
COPY libs ./libs
COPY tailwind.config.ts ./
COPY tsconfig.base.json ./
COPY nx.json ./
COPY --from=installer /app/node_modules ./node_modules

RUN yarn nx build docs

FROM nginx:alpine

RUN set -e; \
    apk update && apk add --no-cache --update \
    tini \
    && apk del --purge apk-tools \
    && rm -rf /var/cache/apk/* \
    && rm -rf /etc/nginx/conf.d/*

ENV APP_HOME /app
ENV APP docs
ENV APP_DIR apps/notes/$APP
ENV PORT 8000
ENV HOST 0.0.0.0
ENV HOSTNAME localhost
ENV NODE_ENV production

WORKDIR $APP_HOME

COPY --from=builder /app/dist/$APP_DIR/ /usr/share/nginx/html
COPY --from=builder /app/$APP_DIR/nginx.conf /etc/nginx/conf.d/nginx.conf

EXPOSE $PORT

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["nginx", "-g", "daemon off;"]
