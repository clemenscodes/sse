import * as z from 'zod';

export const usernameSchema = z
    .string()
    .min(2, {
        message: 'Username must be at least 2 characters.',
    })
    .max(20, {
        message: 'Username can not be longer than 20 characters.',
    })
    .regex(/^[a-zA-Z0-9_]+$/, {
        message: 'Only alphanumeric characters and underscores are allowed.',
    });

export type UsernameSchema = z.infer<typeof usernameSchema>;
