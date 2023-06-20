import * as z from 'zod';
import { usernameSchema } from './usernameSchema';

export const loginSchema = z.object({
    username: usernameSchema,
    password: z.string(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
