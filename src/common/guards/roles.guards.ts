// src/common/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { Role } from 'src/users/user.entity';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const request = context.switchToHttp().getRequest();
    const user = request.user;


    console.log('AuthGuard request.user:', request.user);
    console.log('requiredRoles:', requiredRoles);
    console.log('user:', user);

    if (!requiredRoles) return true;



    if (!user) {
      return false;
    }

    return requiredRoles.includes(user?.role);
  }
}
