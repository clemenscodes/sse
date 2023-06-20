import * as z from 'zod';

export const emailSchema = z
    .string()
    .email({ message: 'Please provide a valid email.' });

export type EmailSchema = z.infer<typeof emailSchema>;
