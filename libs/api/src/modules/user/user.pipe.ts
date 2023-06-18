import { HttpStatus, Injectable, Logger, PipeTransform } from '@nestjs/common';
import { checkPassword, userSchema, type UserSchema } from '@utils';
import { PasswordException } from '../../filter/password.filter';

@Injectable()
export class UserPipe<T extends UserSchema> implements PipeTransform<T> {
    constructor(public schema = userSchema) {}
    transform(value: T) {
        this.schema.parse(value);
        Logger.log('Validating...');
        const { password, username, email } = value;
        const result = checkPassword(password, [username, email]);
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
