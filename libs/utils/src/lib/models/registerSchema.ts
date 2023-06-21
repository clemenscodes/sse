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
    })
    .refine(
        async (data) => {
            const { password, username, email } = data;
            const checkPassword = (await import('@password')).checkPassword;
            const result = await checkPassword(password, [username, email]);
            return result.score === 4;
        },
        ({ password, email, username }) => {
            return {
                message: `Password is not secure enough, score: ${import(
                    '@password'
                )
                    .then((mod) =>
                        mod.checkPassword(password, [email, username])
                    )
                    .then((password) => password)}/4`,
                path: ['passwordConfirm'],
            };
        }
    );

export type RegisterSchema = z.infer<typeof registerSchema>;
