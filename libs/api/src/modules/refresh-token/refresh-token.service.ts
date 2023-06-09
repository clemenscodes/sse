import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { Prisma, RefreshToken, User } from '@prisma/api';
import { fromDate } from '@utils';
import { PrismaService } from '../prisma/prisma.service';
import { SessionService } from '../session/session.service';

@Injectable()
export class RefreshTokenService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly sessionService: SessionService
    ) {}

    public static readonly refreshTokenDefaultTTLms: number =
        30 * 24 * 60 * 60 * 1000; // 30 days
    public static readonly refreshCookieName: string = 'refreshToken';

    async create(userId: User['id']) {
        try {
            const refreshToken = this.sessionService.generateSessionToken();
            const expires = fromDate(
                RefreshTokenService.refreshTokenDefaultTTLms
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

    async checkRefreshToken(refreshToken: RefreshToken['refreshToken']) {
        try {
            const token = await this.findByRefreshToken(refreshToken);
            const { expires } = token;
            const tokenTimestamp = expires.getTime();
            const currentTimestamp = Date.now();
            const validRefreshToken = tokenTimestamp > currentTimestamp;
            return validRefreshToken;
        } catch (e) {
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
            throw new InternalServerErrorException(
                'Failed to delete refresh token'
            );
        }
    }

    async deleteUserRefreshToken(userId: User['id']) {
        try {
            const deletedRefreshTokens =
                await this.prismaService.refreshToken.deleteMany({
                    where: { userId },
                });
            return deletedRefreshTokens;
        } catch (error) {
            throw new InternalServerErrorException(
                'Failed to delete user refresh tokens'
            );
        }
    }
}
