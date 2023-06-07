import * as z from 'zod';

export const loginSchema = z.object({
    username: z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
