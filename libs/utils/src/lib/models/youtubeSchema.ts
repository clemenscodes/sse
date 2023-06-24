import * as z from 'zod';

const youtubeVideoIdRegex = /([-_A-Za-z0-9]{10}[AEIMQUYcgkosw048])/;

export const youtubeSchema = z
    .string()
    .url()
    .regex(youtubeVideoIdRegex, {
        message: 'Input must contain a valid YouTube video ID',
    })
    .transform((value) => {
        const match = value.match(youtubeVideoIdRegex);
        if (match) {
            const id = match[1];
            return id;
        }
        return value;
    });

export type YoutubeSchema = z.infer<typeof youtubeSchema>;
