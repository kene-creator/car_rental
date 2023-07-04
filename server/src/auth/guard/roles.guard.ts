import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true; // No roles specified, allow access
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const userRoles = user.roles; // Assuming the user object has a "roles" property

    const hasRole = () =>
      userRoles.some((role) => requiredRoles.includes(role));
    return user && userRoles && hasRole();
  }
}
