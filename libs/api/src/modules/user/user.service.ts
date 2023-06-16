import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/api';
import { UserSchema } from '@types';
import { HashService } from '../hash/hash.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(
        private readonly hashService: HashService,
        private readonly prismaService: PrismaService
    ) {}

    async create(data: UserSchema) {
        try {
            const { password, username, email } = data;
            const [hashedPassword, salt] = await this.hashService.hashPassword(
                password
            );
            const createdUser = await this.prismaService.user.create({
                data: {
                    password: hashedPassword,
                    username,
                    email,
                    salt,
                    role: 'USER',
                },
                select: {
                    id: false,
                    email: true,
                    username: true,
                    password: false,
                    salt: false,
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

    async findById(id: User['id']) {
        try {
            const user = await this.prismaService.user.findUnique({
                where: { id },
                select: {
                    id: true,
                    email: true,
                    username: true,
                    password: false,
                    role: true,
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

    async findByIdCustom(id: User['id'], select: Prisma.UserSelect) {
        try {
            const user = await this.prismaService.user.findUnique({
                where: { id },
                select,
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
}
