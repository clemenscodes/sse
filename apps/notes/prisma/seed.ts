import { PrismaClient } from '@prisma/api';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.create({
        data: {
            email: 'user@example.com',
            name: 'John Doe',
        },
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
