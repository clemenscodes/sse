import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from "@auth/prisma-adapter";

const prisma = new PrismaClient();

export default NextAuth({
adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
})
