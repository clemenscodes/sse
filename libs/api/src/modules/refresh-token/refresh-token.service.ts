import {
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { Prisma, RefreshToken, User } from '@prisma/api';
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
            Logger.error(error);
            throw new InternalServerErrorException(
                'Failed to create refresh token'
            );
        }
    }

    async checkRefreshToken(refreshToken: RefreshToken['refreshToken']) {
        try {
            const { expires } = await this.findByRefreshToken(refreshToken);
            const tokenTimestamp = expires.getTime();
            const currentTimestamp = Date.now();
            const validRefreshToken = tokenTimestamp > currentTimestamp;
            return validRefreshToken;
        } catch (e) {
            Logger.error(e);
            return false;
        }
    }

    async findByRefreshToken(refreshToken: RefreshToken['refreshToken']) {
        try {
            const token = await this.prismaService.refreshToken.findUnique({
                where: { refreshToken },
            });
            if (!token) {
                throw new NotFoundException('Refresh token not found');
            }
            return token;
        } catch (error) {
            Logger.error(error);
            throw new InternalServerErrorException(
                'Failed to retrieve refresh token'
            );
        }
    }

    async findById(refreshTokenId: RefreshToken['id']) {
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
            Logger.error(error);
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
            Logger.error(error);
            throw new InternalServerErrorException(
                'Failed to fetch user refresh tokens'
            );
        }
    }

    async delete(refreshTokenId: RefreshToken['id']) {
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
            Logger.error(error);
            throw new InternalServerErrorException(
                'Failed to delete refresh token'
            );
        }
    }
}
