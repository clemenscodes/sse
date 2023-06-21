import * as z from 'zod';
import { useScoreStore } from '../hooks/use-score';
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
            (async () => {
                const checkPassword = (await import('@password')).checkPassword;
                const result = await checkPassword(password, [username, email]);
                useScoreStore.setState((state) => {
                    return {
                        ...state,
                        score: result.score,
                    };
                });
            })();
            const { score } = useScoreStore.getState();
            return {
                message: `Password is not secure enough, score: ${score}/4`,
                path: ['passwordConfirm'],
            };
        }
    );

export type RegisterSchema = z.infer<typeof registerSchema>;
