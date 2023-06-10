import { GetServerSidePropsContext } from 'next';
import { decode, encode, JWTOptions } from 'next-auth/jwt';
import { maxAge, sessionCookieName } from './session';

export const getJWTOptions = (
    req: GetServerSidePropsContext['req'],
    query: GetServerSidePropsContext['query']
): Partial<JWTOptions> => {
    const jwt: Partial<JWTOptions> = {
        // Customize the JWT encode and decode functions to overwrite the default behaviour
        // of storing the JWT token in the session cookie when using credentials providers.
        // Instead we will store the session token reference to the session in the database.
        maxAge,
        encode: async ({ token, secret, maxAge }) => {
            console.log('Encoding JWT');
            console.log({ token });
            if (
                query['nextauth'] &&
                query['nextauth'].includes('callback') &&
                query['nextauth'].includes('credentials') &&
                req.method === 'POST'
            ) {
                console.log('Custom encoding of jwt');
                const { cookies } = req;
                console.log({ cookies });
                if (sessionCookieName in cookies) {
                    const cookie = cookies[sessionCookieName];
                    console.log({ cookie });
                    if (!cookie) return '';
                    return cookie;
                }
                return '';
            }
            // Revert to default behaviour when not in the credentials provider callback flow
            try {
                const encoded = await encode({ token, secret, maxAge });
                console.log({ encoded });
                return encoded;
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
        decode: async ({ token, secret }) => {
            console.log('Decoding JWT');
            console.log({ token });
            if (
                query['nextauth'] &&
                query['nextauth'].includes('callback') &&
                query['nextauth'].includes('credentials')
            ) {
                return null;
            }
            // Revert to default behaviour when not in the credentials provider callback flow
            try {
                const decoded = await decode({ token, secret });
                console.log({ decoded });
                return decoded;
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
    };
    return jwt;
};
