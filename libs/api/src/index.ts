import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import { LoggingInterceptor } from './logging.interceptor';
import { PasswordFilter } from './password.filter';
import { ZodFilter } from './zod.filter';

export * from './api.module';

export async function bootstrap() {
    const app = await NestFactory.create(ApiModule);
    const globalPrefix = 'api';
    const host = '0.0.0.0';
    app.setGlobalPrefix(globalPrefix);
    app.useGlobalFilters(new ZodFilter());
    app.useGlobalFilters(new PasswordFilter());
    app.useGlobalInterceptors(new LoggingInterceptor());
    const port = process.env['PORT'] || 3000;
    await app.listen(port);
    Logger.log(
        `🚀 Application is running on: http://${host}:${port}/${globalPrefix}`
    );
}
