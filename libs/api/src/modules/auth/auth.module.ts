import { Module } from '@nestjs/common';
import { CookieModule } from '../cookie/cookie.module';
import { HashModule } from '../hash/hash.module';
import { PrismaModule } from '../prisma/prisma.module';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';
import { SessionModule } from '../session/session.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [
        UserModule,
        SessionModule,
        RefreshTokenModule,
        CookieModule,
        HashModule,
        PrismaModule,
    ],
    providers: [AuthService],
    exports: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
