import { PrismaAdapter } from '@auth/prisma-adapter';
import { Prisma, PrismaClient } from '@prisma/api';
import axios from 'axios';
import NextAuth, { NextAuthOptions, User } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import CredentialsProvider from 'next-auth/providers/credentials';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials): Promise<User | null> => {
                console.log({ credentials });
                if (!credentials) {
                    return null;
                }
                const { email, username, password } = credentials;
                const payload: Prisma.UserCreateInput = {
                    email,
                    username,
                    password,
                };
                try {
                    const user = await axios.post<Prisma.UserCreateInput, User>(
                        'http://localhost:4200/api/user',
                        payload
                    );
                    if (!user) {
                        return null;
                    }
                    return user;
                } catch (e) {
                    console.error(e);
                    return null;
                }
            },
        }),
    ],
};

export default NextAuth(authOptions);
