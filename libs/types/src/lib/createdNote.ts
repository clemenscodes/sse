import { Note } from '@prisma/api';

export type CreatedNote = Pick<Note, 'id' | 'isPublic' | 'content'>;
