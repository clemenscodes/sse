import { Global, Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { NoteModule } from './note/note.module';
import { PrismaModule } from './prisma/prisma.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { SessionModule } from './session/session.module';
import { UserModule } from './user/user.module';
import { VerificationTokenModule } from './verification-token/verification-token.module';

@Global()
@Module({
    imports: [
        PrismaModule,
        UserModule,
        NoteModule,
        AuthModule,
        SessionModule,
        RefreshTokenModule,
        VerificationTokenModule,
        AccountModule,
    ],
    exports: [
        PrismaModule,
        UserModule,
        NoteModule,
        AuthModule,
        SessionModule,
        RefreshTokenModule,
        VerificationTokenModule,
        AccountModule,
    ],
})
export class ApiModule {}
