import * as z from 'zod';
import { emailSchema } from './emailSchema';

export const forgotPasswordSchema = z.object({
    email: emailSchema,
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
