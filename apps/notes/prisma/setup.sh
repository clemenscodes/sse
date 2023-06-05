#!/bin/sh

npm i -D tslib ts-node @types/node &&
npx prisma generate --schema=apps/notes/prisma/schema.prisma &&
npx prisma migrate dev --schema=apps/notes/prisma/schema.prisma --name "$(git rev-parse --short HEAD)" --skip-generate
