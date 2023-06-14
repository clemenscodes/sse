import { createHmac, randomBytes } from 'crypto';
import {
    Injectable,
    InternalServerErrorException,
    Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { argon2id, hash, Options, verify } from 'argon2';

export type VerifyPayload = {
    password: string;
    hash: string;
    salt: Buffer;
};

@Injectable()
export class AuthService {
    constructor(private readonly configService: ConfigService) {}

    public static readonly saltLength = 128;
    public static readonly options: Options & { raw: false } = {
        timeCost: 4,
        memoryCost: 2 ** 16,
        parallelism: 2,
        type: argon2id,
        saltLength: AuthService.saltLength,
        raw: false,
    };

    async hashPassword(password: string): Promise<[string, Buffer]> {
        const key = this.configService.get<string>('SECRET') || '';
        const salt = randomBytes(AuthService.saltLength);
        const secret = createHmac('sha512', key).update(salt).digest();
        const options = { ...AuthService.options, salt, secret };
        try {
            const result = await hash(password, options);
            return [result, salt];
        } catch (e) {
            Logger.error(JSON.stringify(e));
            throw new InternalServerErrorException('Failed hashing password');
        }
    }

    async verifyPassword(payload: VerifyPayload): Promise<boolean> {
        const { salt, hash, password } = payload;
        if (!hash) {
            return false;
        }
        const key = this.configService.get<string>('SECRET') || '';
        const secret = createHmac('sha512', key).update(salt).digest();
        const options = { ...AuthService.options, salt, secret };
        try {
            const result = await verify(hash, password, options);
            return result;
        } catch (e) {
            Logger.error(JSON.stringify(e));
            throw new InternalServerErrorException('Failed verifying password');
        }
    }
}
