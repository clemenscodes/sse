import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';

export class JwtException extends UnauthorizedException {
    constructor(message: string) {
        super({ message });
    }
}

@Catch(JwtException)
export class JwtFilter implements ExceptionFilter {
    catch(exception: JwtException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const { message } = exception;
        const res = { status, message };
        response.status(status).json(res);
    }
}
