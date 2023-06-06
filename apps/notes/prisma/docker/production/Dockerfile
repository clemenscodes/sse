FROM node:16.19-alpine

WORKDIR /app

RUN set -e; \
    apk update && apk add --no-cache --update \
    bash \
    wget \
    git \
    && apk del --purge apk-tools \
    && rm -rf /var/cache/apk/*

ENV APP prisma
ENV APP_DIR apps/notes/$APP
ENV DATABASE_URL postgresql://postgres:postgres@db:5432/postgres?connect_timeout=10
ENV PRISMA_SKIP_POSTINSTALL_GENERATE 1

COPY $APP_DIR/seed.ts ./$APP_DIR/seed.ts
COPY $APP_DIR/setup.sh ./$APP_DIR/setup.sh
COPY $APP_DIR/schema.prisma ./$APP_DIR/schema.prisma
COPY apps/notes/db ./apps/notes/db
COPY libs/ ./libs
COPY tsconfig.base.json ./
COPY nx.json ./
COPY .git ./.git

RUN wget https://github.com/vishnubob/wait-for-it/raw/master/wait-for-it.sh --no-check-certificate && \
    chmod +x wait-for-it.sh

ENTRYPOINT [ "/bin/bash", "-c" ]
CMD ["/app/wait-for-it.sh db:5432 --strict --timeout=300 -- npm i -D tslib ts-node @types/node && echo | npx prisma generate --schema=apps/notes/prisma/schema.prisma && npx prisma migrate reset --schema=apps/notes/prisma/schema.prisma --force --skip-generate && npx prisma migrate dev --schema=apps/notes/prisma/schema.prisma --name $(git rev-parse --short HEAD) --skip-generate && npx ts-node apps/notes/prisma/seed.ts"]
