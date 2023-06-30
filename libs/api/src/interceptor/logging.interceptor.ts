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
    private readonly logger = new Logger(LoggingInterceptor.name);
    intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Observable<unknown> {
        const now = Date.now();
        const req = context.switchToHttp().getRequest();
        const { url, method, body: unparsedBody } = req;
        this.logger.debug(`${method} ${url}`);
        if ('password' in unparsedBody) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...body } = unparsedBody;
            this.logger.debug(`Body: ${JSON.stringify(body)}`);
        } else {
            this.logger.debug(`Body: ${JSON.stringify(unparsedBody)}`);
        }
        return next
            .handle()
            .pipe(
                tap(() =>
                    this.logger.log(`Processed in ${Date.now() - now} ms`)
                )
            );
    }
}
