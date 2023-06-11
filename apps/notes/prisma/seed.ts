import { PrismaClient } from '@prisma/api';

const prisma = new PrismaClient();

async function main() {
    const user1 = await prisma.user.create({
        data: {
            email: 'user1@example.com',
            emailVerified: new Date(),
            username: 'john',
            password:
                '$argon2id$v=19$m=65536,t=3,p=4$/jwV3/KuSDM0vaF/0jMNNQ$Fhw3GVPH//P0E9PM+T3q9Ljbwnnbbvd3AVEiDFWlNHg', // test
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
            username: 'jane',
            password:
                '$argon2id$v=19$m=65536,t=3,p=4$/jwV3/KuSDM0vaF/0jMNNQ$Fhw3GVPH//P0E9PM+T3q9Ljbwnnbbvd3AVEiDFWlNHg', // test
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
            username: 'mike',
            password:
                '$argon2id$v=19$m=65536,t=3,p=4$/jwV3/KuSDM0vaF/0jMNNQ$Fhw3GVPH//P0E9PM+T3q9Ljbwnnbbvd3AVEiDFWlNHg', // testTest
            notes: {
                create: [
                    { content: 'Note 1 for User 3' },
                    { content: 'Note 2 for User 3' },
                ],
            },
        },
    });

    const user4 = await prisma.user.create({
        data: {
            email: 'test@test.com',
            emailVerified: new Date(),
            username: 'test',
            password:
                '$argon2id$v=19$m=65536,t=3,p=4$/jwV3/KuSDM0vaF/0jMNNQ$Fhw3GVPH//P0E9PM+T3q9Ljbwnnbbvd3AVEiDFWlNHg', // test
            notes: {
                create: [
                    { content: 'Note 1 for User 4' },
                    { content: 'Note 2 for User 4' },
                ],
            },
        },
    });

    console.log('Users and notes created:');
    console.log(user1);
    console.log(user2);
    console.log(user3);
    console.log(user4);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
