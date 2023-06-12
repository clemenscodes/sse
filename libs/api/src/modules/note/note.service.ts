import {
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { Note, Prisma } from '@prisma/api';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NoteService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(note: Note) {
        try {
            const createdNote = await this.prismaService.note.create({
                data: note,
            });
            if (!createdNote) {
                throw new InternalServerErrorException('Creating note failed');
            }
            return createdNote;
        } catch (e) {
            if (
                e instanceof Prisma.PrismaClientKnownRequestError &&
                e.code === 'P2002'
            ) {
                throw new InternalServerErrorException('Creating note failed');
            } else if (e instanceof InternalServerErrorException) {
                throw e;
            } else {
                Logger.error(e);
                throw new InternalServerErrorException('Creating note failed');
            }
        }
    }

    async findAll() {
        try {
            const notes = await this.prismaService.note.findMany();
            if (!(notes && notes.length)) {
                throw new NotFoundException('Notes not found');
            }
            return notes;
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                throw new InternalServerErrorException(
                    'Failed to retrieve notes'
                );
            } else if (e instanceof NotFoundException) {
                throw e;
            } else {
                Logger.error(e);
                throw new InternalServerErrorException(
                    'Failed to retrieve notes'
                );
            }
        }
    }

    async findAllByUserId(userId: number) {
        try {
            const notes = await this.prismaService.note.findMany({
                where: { userId },
            });
            if (!(notes && notes.length)) {
                throw new NotFoundException('No notes found for the user');
            }
            return notes;
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                throw new InternalServerErrorException(
                    'Failed to retrieve user notes'
                );
            } else if (e instanceof NotFoundException) {
                throw e;
            } else {
                Logger.error(e);
                throw new InternalServerErrorException(
                    'Failed to retrieve user notes'
                );
            }
        }
    }

    async findAllPublicNotes() {
        try {
            const notes = await this.prismaService.note.findMany({
                where: { isPublic: true },
            });
            if (!(notes && notes.length)) {
                throw new NotFoundException('No public notes found');
            }
            return notes;
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                throw new InternalServerErrorException(
                    'Failed to retrieve public notes'
                );
            } else if (e instanceof NotFoundException) {
                throw e;
            } else {
                Logger.error(e);
                throw new InternalServerErrorException(
                    'Failed to retrieve public notes'
                );
            }
        }
    }

    async searchPublicNotesByContent(content: string) {
        try {
            const notes = await this.prismaService.note.findMany({
                where: {
                    isPublic: true,
                    content: {
                        contains: content,
                    },
                },
            });
            if (!(notes && notes.length)) {
                throw new NotFoundException(
                    `No public notes found matching the search ${content}`
                );
            }
            return notes;
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                throw new InternalServerErrorException(
                    'Failed to search public notes'
                );
            } else if (e instanceof NotFoundException) {
                throw e;
            } else {
                Logger.error(e);
                throw new InternalServerErrorException(
                    'Failed to search public notes'
                );
            }
        }
    }

    async findOne(id: number) {
        try {
            const note = await this.prismaService.note.findUnique({
                where: { id },
            });
            if (!note) {
                throw new NotFoundException('Note not found');
            }
            return note;
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                throw new InternalServerErrorException(
                    'Failed to retrieve note'
                );
            } else if (e instanceof Prisma.PrismaClientValidationError) {
                throw new NotFoundException('Note not found');
            } else if (e instanceof NotFoundException) {
                throw e;
            } else {
                Logger.error(e);
                throw new InternalServerErrorException(
                    'Failed to retrieve note'
                );
            }
        }
    }

    async update(id: number, note: Note) {
        try {
            const updatedNote = await this.prismaService.note.update({
                where: { id },
                data: { ...note },
            });
            if (!updatedNote) {
                throw new NotFoundException('Note not found');
            }
            return updatedNote;
        } catch (e) {
            if (
                e instanceof Prisma.PrismaClientKnownRequestError &&
                e.code === 'P2002'
            ) {
                throw new InternalServerErrorException('Note update failed');
            } else if (e instanceof Prisma.PrismaClientValidationError) {
                throw new NotFoundException('Note not found');
            } else if (e instanceof NotFoundException) {
                throw e;
            } else {
                Logger.error(e);
                throw new InternalServerErrorException('Note update failed');
            }
        }
    }

    async remove(id: number) {
        try {
            const deletedNote = await this.prismaService.note.delete({
                where: { id },
            });
            if (!deletedNote) {
                throw new NotFoundException('Note not found');
            }
            return deletedNote;
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                throw new InternalServerErrorException('Failed to delete note');
            } else if (e instanceof Prisma.PrismaClientValidationError) {
                throw new NotFoundException('Note not found');
            } else if (e instanceof NotFoundException) {
                throw e;
            } else {
                Logger.error(e);
                throw new InternalServerErrorException('Failed to delete note');
            }
        }
    }
}
