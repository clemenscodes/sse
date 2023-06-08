import * as z from 'zod';

export const noteSchema = z.object({
    content: z.string(),
    isPublic: z.boolean().default(false),
    userId: z.number().nonnegative(),
});

export type NoteSchema = z.infer<typeof noteSchema>;
