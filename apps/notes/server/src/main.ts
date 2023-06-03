import { ApiModule } from '@api';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
    const app = await NestFactory.create(ApiModule);
    const globalPrefix = 'api';
    const host = '0.0.0.0';
    app.setGlobalPrefix(globalPrefix);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    Logger.log(
        `🚀 Application is running on: http://${host}:${port}/${globalPrefix}`
    );
}

bootstrap();
