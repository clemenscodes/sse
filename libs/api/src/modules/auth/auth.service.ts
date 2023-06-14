import { createHmac, randomBytes } from 'crypto';
import { Injectable } from '@nestjs/common';
import { argon2id, hash, Options, verify } from 'argon2';

export type VerifyPayload = {
    password: string;
    hash: string;
    salt: Buffer;
};

@Injectable()
export class AuthService {
    private static readonly saltLength = 128;
    private static readonly options: Options & { raw: false } = {
        timeCost: 4,
        memoryCost: 2 ** 16,
        parallelism: 2,
        type: argon2id,
        saltLength: AuthService.saltLength,
        raw: false,
    };

    async hashPassword(password: string): Promise<[string, Buffer]> {
        const key = process.env['SECRET'] || '';
        const salt = randomBytes(AuthService.saltLength);
        const secret = createHmac('sha512', key).update(salt).digest();
        const options = { ...AuthService.options, salt, secret };
        const result = await hash(password, options);
        return [result, salt];
    }

    async verifyPassword(payload: VerifyPayload): Promise<boolean> {
        const { salt, hash, password } = payload;
        const key = process.env['SECRET'] || '';
        const secret = createHmac('sha512', key).update(salt).digest();
        const options = { ...AuthService.options, salt, secret };
        const result = await verify(hash, password, options);
        return result;
    }
}
