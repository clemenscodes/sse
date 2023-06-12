import {
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { Prisma, Session, User } from '@prisma/api';
import { fromDate } from '@utils';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SessionService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly authService: AuthService
    ) {}

    public static readonly sessionDefaultTTL: number = 60 * 60; // 1 hour
    public static readonly sessionCookieName: string = 'sessionToken';

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
            Logger.error(error);
            throw new InternalServerErrorException('Failed to create session');
        }
    }

    async findBySessionToken(sessionToken: Session['sessionToken']) {
        try {
            const session = await this.prismaService.session.findUnique({
                where: { sessionToken },
            });
            if (!session) {
                throw new NotFoundException('Session not found');
            }
            return session;
        } catch (error) {
            Logger.error(error);
            throw new InternalServerErrorException(
                'Failed to retrieve session'
            );
        }
    }

    async checkSession(sessionToken: Session['sessionToken']) {
        try {
            const { expires } = await this.findBySessionToken(sessionToken);
            const sessionTimestamp = expires.getTime();
            const currentTimestamp = Date.now();
            const validSession = sessionTimestamp > currentTimestamp;
            return validSession;
        } catch (e) {
            Logger.error(e);
            return false;
        }
    }

    async findById(sessionId: Session['id']) {
        try {
            const session = await this.prismaService.session.findUnique({
                where: { id: sessionId },
            });
            if (!session) {
                throw new NotFoundException('Session not found');
            }
            return session;
        } catch (error) {
            Logger.error(error);
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
            Logger.error(error);
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
            Logger.error(error);
            throw new InternalServerErrorException('Failed to delete session');
        }
    }
}
