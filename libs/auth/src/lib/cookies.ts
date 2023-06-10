import { CookiesOptions } from 'next-auth';
import { secure } from './secure';
import { sessionCookieName } from './session';

export const cookies: Partial<CookiesOptions> = {
    sessionToken: {
        name: sessionCookieName,
        options: {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            secure,
        },
    },
};
