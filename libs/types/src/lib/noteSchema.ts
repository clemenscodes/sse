import * as z from 'zod';

export const noteSchema = z.object({
    content: z.string(),
    isPublic: z.boolean().default(false),
    user: z.object({
        id: z.number().nonnegative(),
    }),
    userId: z.number().nonnegative(),
});

export type NoteSchema = z.infer<typeof noteSchema>;
