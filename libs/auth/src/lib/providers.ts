import { Prisma, User as PrismaUser } from '@prisma/api';
import axios from 'axios';
import { User } from 'next-auth';
import { Provider } from 'next-auth/providers';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';

export const providers: Provider[] = [
    /**
     * Doesnt work with adapters, needs to be manually configured
     * @see https://github.com/nextauthjs/next-auth/discussions/2248
     */
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
            username: { label: 'Username', type: 'text' },
            email: { label: 'Email', type: 'email' },
            password: { label: 'Password', type: 'password' },
        },
        authorize: async (credentials): Promise<User | null> => {
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
                const response = await axios.post(
                    'http://localhost:4200/api/user',
                    payload
                );
                if (!response) {
                    return null;
                }
                const data = response.data as PrismaUser;
                const user = { ...data, id: data.id.toString() };
                return user;
            } catch (e) {
                console.error(e);
                return null;
            }
        },
    }),
    GitHubProvider({
        clientId: process.env['GITHUB_ID'] || '',
        clientSecret: process.env['GITHUB_SECRET'] || '',
    }),
];
