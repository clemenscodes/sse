import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { PasswordFilter } from './filter/password.filter';
import { ZodFilter } from './filter/zod.filter';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { ApiModule } from './modules/api.module';

export async function bootstrap() {
    const app = await NestFactory.create(ApiModule);
    const globalPrefix = 'api';
    const host = '0.0.0.0';
    const port = process.env['PORT'] || 3000;
    app.setGlobalPrefix(globalPrefix);
    app.useGlobalFilters(new ZodFilter());
    app.useGlobalFilters(new PasswordFilter());
    app.useGlobalInterceptors(new LoggingInterceptor());
    app.use(cookieParser());
    await app.listen(port);
    Logger.log(
        `🚀 Application is running on: http://${host}:${port}/${globalPrefix}`
    );
}
