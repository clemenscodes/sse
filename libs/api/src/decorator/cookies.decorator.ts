import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const SignedCookies = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const cookies = data
            ? request.signedCookies[data]
            : request.signedCookies;
        return JSON.stringify(cookies);
    }
);

export const Cookies = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const cookies = data ? request.cookies[data] : request.cookies;
        return JSON.stringify(cookies);
    }
);
