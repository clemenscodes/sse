import * as z from 'zod';

export const passwordSchema = z
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
    });

export type PasswordSchema = z.infer<typeof passwordSchema>;
