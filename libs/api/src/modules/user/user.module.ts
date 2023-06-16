import { Module } from '@nestjs/common';
import { HashModule } from '../hash/hash.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UserService } from './user.service';

@Module({
    imports: [HashModule, PrismaModule],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
