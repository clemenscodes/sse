import * as z from 'zod';
import { contentSchema } from './contentSchema';
import { youtubeSchema } from './youtubeSchema';

export const noteSchema = z.object({
    content: contentSchema,
    isPublic: z.boolean().default(false),
    attachment: youtubeSchema.optional(),
});

export type NoteSchema = z.infer<typeof noteSchema>;
