import { Injectable, CanActivate, ExecutionContext, HttpException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService
    ) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles || requiredRoles.length <= 0) {
            return true;
        }

        const reqeust = context.switchToHttp().getRequest();

        // console.log(reqeust.user)

        try {
            const token = reqeust.headers.authorization.replace('Bearer ', '');
            // console.log(user['role'])

            const user = this.jwtService.verify(token);
            return requiredRoles?.includes(user['role']);
        } catch (err) {
            throw new HttpException("Please login.", 401);
        }

    }
}