import { Injectable } from '@nestjs/common';
import { User } from '@prisma/api';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    create(user: User) {
        return this.prismaService.user.create({
            data: user,
            select: {
                email: true,
                username: true,
                password: false,
            },
        });
    }

    findAll() {
        return this.prismaService.user.findMany({
            select: {
                email: true,
                username: true,
                password: false,
            },
        });
    }

    findOne(id: number) {
        return this.prismaService.user.findUnique({
            where: { id },
            select: {
                email: true,
                username: true,
                password: false,
            },
        });
    }

    update(id: number, user: User) {
        return this.prismaService.user.update({
            where: { id },
            data: { ...user },
            select: {
                email: true,
                username: true,
                password: false,
            },
        });
    }

    remove(id: number) {
        return this.prismaService.user.delete({
            where: { id },
            select: {
                email: true,
                username: true,
                password: false,
            },
        });
    }
}
