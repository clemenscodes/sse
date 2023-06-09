import { Global, Module } from '@nestjs/common';
import { NoteModule } from './note/note.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Global()
@Module({
    imports: [PrismaModule, UserModule, NoteModule],
    exports: [PrismaModule, UserModule, NoteModule],
})
export class ApiModule {}
