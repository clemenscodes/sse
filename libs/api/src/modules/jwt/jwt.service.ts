import { Injectable } from '@nestjs/common';
import { JwtService as Service } from '@nestjs/jwt';

@Injectable()
export class JwtService {
    constructor(private readonly jwtService: Service) {}

    generateToken(userId: string): string {
        const payload = { sub: userId };
        return this.jwtService.sign(payload);
    }
}
