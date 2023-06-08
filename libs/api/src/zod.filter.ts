import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
} from '@nestjs/common';
import { ZodError } from 'zod';

@Catch(ZodError)
export class ZodFilter implements ExceptionFilter {
    catch(exception: ZodError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        response.status(HttpStatus.NOT_ACCEPTABLE).json({
            statusCode: HttpStatus.NOT_ACCEPTABLE,
            message: 'Validation failed',
            errors: exception.errors,
        });
    }
}
