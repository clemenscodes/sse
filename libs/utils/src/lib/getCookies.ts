import { GetServerSidePropsContext } from 'next';
import { refreshCookieName, sessionCookieName } from './cookies';

export const getCookies = (
    req: GetServerSidePropsContext['req']
): string | false => {
    const { cookies } = req;
    if (!(sessionCookieName in cookies)) {
        return false;
    }
    if (!(refreshCookieName in cookies)) {
        return false;
    }
    const sessionToken = cookies[sessionCookieName];
    const refreshToken = cookies[refreshCookieName];
    const parsedCookies = `${sessionCookieName}=${sessionToken}; ${refreshCookieName}=${refreshToken}`;
    return parsedCookies;
};
