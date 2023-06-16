import { PagesOptions } from 'next-auth';

export const pages: Partial<PagesOptions> = {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
};
