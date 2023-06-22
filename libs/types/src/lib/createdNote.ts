import type { Attachment, Note } from '@prisma/api';

export type CreatedNote = Pick<Note, 'id' | 'isPublic' | 'content'> & {
    attachment: {
        videoId: Attachment['videoId'];
    } | null;
};
