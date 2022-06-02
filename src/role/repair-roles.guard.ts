import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';
import { Model } from 'mongoose';
import { UserDocument } from '../users/schema/users.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class RepairGuard implements CanActivate {
    constructor(private reflector: Reflector,
        private UserService: UsersService) { }

    /*canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        console.log(requiredRoles)
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();  
        console.log(user)
        return requiredRoles.some((role) => user.roles?.includes(role));
    }*/

    canActivate(context: ExecutionContext): boolean {
        const { user } = context.switchToHttp().getRequest();
        if (user.roles == 'technician') return true
        else { return false }
    }
}