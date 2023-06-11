import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/api';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly authService: AuthService
    ) {}

    async create(data: Prisma.UserCreateInput) {
        try {
            const { password } = data;
            const hashedPassword = await this.authService.hashPassword(
                password
            );
            data.password = hashedPassword;
            const createdUser = await this.prismaService.user.create({
                data,
                select: {
                    id: true,
                    email: true,
                    username: true,
                    password: false,
                },
            });
            if (!createdUser) {
                throw new InternalServerErrorException('Registration failed');
            }
            return createdUser;
        } catch (e) {
            if (
                e instanceof Prisma.PrismaClientKnownRequestError &&
                e.code === 'P2002'
            ) {
                throw new InternalServerErrorException('Registration failed');
            } else if (e instanceof InternalServerErrorException) {
                throw e;
            } else {
                throw new InternalServerErrorException('Registration failed');
            }
        }
    }

    async login(
        username: User['username'],
        password: User['password']
    ): Promise<{ email: User['email']; name: User['username'] }> {
        if (!username) {
            throw new BadRequestException('No username given');
        }
        const user = await this.findByUsername(username);
        try {
            const passwordMatch = await this.authService.verifyPassword(
                user.password,
                password
            );
            if (!passwordMatch) {
                throw new UnauthorizedException('Invalid credentials');
            }
        } catch (e) {
            console.error(e);
            throw new InternalServerErrorException(e);
        }
        const { email, username: name } = user;
        // TODO: create session, refresh token and set cookies
        return { email, name };
    }

    async findByEmail(email: User['email']) {
        try {
            const user = await this.prismaService.user.findUnique({
                where: { email },
                select: {
                    id: true,
                    email: true,
                    username: true,
                    password: false,
                },
            });
            if (!user) {
                throw new UnauthorizedException('Invalid credentials');
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

    async findByUsername(username: User['username']) {
        try {
            const user = await this.prismaService.user.findUnique({
                where: { username },
            });
            if (!user) {
                throw new UnauthorizedException('Invalid credentials');
            }
            return user;
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                throw new UnauthorizedException('Invalid credentials');
            } else if (e instanceof Prisma.PrismaClientValidationError) {
                throw new UnauthorizedException('Invalid credentials');
            } else {
                throw new UnauthorizedException('Invalid credentials');
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

    async findOne(id: User['id']) {
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

    async update(id: User['id'], data: Prisma.UserUpdateInput) {
        try {
            const updatedUser = await this.prismaService.user.update({
                where: { id },
                data,
                select: {
                    id: true,
                    email: true,
                    username: true,
                    password: false,
                },
            });
            if (!updatedUser) {
                throw new UnauthorizedException('Invalid credentials');
            }
            return updatedUser;
        } catch (e) {
            if (
                e instanceof Prisma.PrismaClientKnownRequestError &&
                e.code === 'P2002'
            ) {
                throw new InternalServerErrorException('User update failed');
            } else if (e instanceof Prisma.PrismaClientValidationError) {
                throw new UnauthorizedException('Invalid credentials');
            } else {
                throw new InternalServerErrorException('User update failed');
            }
        }
    }

    async remove(id: User['id']) {
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
                throw new UnauthorizedException('Invalid credentials');
            }
            return deletedUser;
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                throw new InternalServerErrorException('Failed to delete user');
            } else if (e instanceof Prisma.PrismaClientValidationError) {
                throw new UnauthorizedException('Invalid credentials');
            } else {
                throw new InternalServerErrorException('Failed to delete user');
            }
        }
    }
}
