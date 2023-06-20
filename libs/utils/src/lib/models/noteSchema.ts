import { sanitize } from 'isomorphic-dompurify';
import { Converter } from 'showdown';
import * as z from 'zod';

export const noteSchema = z.object({
    content: z
        .string()
        .min(1, {
            message: 'Note can not be empty',
        })
        .transform((value) => {
            const converter = new Converter();
            const rawHTML = converter.makeHtml(value);
            const sanitizedValue = sanitize(rawHTML);
            return sanitizedValue;
        }),
    isPublic: z.boolean().default(false),
});

export type NoteSchema = z.infer<typeof noteSchema>;
