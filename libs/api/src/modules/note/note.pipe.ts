import { Injectable, PipeTransform } from '@nestjs/common';
import { NoteSchema, noteSchema } from '@types';
import { sanitize } from 'isomorphic-dompurify';
import { Converter } from 'showdown';

@Injectable()
export class NotePipe<T extends NoteSchema> implements PipeTransform<T> {
    constructor(public schema = noteSchema) {}
    transform(value: T) {
        this.schema.parse(value);
        const converter = new Converter();
        const rawHTML = converter.makeHtml(value.content);
        const sanitizedValue = sanitize(rawHTML);
        value.content = sanitizedValue;
        return value;
    }
}
