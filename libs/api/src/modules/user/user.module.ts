import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CookieModule } from '../cookie/cookie.module';
import { PrismaModule } from '../prisma/prisma.module';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';
import { SessionModule } from '../session/session.module';
import { UserService } from './user.service';

@Module({
    imports: [
        AuthModule,
        PrismaModule,
        SessionModule,
        RefreshTokenModule,
        CookieModule,
    ],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
