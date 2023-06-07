import {
    CanActivate,
    ExecutionContext,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import { checkPassword } from '@utils';
import { Request } from 'express';
import { PasswordException } from './password.filter';

@Injectable()
export class PasswordGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const { password, username, email } = request.body;
        const result = await checkPassword(password, [username, email]);
        const { score } = result;

        if (score < 4) {
            throw new PasswordException(
                HttpStatus.NOT_ACCEPTABLE,
                `Password is not secure enough, score: ${score}/4`,
                'Not Acceptable',
                result
            );
        }

        return true;
    }
}
