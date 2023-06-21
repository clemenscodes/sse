import { HttpStatus, Injectable, Logger, PipeTransform } from '@nestjs/common';
import { checkPassword } from '@password';
import { userSchema, type UserSchema } from '@utils';
import { PasswordException } from '../../filter/password.filter';

@Injectable()
export class UserPipe<T extends UserSchema> implements PipeTransform<T> {
    constructor(public schema = userSchema) {}
    async transform(value: T) {
        this.schema.parseAsync(value);
        Logger.log('Validating...');
        const { password, username, email } = value;
        const result = await checkPassword(password, [username, email]);
        const { score } = result;
        if (score < 4) {
            Logger.log('Password not secure enough...');
            throw new PasswordException(
                HttpStatus.NOT_ACCEPTABLE,
                `Password is not secure enough, score: ${score}/4`,
                'Not Acceptable',
                result
            );
        }
        return value;
    }
}
