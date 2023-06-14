import { AuthService } from '@api';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/api';

const prisma = new PrismaClient();
const authService = new AuthService(new ConfigService());

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
            const [hashedPassword, salt] = await authService.hashPassword(
                user.password
            );
            await prisma.user.create({
                data: {
                    username: user.username,
                    email: user.email,
                    password: hashedPassword,
                    salt,
                },
            });
        }
        console.log('Seed script executed successfully');
    } catch (error) {
        console.error('Error executing seed script:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seed();
