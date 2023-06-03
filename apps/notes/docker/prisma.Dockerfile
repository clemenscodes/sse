FROM node:16.19-alpine

WORKDIR /app

RUN set -e; \
    apk update && apk add --no-cache --update \
    bash \
    wget \
    git \
    && apk del --purge apk-tools \
    && rm -rf /var/cache/apk/*

ENV APP server
ENV APP_DIR apps/notes/$APP
ENV DATABASE_URL postgresql://postgres:postgres@postgres:5432/postgres?connect_timeout=10
ENV PRISMA_SKIP_POSTINSTALL_GENERATE 1

COPY $APP_DIR ./$APP_DIR
COPY libs/ ./libs
COPY tsconfig.base.json ./
COPY nx.json ./
COPY .git ./.git

RUN wget https://github.com/vishnubob/wait-for-it/raw/master/wait-for-it.sh --no-check-certificate && \
    chmod +x wait-for-it.sh

RUN [ -f $APP_DIR/.env ] && rm $APP_DIR/.env

ENTRYPOINT [ "/bin/bash", "-c" ]
CMD ["/app/wait-for-it.sh postgres:5432 --strict --timeout=300 -- npm i -D tslib ts-node @types/node && npx prisma generate --schema=apps/notes/server/prisma/schema.prisma && npx prisma migrate dev --schema=apps/notes/server/prisma/schema.prisma --name $(git rev-parse --short HEAD) --skip-generate && npx ts-node apps/notes/server/prisma/seed.ts"]
