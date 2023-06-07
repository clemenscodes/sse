import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
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
        super(
            {
                message,
            },
            statusCode
        );
    }
}

@Catch(PasswordException)
export class PasswordFilter implements ExceptionFilter {
    catch(exception: PasswordException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const { statusCode, message, error, result } = exception;
        response.status(exception.statusCode).json({
            statusCode,
            message,
            error,
            result,
        });
    }
}
