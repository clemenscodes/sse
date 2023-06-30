import * as z from 'zod';
import { passwordSchema } from './passwordSchema';

export const resetPasswordSchema = z.object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
});

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
