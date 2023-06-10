import { PrismaClient } from '@prisma/api';
import { secure } from './secure';

const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined;
};

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log: ['query'],
    });

if (!secure) globalForPrisma.prisma = prisma;
