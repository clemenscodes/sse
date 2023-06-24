import * as z from 'zod';
import { contentSchema } from './contentSchema';
import { youtubeSchema } from './youtubeSchema';

export const noteSchema = z.object({
    content: contentSchema,
    isPublic: z.boolean().default(false),
    attachment: youtubeSchema.or(z.literal('')),
});

export type NoteSchema = z.infer<typeof noteSchema>;
