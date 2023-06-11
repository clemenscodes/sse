import { Global, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { NoteModule } from './note/note.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Global()
@Module({
    imports: [PrismaModule, UserModule, NoteModule, AuthModule],
    exports: [PrismaModule, UserModule, NoteModule, AuthModule],
})
export class ApiModule {}
