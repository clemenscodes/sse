import {Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { User, VerificationToken } from '@prisma/api';
import { fromDate } from '@utils';
import { PrismaService } from '../prisma/prisma.service';
import { SessionService } from '../session/session.service';
import {Prisma} from "@prisma/api";

@Injectable()
export class VerificationTokenService {
    constructor(
        private readonly sessionService: SessionService,
        private readonly prismaService: PrismaService
    ) {}

    public static readonly verificationTokenDefaultTTLms: number =
        5 * 60 * 1000; // 1 hour

    async findByUserId(userId: User['id']) {
        try {
            const user = await this.prismaService.verificationToken.findUnique({
                where: {userId},
            });
            if(!user){
                throw new UnauthorizedException('Invalid credentials');
            }
            return user;
        }catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                throw  new InternalServerErrorException(
                    'Failed to rtrieve User'
                );
            } else if (e instanceof Prisma.PrismaClientValidationError) {
                throw new NotFoundException('User not found');
            } else if (e instanceof NotFoundException) {
                throw e;
            } else {
                throw new InternalServerErrorException(
                    'Failed to retrieve user'
                );
            }
        }
    }

    async deleteByToken(resetToken: VerificationToken) {
        try {
            const {token} = resetToken;
            return await this.prismaService.verificationToken.delete({
                where: {token},
            });
        } catch (e) {
            throw new InternalServerErrorException(
                'Error happened while deleting verification token'
            );
        }
    }

    async createToken(userId: User['id']) {
        try {
            const token = this.sessionService.generateSessionToken();
            const expires = fromDate(
                VerificationTokenService.verificationTokenDefaultTTLms
            );
            const createdData = await this.prismaService.verificationToken.create({
                data: {
                    token,
                    expires,
                    user: {connect: {id: userId}},
                },
            });
            if(!createdData){
                throw new InternalServerErrorException('Verification Token registration failed');
            }
            return token;
        }catch (e) {
            if (
                e instanceof Prisma.PrismaClientKnownRequestError &&
                e.code === 'P2002'
            ) {
                throw new InternalServerErrorException('Verification Token registration failed');
            } else if (e instanceof InternalServerErrorException) {
                throw e;
            } else {
                throw new InternalServerErrorException('Verification Token registration failed');
            }
        }
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
