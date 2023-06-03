import { Global, Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Global()
@Module({
    imports: [PrismaModule, UserModule],
    exports: [PrismaModule, UserModule],
})
export class ApiModule {}
