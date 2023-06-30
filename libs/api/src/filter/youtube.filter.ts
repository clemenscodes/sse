import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

export class YouTubeException extends HttpException {
    constructor(public statusCode: HttpStatus, message: string) {
        super({ message }, statusCode);
    }
}

@Catch(YouTubeException)
export class YouTubeFilter implements ExceptionFilter {
    catch(exception: YouTubeException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const { statusCode, message } = exception;
        const res = { statusCode, message };
        response.status(exception.statusCode).json(res);
    }
}
