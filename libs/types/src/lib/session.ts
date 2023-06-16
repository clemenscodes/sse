import { User } from '@prisma/api';

export type UserSession = {
    username: User['username'];
    id: User['id'];
};
