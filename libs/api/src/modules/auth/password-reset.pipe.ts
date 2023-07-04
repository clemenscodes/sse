import { Injectable, PipeTransform } from '@nestjs/common';
import { resetPasswordSchema, type ResetPasswordSchema } from '@utils';

@Injectable()
export class PasswordResetPipe<T extends ResetPasswordSchema>
    implements PipeTransform<T>
{
    constructor(public schema = resetPasswordSchema) {}
    async transform(value: T) {
        this.schema.parseAsync(value);
        return value;
    }
}
