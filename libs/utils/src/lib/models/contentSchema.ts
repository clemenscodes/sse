import * as z from 'zod';
import { sanitizeInput } from '../sanitize';

export const contentSchema = z
    .string()
    .min(1, {
        message: 'Note can not be empty',
    })
    .transform(async (value) => await sanitizeInput(value));

export type ContentSchema = z.infer<typeof contentSchema>;
