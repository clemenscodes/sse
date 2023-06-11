import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { VerificationTokenController } from './verification-token.controller';
import { VerificationTokenService } from './verification-token.service';

@Module({
    imports: [PrismaModule],
    controllers: [VerificationTokenController],
    providers: [VerificationTokenService],
    exports: [VerificationTokenService],
})
export class VerificationTokenModule {}
