import { PrismaAdapter } from '@auth/prisma-adapter';
import { Prisma, PrismaClient } from '@prisma/api';
import axios from 'axios';
import { NextApiHandler } from 'next';
import NextAuth, { NextAuthOptions, User } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import CredentialsProvider from 'next-auth/providers/credentials';
import EmailProvider from 'next-auth/providers/email';
import GitHubProvider from 'next-auth/providers/github';

const prisma = new PrismaClient();

// To make this work, following this thread might help
// @see https://github.com/nextauthjs/next-auth/discussions/4394
export const authOptions: NextAuthOptions = {
    debug: true,
    adapter: PrismaAdapter(prisma) as Adapter,
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error',
    },
    secret: process.env.SECRET,
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
        }),
        EmailProvider({
            server: {
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT),
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
        }),
        // Doesnt work with adapters, needs to be manually configured
        // @see https://github.com/nextauthjs/next-auth/discussions/2248
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
    callbacks: {
        signIn: async ({ user, account, profile, email, credentials }) => {
            console.log({ user, account, profile, email, credentials });
            return true;
        },
        redirect: async ({ url, baseUrl }): Promise<string> => {
            const params = new URLSearchParams(new URL(url).search);
            const callbackUrl = params.get('callbackUrl');
            if (url.startsWith(baseUrl)) {
                if (callbackUrl?.startsWith('/')) {
                    return baseUrl + callbackUrl;
                } else if (callbackUrl?.startsWith(baseUrl)) {
                    return callbackUrl;
                }
            } else {
                return Promise.resolve(baseUrl);
            }
            return Promise.resolve(url.startsWith(baseUrl) ? url : baseUrl);
        },
        jwt: async ({ token, user }) => {
            console.log({ token, user });
            return Promise.resolve(token);
        },
        session: async ({ session, token }) => {
            console.log({ session, token });
            return Promise.resolve(session);
        },
    },
    session: {
        // Choose how you want to save the user session.
        // The default is `"jwt"`, an encrypted JWT (JWE) in the session cookie.
        // If you use an `adapter` however, we default it to `"database"` instead.
        // You can still force a JWT session by explicitly defining `"jwt"`.
        // When using `"database"`, the session cookie will only contain a `sessionToken` value,
        // which is used to look up the session in the database.
        strategy: 'jwt',

        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        updateAge: 24 * 60 * 60, // 24 hours
    },
};

export const authHandler: NextApiHandler = (req, res) => {
    return NextAuth(req, res, authOptions);
};

export default authHandler;
