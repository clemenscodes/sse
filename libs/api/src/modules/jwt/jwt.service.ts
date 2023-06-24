import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService as Service } from '@nestjs/jwt';
import { JsonWebTokenError } from 'jsonwebtoken';

export type JWT = {
    sub: string;
    iat: string;
    exp: string;
};

@Injectable()
export class JwtService {
    constructor(private readonly jwtService: Service) {}

    private readonly logger = new Logger(JwtService.name);

    async generateToken(userId: string): Promise<string> {
        this.logger.debug(`Generating JWT for ${userId}`);
        const payload = { sub: userId };
        const jwt = await this.jwtService.signAsync(payload);
        return jwt;
    }

    async verifyToken<T extends JWT>(token: string): Promise<T> {
        try {
            this.logger.debug(`Verifying JWT ${token}`);
            const payload = await this.jwtService.verifyAsync<T>(token);
            return payload;
        } catch (e) {
            if (e instanceof JsonWebTokenError) {
                this.logger.debug(JSON.stringify(e));
                throw new UnauthorizedException(e.message);
            }
            this.logger.error(
                `Something unexpected happened. This is likely a bug or vulnerability.`
            );
            this.logger.error(JSON.stringify(e));
            throw new UnauthorizedException();
        }
    }
}
