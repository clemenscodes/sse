import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User, VerificationToken } from '@prisma/api';
import { fromDate } from '@utils';
import { PrismaService } from '../prisma/prisma.service';
import { SessionService } from '../session/session.service';

@Injectable()
export class VerificationTokenService {
    constructor(
        private readonly sessionService: SessionService,
        private readonly prismaService: PrismaService
    ) {}

    public static readonly verificationTokenDefaultTTLms: number =
        5 * 60 * 1000; // 1 hour

    async findByUserId(userId: User['id']) {
        const user = await this.prismaService.verificationToken.findUnique({
            where: { userId },
        });
        return user;
    }

    async deleteByToken(resetToken: VerificationToken) {
        const { token } = resetToken;
        return await this.prismaService.verificationToken.delete({
            where: { token },
        });
    }

    async createToken(userId: User['id']) {
        const token = this.sessionService.generateSessionToken();
        const expires = fromDate(
            VerificationTokenService.verificationTokenDefaultTTLms
        );
        await this.prismaService.verificationToken.create({
            data: {
                token,
                expires,
                user: { connect: { id: userId } },
            },
        });
        return token;
    }

    async findByVerificationToken(token: VerificationToken['token']) {
        try {
            const data = await this.prismaService.verificationToken.findUnique({
                where: { token },
            });
            return data;
        } catch (e) {
            throw new InternalServerErrorException(
                'Error happened when looking for verifcation token'
            );
        }
    }
}
