import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/api';
import { fromDate } from '@utils';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RefreshTokenService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly authService: AuthService
    ) {}
    public static readonly refreshTokenDefaultTTL: number = 30 * 24 * 60 * 60; // 30 days
    public static readonly refreshCookieName: string = 'refreshToken';

    async create(userId: User['id']) {
        try {
            const refreshToken = this.authService.generateSessionToken();
            const expires = fromDate(
                RefreshTokenService.refreshTokenDefaultTTL
            );
            const createdRefreshToken =
                await this.prismaService.refreshToken.create({
                    data: {
                        refreshToken,
                        expires,
                        user: { connect: { id: userId } },
                    },
                });
            return createdRefreshToken;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new InternalServerErrorException(
                        'Refresh token creation failed: Duplicate token'
                    );
                }
            }
            throw new InternalServerErrorException(
                'Failed to create refresh token'
            );
        }
    }

    async findById(refreshTokenId: string) {
        try {
            const refreshToken =
                await this.prismaService.refreshToken.findUnique({
                    where: { id: refreshTokenId },
                });
            if (!refreshToken) {
                throw new NotFoundException('Refresh token not found');
            }
            return refreshToken;
        } catch (error) {
            throw new InternalServerErrorException(
                'Failed to retrieve refresh token'
            );
        }
    }

    async getUserRefreshToken(userId: User['id']) {
        try {
            const userRefreshTokens =
                await this.prismaService.refreshToken.findUnique({
                    where: { userId },
                });
            return userRefreshTokens;
        } catch (error) {
            throw new InternalServerErrorException(
                'Failed to fetch user refresh tokens'
            );
        }
    }

    async delete(refreshTokenId: string) {
        try {
            const deletedRefreshToken =
                await this.prismaService.refreshToken.delete({
                    where: { id: refreshTokenId },
                });
            if (!deletedRefreshToken) {
                throw new NotFoundException('Refresh token not found');
            }
            return deletedRefreshToken;
        } catch (error) {
            throw new InternalServerErrorException(
                'Failed to delete refresh token'
            );
        }
    }
}
