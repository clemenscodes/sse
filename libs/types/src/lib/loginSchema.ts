import * as z from 'zod';
// import { passwordSchema } from './passwordSchema';
import { usernameSchema } from './usernameSchema';

export const loginSchema = z.object({
    username: usernameSchema,
    password: z.string().min(2),
});

export type LoginSchema = z.infer<typeof loginSchema>;
