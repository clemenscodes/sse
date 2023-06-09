import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { Prisma, User, VerificationToken } from '@prisma/api';
import { fromDate } from '@utils';
import { PrismaService } from '../prisma/prisma.service';
import { SessionService } from '../session/session.service';

@Injectable()
export class VerificationTokenService {
    constructor(
        private readonly sessionService: SessionService,
        private readonly prismaService: PrismaService
    ) {}

    public static readonly verificationTokenDefaultTTLms = 5 * 60 * 1000; // 5 minutes

    async findByUserId(userId: User['id']) {
        try {
            const token = await this.prismaService.verificationToken.findUnique(
                {
                    where: { userId },
                }
            );
            if (!token) {
                throw new NotFoundException('Token not found');
            }
            return token;
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                throw new InternalServerErrorException(
                    'Failed to retrieve token'
                );
            } else if (e instanceof Prisma.PrismaClientValidationError) {
                throw new NotFoundException('Token not found');
            } else if (e instanceof NotFoundException) {
                throw e;
            } else {
                throw new InternalServerErrorException(
                    'Failed to retrieve token'
                );
            }
        }
    }

    async deleteByToken(resetToken: VerificationToken) {
        try {
            const { token } = resetToken;
            const deletedToken =
                await this.prismaService.verificationToken.delete({
                    where: { token },
                });
            if (!deletedToken) {
                throw new NotFoundException('Verification Token not found');
            }
            return deletedToken;
        } catch (e) {
            throw new InternalServerErrorException(
                'Failed to delete Verification Token'
            );
        }
    }

    async createToken(userId: User['id']) {
        try {
            const token = this.sessionService.generateSessionToken();
            const expires = fromDate(
                VerificationTokenService.verificationTokenDefaultTTLms
            );
            const createdData =
                await this.prismaService.verificationToken.create({
                    data: {
                        token,
                        expires,
                        user: { connect: { id: userId } },
                    },
                });
            if (!createdData) {
                throw new InternalServerErrorException(
                    'Verification Token registration failed'
                );
            }
            return token;
        } catch (e) {
            if (
                e instanceof Prisma.PrismaClientKnownRequestError &&
                e.code === 'P2002'
            ) {
                throw new InternalServerErrorException(
                    'Verification Token registration failed'
                );
            } else if (e instanceof InternalServerErrorException) {
                throw e;
            } else {
                throw new InternalServerErrorException(
                    'Verification Token registration failed'
                );
            }
        }
    }

    async findByVerificationToken(token: VerificationToken['token']) {
        try {
            const data = await this.prismaService.verificationToken.findUnique({
                where: { token },
            });
            if (!data) {
                throw new NotFoundException('User not found');
            }
            return data;
        } catch (e) {
            throw new InternalServerErrorException(
                'Error happened when looking for verifcation token'
            );
        }
    }

    async checkVerificationToken(token: VerificationToken['token']) {
        try {
            const { expires } = await this.findByVerificationToken(token);
            const sessionTimestamp = expires.getTime();
            const currentTimestamp = Date.now();
            const validToken = sessionTimestamp > currentTimestamp;
            return validToken;
        } catch (e) {
            return false;
        }
    }
}
