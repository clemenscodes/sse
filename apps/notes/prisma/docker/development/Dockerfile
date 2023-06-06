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

COPY apps/notes/db ./apps/notes/db
COPY libs/ ./libs
COPY tsconfig.base.json ./
COPY nx.json ./
COPY .git ./.git

RUN wget https://github.com/vishnubob/wait-for-it/raw/master/wait-for-it.sh --no-check-certificate && \
    chmod +x wait-for-it.sh

ENTRYPOINT [ "/bin/bash", "-c" ]
CMD ["/app/wait-for-it.sh db:5432 --strict --timeout=300 -- /app/apps/notes/prisma/setup.sh"]
