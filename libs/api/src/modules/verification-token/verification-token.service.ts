import { Injectable } from '@nestjs/common';
import {SessionService} from "../session/session.service";
import {PrismaService} from "../prisma/prisma.service";
import {data} from "autoprefixer";

@Injectable()
export class VerificationTokenService {
    constructor(private readonly sessionService: SessionService,
                private readonly prismaService: PrismaService) {
    }

    async createToken(userId) {
        const token= this.sessionService.generateSessionToken();

        this.prismaService.verificationToken.create({
            data: {
                token,
                expires,
                user: { connect: { id: userId } },
            },
        });
        return token;
    }

    async findByVerificationToken(token) {
        try{
            const data = await this.prismaService.verificationToken.findUnique({
                where: {token},
            })
            return data;
        }catch (e) {
            console.log(e)
        }
    }
}
