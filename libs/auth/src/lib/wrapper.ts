import {
    GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse,
} from 'next';
import { NextAuthOptions } from 'next-auth';
import { getCallbacks, getCallbacksSSR } from './getCallbacks';
import { getJWTOptions, getJWTOptionsSSR } from './getJWTOptions';
import { options } from './options';

/**
 * To make this work, following this thread might help
 * @see https://github.com/nextauthjs/next-auth/discussions/4394
 */
export const authWrapper = (
    req: NextApiRequest,
    res: NextApiResponse
): [req: NextApiRequest, res: NextApiResponse, options: NextAuthOptions] => {
    const authOptions: NextAuthOptions = {
        ...options,
        callbacks: getCallbacks(req, res),
        jwt: getJWTOptions(req),
    };
    return [req, res, authOptions];
};

export const authWrapperSSR = (
    req: GetServerSidePropsContext['req'],
    query: GetServerSidePropsContext['query'],
    res: GetServerSidePropsContext['res']
): [options: NextAuthOptions] => {
    const authOptions: NextAuthOptions = {
        ...options,
        callbacks: getCallbacksSSR(req, query, res),
        jwt: getJWTOptionsSSR(req, query),
    };
    return [authOptions];
};
