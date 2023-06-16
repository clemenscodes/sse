import * as z from 'zod';

export const noteSchema = z.object({
    content: z.string(),
    isPublic: z.boolean().default(false),
});

export type NoteSchema = z.infer<typeof noteSchema>;
