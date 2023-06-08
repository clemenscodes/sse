import * as z from 'zod';
import { emailSchema } from './emailSchema';
import { passwordSchema } from './passwordSchema';
import { usernameSchema } from './usernameSchema';

export const userSchema = z.object({
    email: emailSchema,
    username: usernameSchema,
    password: passwordSchema,
});

export type UserSchema = z.infer<typeof userSchema>;
