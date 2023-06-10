import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import { options } from './options';

export const nextAuthHandler: NextApiHandler = async (req, res) => {
    return await NextAuth(req, res, options);
};
