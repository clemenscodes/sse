import * as z from 'zod';

export const usernameSchema = z.string().min(2, {
    message: 'Username must be at least 2 characters.',
});

export type UsernameSchema = z.infer<typeof usernameSchema>;
