import { Injectable } from '@nestjs/common';
import { JwtService as Service } from '@nestjs/jwt';

export type JWT = {
    sub: string;
    iat: string;
    exp: string;
};

@Injectable()
export class JwtService {
    constructor(private readonly jwtService: Service) {}

    async generateToken(userId: string): Promise<string> {
        const payload = { sub: userId };
        return this.jwtService.signAsync(payload);
    }

    async verifyToken<T extends JWT>(token: string): Promise<T> {
        return this.jwtService.verifyAsync<T>(token);
    }
}
