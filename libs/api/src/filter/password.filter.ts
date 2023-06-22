import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { ZxcvbnResult } from '@zxcvbn-ts/core';
import { Response } from 'express';

export class PasswordException extends HttpException {
    constructor(
        public statusCode: HttpStatus,
        message: string,
        public error: string,
        public result: Omit<ZxcvbnResult, 'password'>
    ) {
        super({ message }, statusCode);
    }
}

@Catch(PasswordException)
export class PasswordFilter implements ExceptionFilter {
    catch(exception: PasswordException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const { statusCode, message, error, result } = exception;
        const res = { statusCode, message, error, result };
        Logger.log({ res });
        response.status(exception.statusCode).json(res);
    }
}
