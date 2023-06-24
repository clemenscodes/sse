import * as z from 'zod';
import { contentSchema } from './contentSchema';
import { youtubeSchema } from './youtubeSchema';

export const noteSchema = z.object({
    content: contentSchema,
    isPublic: z.boolean().default(false),
    attachment: z.union([youtubeSchema, z.string().max(0)]),
});

export type NoteSchema = z.infer<typeof noteSchema>;
