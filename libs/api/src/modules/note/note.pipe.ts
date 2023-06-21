import { Injectable, PipeTransform } from '@nestjs/common';
import { noteSchema, type NoteSchema } from '@utils';
import { sanitize } from 'isomorphic-dompurify';
import { Converter } from 'showdown';

@Injectable()
export class NotePipe<T extends NoteSchema> implements PipeTransform<T> {
    constructor(public schema = noteSchema) {}
    async transform(value: T) {
        this.schema.parseAsync(value);
        const converter = new Converter();
        const rawHTML = converter.makeHtml(value.content);
        const sanitizedValue = sanitize(rawHTML);
        value.content = sanitizedValue;
        return value;
    }
}
