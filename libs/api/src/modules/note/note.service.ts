import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { Prisma, type Note, type User } from '@prisma/api';
import { type CreatedNote } from '@types';
import { type NoteSchema } from '@utils';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NoteService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(note: NoteSchema, userId: User['id']): Promise<CreatedNote> {
        try {
            const { isPublic, content } = note;
            const createdNote = await this.prismaService.note.create({
                data: {
                    isPublic,
                    content,
                    user: {
                        connect: { id: userId },
                    },
                },
                select: {
                    id: true,
                    content: true,
                    isPublic: true,
                    userId: false,
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

    async findById(id: Note['id'], userId: User['id']): Promise<CreatedNote> {
        try {
            const note = await this.prismaService.note.findUnique({
                where: { id },
                select: {
                    id: true,
                    content: true,
                    isPublic: true,
                    userId: true,
                },
            });
            if (!note) {
                throw new NotFoundException('Note not found');
            }
            const { userId: noteOwnerId, ...rest } = note;
            if (!note.isPublic && noteOwnerId !== userId) {
                throw new NotFoundException('Note not found');
            }
            return rest;
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

    async findAllByUserId(userId: User['id']) {
        try {
            const notes = await this.prismaService.note.findMany({
                where: { userId },
                select: {
                    id: false,
                    content: true,
                    isPublic: true,
                    userId: false,
                },
            });
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

    async searchPublicNotesByContent(
        content: Note['content']
    ): Promise<CreatedNote[]> {
        try {
            const notes = await this.prismaService.note.findMany({
                where: {
                    isPublic: true,
                    content: {
                        contains: content,
                    },
                },
                select: {
                    id: true,
                    content: true,
                    isPublic: true,
                    userId: false,
                },
            });
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
}
