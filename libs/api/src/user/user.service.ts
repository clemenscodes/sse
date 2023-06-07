import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/api';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(user: User) {
        try {
            return await this.prismaService.user.create({
                data: user,
                select: {
                    id: true,
                    email: true,
                    username: true,
                    password: false,
                },
            });
        } catch (e) {
            if (
                e instanceof Prisma.PrismaClientKnownRequestError &&
                e.code === 'P2002'
            ) {
                throw new InternalServerErrorException('Registration failed');
            } else {
                throw new InternalServerErrorException('Registration failed');
            }
        }
    }

    async findAll() {
        try {
            const users = await this.prismaService.user.findMany({
                select: {
                    id: true,
                    email: true,
                    username: true,
                    password: false,
                },
            });
            if (!(users && users.length)) {
                throw new NotFoundException('Users not found');
            }
            return users;
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                throw new InternalServerErrorException(
                    'Failed to retrieve users'
                );
            } else if (e instanceof NotFoundException) {
                throw e;
            } else {
                throw new InternalServerErrorException(
                    'Failed to retrieve users'
                );
            }
        }
    }

    async findOne(id: number) {
        try {
            const user = await this.prismaService.user.findUnique({
                where: { id },
                select: {
                    id: true,
                    email: true,
                    username: true,
                    password: false,
                },
            });
            if (!user) {
                throw new NotFoundException('User not found');
            }
            return user;
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                throw new InternalServerErrorException(
                    'Failed to retrieve user'
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

    async update(id: number, user: User) {
        try {
            const updatedUser = await this.prismaService.user.update({
                where: { id },
                data: { ...user },
                select: {
                    id: true,
                    email: true,
                    username: true,
                    password: false,
                },
            });
            if (!updatedUser) {
                throw new NotFoundException('User not found');
            }
            return updatedUser;
        } catch (e) {
            if (
                e instanceof Prisma.PrismaClientKnownRequestError &&
                e.code === 'P2002'
            ) {
                throw new InternalServerErrorException('User update failed');
            } else if (e instanceof Prisma.PrismaClientValidationError) {
                throw new NotFoundException('User not found');
            } else if (e instanceof NotFoundException) {
                throw e;
            } else {
                throw new InternalServerErrorException('User update failed');
            }
        }
    }

    async remove(id: number) {
        try {
            const deletedUser = await this.prismaService.user.delete({
                where: { id },
                select: {
                    id: true,
                    email: true,
                    username: true,
                    password: false,
                },
            });
            if (!deletedUser) {
                throw new NotFoundException('User not found');
            }
            return deletedUser;
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                throw new InternalServerErrorException('Failed to delete user');
            } else if (e instanceof Prisma.PrismaClientValidationError) {
                throw new NotFoundException('User not found');
            } else if (e instanceof NotFoundException) {
                throw e;
            } else {
                throw new InternalServerErrorException('Failed to delete user');
            }
        }
    }
}
