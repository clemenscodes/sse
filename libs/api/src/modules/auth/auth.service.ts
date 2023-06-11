import { Injectable } from '@nestjs/common';
import { hash, Options, verify } from 'argon2';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
    private static options: Options = {};

    async hashPassword(password: string): Promise<string> {
        const result = await hash(password, {
            ...AuthService.options,
            raw: false,
        });
        return result;
    }

    async verifyPassword(hash: string, password: string): Promise<boolean> {
        const result = await verify(hash, password, AuthService.options);
        return result;
    }

    generateSessionToken() {
        const sessionToken = uuidv4();
        return sessionToken;
    }
}
