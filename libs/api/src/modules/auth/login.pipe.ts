import { Injectable, PipeTransform } from '@nestjs/common';
import { loginSchema, type LoginSchema } from '@utils';

@Injectable()
export class LoginPipe<T extends LoginSchema> implements PipeTransform<T> {
    constructor(public schema = loginSchema) {}
    transform(value: T) {
        this.schema.parse(value);
        return value;
    }
}
