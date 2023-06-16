import { PrismaAdapter } from '@auth/prisma-adapter';
import { Adapter } from 'next-auth/adapters';
import { prisma } from './prisma';

export const adapter = PrismaAdapter(prisma) as Adapter;
