import { Injectable } from '@nestjs/common';
import { User } from '@prisma/api';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    create(user: User) {
        return this.prismaService.user.create({ data: user });
    }

    findAll() {
        return this.prismaService.user.findMany();
    }

    findOne(id: number) {
        return this.prismaService.user.findUnique({
            where: { id },
        });
    }

    update(id: number, user: User) {
        return this.prismaService.user.update({
            where: { id },
            data: { ...user },
        });
    }

    remove(id: number) {
        return this.prismaService.user.delete({ where: { id } });
    }
}
