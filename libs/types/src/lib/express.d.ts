// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request } from 'express';
import { type JWT } from './jwt';

declare module 'express' {
    interface Request {
        user?: JWT;
    }
}
