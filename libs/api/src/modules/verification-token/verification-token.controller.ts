import { Controller } from '@nestjs/common';
import { VerificationTokenService } from './verification-token.service';

@Controller('verification-token')
export class VerificationTokenController {
    constructor(
        private readonly verificationTokenService: VerificationTokenService
    ) {}
}
