import { Injectable, PipeTransform } from '@nestjs/common';
import { Schema } from 'zod';

@Injectable()
export class ZodPipe implements PipeTransform {
    constructor(private schema: Schema) {}
    transform(value: unknown) {
        this.schema.parse(value);
        return value;
    }
}
