import * as z from 'zod';
import { useScoreStore } from '../hooks/use-score';
import { passwordSchema } from './passwordSchema';

export const resetPasswordSchema = z
    .object({
        password: passwordSchema,
        confirmPassword: passwordSchema,
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['passwordConfirm'],
    })
    .refine(
        async (data) => {
            const { password } = data;
            const checkPassword = (await import('@password')).checkPassword;
            const result = await checkPassword(password, []);
            return result.score === 4;
        },
        ({ password }) => {
            (async () => {
                const checkPassword = (await import('@password')).checkPassword;
                const result = await checkPassword(password, []);
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

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
