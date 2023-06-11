import { Injectable, PipeTransform } from '@nestjs/common';
import { LoginSchema, loginSchema } from '@types';

@Injectable()
export class LoginPipe<T extends LoginSchema> implements PipeTransform<T> {
    constructor(public schema = loginSchema) {}
    transform(value: T) {
        this.schema.parse(value);
        return value;
    }
}
