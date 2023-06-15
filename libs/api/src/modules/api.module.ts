import { Global, Module, ModuleMetadata } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { CookieModule } from './cookie/cookie.module';
import { HashModule } from './hash/hash.module';
import { JwtGuard } from './jwt/jwt.guard';
import { JwtModule } from './jwt/jwt.module';
import { NoteModule } from './note/note.module';
import { PrismaModule } from './prisma/prisma.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { SessionModule } from './session/session.module';
import { UserModule } from './user/user.module';
import { VerificationTokenModule } from './verification-token/verification-token.module';

const modules: ModuleMetadata['imports'] = [
    ConfigModule.forRoot({
        cache: true,
        isGlobal: true,
        expandVariables: true,
        envFilePath: ['.env', '.env.skeleton'],
    }),
    PrismaModule,
    UserModule,
    NoteModule,
    AuthModule,
    SessionModule,
    RefreshTokenModule,
    VerificationTokenModule,
    AccountModule,
    CookieModule,
    JwtModule,
    HashModule,
];

@Global()
@Module({
    imports: [...modules],
    exports: [...modules],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtGuard,
        },
    ],
})
export class ApiModule {}
