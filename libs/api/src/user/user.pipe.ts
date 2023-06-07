import { HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { UserSchema, userSchema } from '@types';
import { checkPassword } from '@utils';
import { PasswordException } from '../password.filter';

@Injectable()
export class UserPipe<T extends UserSchema> implements PipeTransform<T> {
    constructor(public schema = userSchema) {}
    transform(value: T) {
        this.schema.parse(value);
        const { password, username, email } = value;
        const result = checkPassword(password, [username, email]);
        const { score } = result;
        if (score < 4) {
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
