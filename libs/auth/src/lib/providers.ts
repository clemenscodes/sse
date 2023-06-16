import { User } from '@prisma/api';
import { api } from '@utils';
import { AdapterUser } from 'next-auth/adapters';
import { Provider } from 'next-auth/providers';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';

export const providers: Provider[] = [
    GitHubProvider({
        clientId: process.env['GITHUB_ID'] || '',
        clientSecret: process.env['GITHUB_SECRET'] || '',
    }),
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
        authorize: async (credentials): Promise<AdapterUser | null> => {
            if (!credentials) {
                return null;
            }
            const { username } = credentials;
            try {
                const response = await api.get(`/user/username/${username}`);
                if (!response) {
                    return null;
                }
                const data = response.data as User;
                const user = {
                    ...data,
                    id: data.id.toString(),
                    name: data.username,
                };
                return user;
            } catch (e) {
                console.error(e);
                return null;
            }
        },
    }),
];
