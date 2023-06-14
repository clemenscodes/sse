import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { Note, Prisma, User } from '@prisma/api';
import { NoteSchema } from '@types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NoteService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(note: NoteSchema) {
        try {
            const { isPublic, content, userId: id } = note;
            const createdNote = await this.prismaService.note.create({
                data: {
                    isPublic,
                    content,
                    user: {
                        connect: { id },
                    },
                },
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
                throw new InternalServerErrorException('Creating note failed');
            }
        }
    }

    async findAllByUserId(userId: User['id']) {
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
                throw new InternalServerErrorException(
                    'Failed to retrieve public notes'
                );
            }
        }
    }

    async searchPublicNotesByContent(content: Note['content']) {
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
                throw new InternalServerErrorException(
                    'Failed to search public notes'
                );
            }
        }
    }

    async findOne(id: Note['id']) {
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
                throw new InternalServerErrorException(
                    'Failed to retrieve note'
                );
            }
        }
    }

    async update(id: Note['id'], data: Prisma.NoteUpdateInput) {
        try {
            const updatedNote = await this.prismaService.note.update({
                where: { id },
                data,
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
                throw new InternalServerErrorException('Note update failed');
            }
        }
    }

    async remove(id: Note['id']) {
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
                throw new InternalServerErrorException('Failed to delete note');
            }
        }
    }
}
