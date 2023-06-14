import { HashService, PrismaService, UserService } from '@api';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/api';

const prisma = new PrismaClient();
const userService = new UserService(
    new HashService(new ConfigService()),
    new PrismaService()
);

async function seed() {
    try {
        await prisma.user.deleteMany();
        const users = [
            {
                username: 'test',
                email: 'test@example.com',
                password: 'test',
            },
            {
                username: 'john',
                email: 'john@example.com',
                password: 'test',
            },
        ];

        for (const user of users) {
            await userService.create(user);
        }

        console.log('Seed script executed successfully');
    } catch (error) {
        console.error('Error executing seed script:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seed();
