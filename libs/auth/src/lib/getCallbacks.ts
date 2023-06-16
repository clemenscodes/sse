import { fromDate } from '@utils';
import { CallbacksOptions, Session } from 'next-auth';
import { prisma } from './prisma';
import { maxAge } from './session';

export const callbacks: CallbacksOptions = {
    signIn: async ({ user }) => {
        if (user) {
            return true;
        }
        return false;
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
            return baseUrl;
        }
        return url.startsWith(baseUrl) ? url : baseUrl;
    },
    jwt: async ({ token, user, account, profile, session, trigger }) => {
        console.log({ token, user, account, profile, session, trigger });
        if (trigger === 'signUp') {
            token.name = user.name;
        }
        return token;
    },
    session: async ({ session, token, trigger }) => {
        console.log('Session callback');
        console.log({ session, token, trigger });
        if (!token) {
            return session;
        }
        const { jti, sub } = token;
        if (!sub) {
            return session;
        }
        const expires = fromDate(maxAge);
        const data = {
            userId: sub,
            expires,
            sessionToken: jti as string,
        };
        const dbSession = (await prisma.session.create({
            data,
        })) as unknown as Session;
        return dbSession;
    },
};
