import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Observable<unknown> {
        const now = Date.now();
        const req = context.switchToHttp().getRequest();
        const { rawHeaders, url, method, body: unparsedBody } = req;
        Logger.log(`Processing Request: ${method} ${url}`);
        Logger.log(`Headers: ${JSON.stringify(rawHeaders)}`);
        if ('password' in unparsedBody) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...body } = unparsedBody;
            Logger.log(`Body: ${JSON.stringify(body)}`);
        } else {
            Logger.log(`Body: ${JSON.stringify(unparsedBody)}`);
        }
        return next
            .handle()
            .pipe(tap(() => Logger.log(`Processed in ${Date.now() - now} ms`)));
    }
}
