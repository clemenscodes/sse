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
export class SessionService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly authService: AuthService
    ) {}

    private static sessionDefaultTTL: number = 60 * 60; // 1 hour

    async create(userId: User['id']) {
        try {
            const sessionToken = this.authService.generateSessionToken();
            const expires = fromDate(SessionService.sessionDefaultTTL);
            const createdSession = await this.prismaService.session.create({
                data: {
                    sessionToken,
                    expires,
                    user: { connect: { id: userId } },
                },
            });
            return createdSession;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new InternalServerErrorException(
                        'Session creation failed: Duplicate session'
                    );
                }
            }
            throw new InternalServerErrorException('Failed to create session');
        }
    }

    async findById(sessionId: string) {
        try {
            const session = await this.prismaService.session.findUnique({
                where: { id: sessionId },
            });
            if (!session) {
                throw new NotFoundException('Session not found');
            }
            return session;
        } catch (error) {
            throw new InternalServerErrorException(
                'Failed to retrieve session'
            );
        }
    }

    async getUserSessions(userId: User['id']) {
        try {
            const userSessions = await this.prismaService.session.findMany({
                where: { userId },
            });
            if (!userSessions) {
                throw new NotFoundException('No user sessions found');
            }
            return userSessions;
        } catch (error) {
            throw new InternalServerErrorException(
                'Failed to fetch user sessions'
            );
        }
    }

    async delete(sessionId: string) {
        try {
            const deletedSession = await this.prismaService.session.delete({
                where: { id: sessionId },
            });
            if (!deletedSession) {
                throw new NotFoundException('Session not found');
            }
            return deletedSession;
        } catch (error) {
            throw new InternalServerErrorException('Failed to delete session');
        }
    }
}
