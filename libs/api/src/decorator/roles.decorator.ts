import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/api';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
