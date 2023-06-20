import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { VerificationTokenService } from './verification-token.service';

@Module({
    imports: [PrismaModule],
    providers: [VerificationTokenService],
    exports: [VerificationTokenService],
})
export class VerificationTokenModule {}
