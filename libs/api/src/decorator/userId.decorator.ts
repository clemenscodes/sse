import {
    createParamDecorator,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/api';
import { Request } from 'express';

export const UserId = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): User['id'] => {
        const request = ctx.switchToHttp().getRequest<Request>();
        const { user: jwt } = request;
        if (!jwt) {
            throw new UnauthorizedException();
        }
        const { sub: userId } = jwt;
        return userId;
    }
);
