import * as z from 'zod';

export const userSchema = z.object({
    email: z.string().email({ message: 'Email must be valid.' }),
    username: z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    password: z
        .string()
        .min(8, {
            message: 'Password must be at least 8 characters.',
        })
        .max(256, {
            message: 'Password can not be longer than 256 characters.',
        })
        .regex(/^(?=.*[a-z])/, {
            message: 'Password must contain at least one lowercase letter',
        })
        .regex(/^(?=.*[A-Z])/, {
            message: 'Password must contain at least one uppercase letter',
        })
        .regex(/^(?=.*\d)/, {
            message: 'Password must contain at least one digit',
        })
        .regex(/^(?=.*[@$!%*?&])/, {
            message:
                'Password must contain at least one special character from @$!%*?&',
        })
        .regex(/^[A-Za-z\d@$!%*?&]+$/, {
            message:
                'Password can only contain alphanumeric characters and @$!%*?&',
        }),
});

export type UserSchema = z.infer<typeof userSchema>;
