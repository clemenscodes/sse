import { GetServerSidePropsContext } from 'next';
import { refreshCookieName, sessionCookieName } from './cookies';

export const getCookies = (req: GetServerSidePropsContext['req']) => {
    const { cookies } = req;
    if (!(sessionCookieName in cookies)) {
        throw new Error('No session cookie');
    }
    if (!(refreshCookieName in cookies)) {
        throw new Error('No refresh cookie');
    }
    const sessionToken = cookies[sessionCookieName];
    const refreshToken = cookies[refreshCookieName];
    const parsedCookies = `${sessionCookieName}=${sessionToken}; ${refreshCookieName}=${refreshToken}`;
    return parsedCookies;
};
