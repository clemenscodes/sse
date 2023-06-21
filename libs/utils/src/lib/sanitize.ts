import { sanitize } from 'isomorphic-dompurify';

export const sanitizeInput = async (input: string): Promise<string> => {
    const converter = new (await import('showdown')).Converter();
    const rawHTML = converter.makeHtml(input);
    const sanitizedValue = sanitize(rawHTML);
    return sanitizedValue;
};
