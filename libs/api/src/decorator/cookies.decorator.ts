import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Cookies = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const cookies = data ? request.cookies?.[data] : request.cookies;
        return JSON.stringify(cookies);
    }
);
