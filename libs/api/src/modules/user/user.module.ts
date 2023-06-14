import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UserService } from './user.service';

@Module({
    imports: [forwardRef(() => AuthModule), PrismaModule],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
