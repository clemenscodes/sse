import * as z from 'zod';
import { emailSchema } from './emailSchema';
import { passwordSchema } from './passwordSchema';
import { usernameSchema } from './usernameSchema';

export const registerSchema = z
    .object({
        username: usernameSchema,
        email: emailSchema,
        password: passwordSchema,
        passwordConfirm: z.string(),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: 'Passwords do not match',
        path: ['passwordConfirm'],
    });

export type RegisterSchema = z.infer<typeof registerSchema>;
