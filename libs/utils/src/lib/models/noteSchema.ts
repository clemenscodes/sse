import * as z from 'zod';
import { contentSchema } from './contentSchema';

export const noteSchema = z.object({
    content: contentSchema,
    isPublic: z.boolean().default(false),
});

export type NoteSchema = z.infer<typeof noteSchema>;
