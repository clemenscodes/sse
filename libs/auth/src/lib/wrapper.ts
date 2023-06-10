import { GetServerSidePropsContext } from 'next';
import { NextAuthOptions } from 'next-auth';
import { getCallbacks } from './getCallbacks';
import { getJWTOptions } from './getJWTOptions';
import { options } from './options';

/**
 * to understand this, following this thread might help
 * @see https://github.com/nextauthjs/next-auth/discussions/4394
 */
export const authWrapper = (
    req: GetServerSidePropsContext['req'],
    query: GetServerSidePropsContext['query'],
    res: GetServerSidePropsContext['res']
): [options: NextAuthOptions] => {
    const authOptions: NextAuthOptions = {
        ...options,
        callbacks: getCallbacks(req, query, res),
        jwt: getJWTOptions(req, query),
    };
    return [authOptions];
};
