import { Injectable, PipeTransform } from '@nestjs/common';
import { UsernameSchema, usernameSchema } from '@utils';

@Injectable()
export class UsernamePipe<T extends UsernameSchema>
    implements PipeTransform<T>
{
    constructor(public schema = usernameSchema) {}
    transform(value: T) {
        this.schema.parse(value);
        return value;
    }
}
