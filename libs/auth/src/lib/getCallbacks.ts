import {
    GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse,
} from 'next';
import { CallbacksOptions } from 'next-auth';
import { prisma } from './prisma';
import { fromDate } from './fromDate';
import { generateSessionToken } from './generateSessionToken';
import { maxAge } from './session';

export const getCallbacks = (
    req: NextApiRequest,
    res: NextApiResponse
): CallbacksOptions => {
    const callbacks: CallbacksOptions = {
        signIn: async ({ user }) => {
            // Check if this sign in callback is being called in the credentials authentication flow.
            // If so, use the next-auth adapter to create a session entry in the database
            // SignIn is called after authorize so we can safely assume the user is valid and already authenticated.
            if (
                req.query['nextauth'] &&
                req.query['nextauth'].includes('callback') &&
                req.query['nextauth'].includes('credentials') &&
                req.method === 'POST'
            ) {
                if (user) {
                    const sessionToken = generateSessionToken();
                    const expires = fromDate(maxAge);
                    const userId = Number(user.id);
                    const data = { userId, expires, sessionToken };
                    try {
                        const session = await prisma.session.create({ data });
                        res.setHeader(
                            'Set-Cookie',
                            `next-auth.session-token=${session.sessionToken}; Expires=${session.expires}; Path=/; HttpOnly; SameSite=lax; `
                        );
                    } catch (e) {
                        console.error(e);
                        throw e;
                    }
                }
            }
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
                return baseUrl;
            }
            return url.startsWith(baseUrl) ? url : baseUrl;
        },
        jwt: async ({ token, user, account, profile, session }) => {
            console.log('JWT Callback');
            console.log({ token, user, account, profile, session });
            token.name = user.name;
            return token;
        },
        session: async ({ session, token, user }) => {
            console.log({ session, token, user });
            if (session.user) {
                session.user.id = user.id;
            }
            return session;
        },
    };
    return callbacks;
};

export const getCallbacksSSR = (
    req: GetServerSidePropsContext['req'],
    query: GetServerSidePropsContext['query'],
    res: GetServerSidePropsContext['res']
): CallbacksOptions => {
    const callbacks: CallbacksOptions = {
        signIn: async ({ user }) => {
            // Check if this sign in callback is being called in the credentials authentication flow.
            // If so, use the next-auth adapter to create a session entry in the database
            // SignIn is called after authorize so we can safely assume the user is valid and already authenticated.
            if (
                query['nextauth'] &&
                query['nextauth'].includes('callback') &&
                query['nextauth'].includes('credentials') &&
                req.method === 'POST'
            ) {
                if (user) {
                    const sessionToken = generateSessionToken();
                    const expires = fromDate(maxAge);
                    const userId = Number(user.id);
                    const data = { userId, expires, sessionToken };
                    try {
                        const session = await prisma.session.create({ data });
                        res.setHeader(
                            'Set-Cookie',
                            `next-auth.session-token=${session.sessionToken}; Expires=${session.expires}; Path=/; HttpOnly; SameSite=lax;`
                        );
                    } catch (e) {
                        console.error(e);
                        throw e;
                    }
                }
            }
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
                return baseUrl;
            }
            return url.startsWith(baseUrl) ? url : baseUrl;
        },
        jwt: async ({ token, user, account, profile, session }) => {
            console.log('JWT Callback');
            console.log({ token, user, account, profile, session });
            token.name = user.name;
            return token;
        },
        session: async ({ session, token, user }) => {
            console.log({ session, token, user });
            if (session.user) {
                session.user.id = user.id;
            }
            return session;
        },
    };
    return callbacks;
};
