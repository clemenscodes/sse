import { NextAuthOptions } from 'next-auth';
import { adapter } from './adapter';
import { cookies } from './cookies';
import { debug } from './debug';
import { events } from './events';
import { pages } from './pages';
import { providers } from './providers';
import { secret } from './secret';
import { session } from './session';

export const options: NextAuthOptions = {
    debug,
    secret,
    adapter,
    pages,
    providers,
    session,
    cookies,
    events,
};
