import {
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/api';
import { Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { CookieService } from '../cookie/cookie.service';
import { PrismaService } from '../prisma/prisma.service';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { SessionService } from '../session/session.service';

@Injectable()
export class UserService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly authService: AuthService,
        private readonly sessionService: SessionService,
        private readonly refreshTokenService: RefreshTokenService,
        private readonly cookieService: CookieService
    ) {}

    async register(data: Prisma.UserCreateInput, res: Response) {
        const { password } = data;
        const { username } = await this.create(data);
        await this.login(username, password, res);
    }

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
                    id: false,
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
        password: User['password'],
        res: Response,
        cookies?: string
    ): Promise<{
        message: string;
        email?: User['email'];
        name?: User['username'];
    }> {
        const sessionValid = await this.cookieService.checkSessionCookie(
            res,
            cookies
        );
        if (sessionValid) {
            res.status(HttpStatus.OK);
            return { message: 'User already logged in' };
        }
        const refresh = await this.cookieService.checkRefreshTokenCookie(
            res,
            cookies
        );
        if (refresh) {
            res.status(HttpStatus.OK);
            return { message: 'Session expired, but valid refresh token!' };
        }
        const user = await this.findByUsername(username);
        const passwordMatch = await this.authService.verifyPassword(
            user.password,
            password
        );
        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const { email, username: name, id } = user;
        const sessionToken = await this.sessionService.create(id);
        let refreshToken = await this.refreshTokenService.getUserRefreshToken(
            id
        );
        if (!refreshToken) {
            refreshToken = await this.refreshTokenService.create(id);
        }
        const valid = await this.refreshTokenService.checkRefreshToken(
            refreshToken.refreshToken
        );
        if (!valid) {
            await this.refreshTokenService.delete(refreshToken.id);
            refreshToken = await this.refreshTokenService.create(id);
        }
        this.cookieService.setCookies(sessionToken, refreshToken, res);
        res.status(HttpStatus.OK);
        return { message: 'Successfully logged in!', email, name };
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
