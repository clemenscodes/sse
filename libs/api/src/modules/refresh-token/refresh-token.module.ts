import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SessionModule } from '../session/session.module';
import { RefreshTokenService } from './refresh-token.service';

@Module({
    imports: [SessionModule, PrismaModule],
    providers: [RefreshTokenService],
    exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
