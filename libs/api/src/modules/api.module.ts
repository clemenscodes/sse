import { Global, Module, ModuleMetadata } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { CookieModule } from './cookie/cookie.module';
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
];

@Global()
@Module({
    imports: [...modules],
    exports: [...modules],
})
export class ApiModule {}
