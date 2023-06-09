import { Injectable, PipeTransform } from '@nestjs/common';
import { NoteSchema, noteSchema } from '@types';

@Injectable()
export class NotePipe<T extends NoteSchema> implements PipeTransform<T> {
    constructor(public schema = noteSchema) {}
    transform(value: T) {
        this.schema.parse(value);
        return value;
    }
}
