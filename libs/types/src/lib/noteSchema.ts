import * as z from 'zod';

export const noteSchema = z.object({
    content: z.string(),
    isPublic: z.boolean().default(false),
    userId: z.string().cuid({ message: 'userId is not a valid id' }),
});

export type NoteSchema = z.infer<typeof noteSchema>;
