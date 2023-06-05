#!/bin/sh

echo | npx prisma generate --schema=apps/notes/prisma/schema.prisma &&
npx prisma migrate reset --schema=apps/notes/prisma/schema.prisma --force --skip-generate &&
npx prisma migrate dev --schema=apps/notes/prisma/schema.prisma --name "$(git rev-parse --short HEAD)" --skip-generate
