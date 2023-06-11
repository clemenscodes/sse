import { NextAuthOptions, type DefaultSession } from 'next-auth';
import { adapter } from './adapter';
import { cookies } from './cookies';
import { debug } from './debug';
import { events } from './events';
import { callbacks } from './getCallbacks';
import { pages } from './pages';
import { providers } from './providers';
import { secret } from './secret';
import { session } from './session';

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        sessionToken?: string;
        user: {
            id?: string;
        } & DefaultSession['user'];
    }
}

declare module 'next-auth/jwt' {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        /** OpenID ID Token */
        idToken?: string;
    }
}

export const options: NextAuthOptions = {
    debug,
    secret,
    adapter,
    pages,
    providers,
    session,
    cookies,
    callbacks,
    events,
};
