import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
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
        Logger.log({ res });
        response.status(exception.statusCode).json(res);
    }
}
