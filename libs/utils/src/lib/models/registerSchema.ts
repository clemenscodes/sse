import * as z from 'zod';
import { checkPassword } from '../checkPassword';
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
    })
    .refine(
        (data) => {
            const { password, username, email } = data;
            const result = checkPassword(password, [username, email]);
            return result.score === 4;
        },
        ({ password, email, username }) => {
            return {
                message: `Password is not secure enough, score: ${
                    checkPassword(password, [email, username]).score
                }/4`,
                path: ['passwordConfirm'],
            };
        }
    );

export type RegisterSchema = z.infer<typeof registerSchema>;
