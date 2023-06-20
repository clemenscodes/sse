import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule as jwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { JwtGuard } from './jwt.guard';
import { JwtService } from './jwt.service';

@Module({
    imports: [
        jwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (
                configService: ConfigService
            ): Promise<JwtModuleOptions> => ({
                global: true,
                secret: configService.get<string>('SECRET'),
                signOptions: {
                    expiresIn: '1h',
                    algorithm: 'HS256',
                    header: {
                        alg: 'HS256',
                        typ: 'JWT',
                    },
                },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [JwtService, JwtGuard],
    exports: [JwtService, JwtGuard],
})
export class JwtModule {}
