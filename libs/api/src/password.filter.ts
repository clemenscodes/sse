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
                statusCode,
                message,
                error,
                result,
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
        response.status(exception.statusCode).json(exception);
    }
}
