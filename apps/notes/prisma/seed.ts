import { PrismaClient } from '@prisma/api';

const prisma = new PrismaClient();

async function main() {
    const user1 = await prisma.user.create({
        data: {
            email: 'user1@example.com',
            emailVerified: new Date(),
            username: 'John_Doe',
            password: 'Random password',
            notes: {
                create: [
                    { content: 'Note 1 for User 1' },
                    { content: 'Note 2 for User 1' },
                ],
            },
        },
    });

    const user2 = await prisma.user.create({
        data: {
            email: 'user2@example.com',
            emailVerified: new Date(),
            username: 'Jane_Smith',
            password: 'Random password',
            notes: {
                create: [
                    { content: 'Note 1 for User 2' },
                    { content: 'Note 2 for User 2' },
                ],
            },
        },
    });

    const user3 = await prisma.user.create({
        data: {
            email: 'user3@example.com',
            emailVerified: new Date(),
            username: 'Mike_Johnson',
            password: 'Random password',
            notes: {
                create: [
                    { content: 'Note 1 for User 3' },
                    { content: 'Note 2 for User 3' },
                ],
            },
        },
    });

    console.log('Users and notes created:');
    console.log(user1);
    console.log(user2);
    console.log(user3);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
