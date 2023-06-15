import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { PasswordFilter } from './filter/password.filter';
import { ZodFilter } from './filter/zod.filter';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { ApiModule } from './modules/api.module';

export async function bootstrap() {
    const app = await NestFactory.create(ApiModule);
    const configService = app.get(ConfigService);
    const globalPrefix = 'api';
    const host = '0.0.0.0';
    const port = configService.get<number>('PORT') || 3000;
    const frontend_url = configService.get<string>('FRONTEND_URL');
    const secret = configService.get<string>('SECRET');
    app.enableCors({
        credentials: true,
        origin: frontend_url || 'http://localhost:4200',
    });
    app.setGlobalPrefix(globalPrefix);
    app.useGlobalFilters(new ZodFilter());
    app.useGlobalFilters(new PasswordFilter());
    app.useGlobalInterceptors(new LoggingInterceptor());
    app.use(cookieParser(secret));
    await app.listen(port);
    Logger.log(
        `🚀 Application is running on: http://${host}:${port}/${globalPrefix}`
    );
}
