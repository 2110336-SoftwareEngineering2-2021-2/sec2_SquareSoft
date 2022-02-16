import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { }

@Injectable()
export class DonatorGuard extends AuthGuard("jwt") {
    constructor() {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const valid = await super.canActivate(context);
        if (!valid) throw new UnauthorizedException();
        const role = context.switchToHttp().getRequest().user.role;
        if (role != Role.Donator && role != Role.Admin) throw new ForbiddenException(); // check role in jwt
        return true
    }
}

@Injectable()
export class ProjectOwnerGuard extends AuthGuard("jwt") {
    constructor() {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const valid = await super.canActivate(context);
        if (!valid) throw new UnauthorizedException();
        const role = context.switchToHttp().getRequest().user.role;
        if (role != Role.ProjectOwner && role != Role.Admin) throw new ForbiddenException(); // check role in jwt
        return true
    }
}

@Injectable()
export class AdminGuard extends AuthGuard("jwt") {
    constructor() {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const valid = await super.canActivate(context);
        if (!valid) throw new UnauthorizedException();
        const role = context.switchToHttp().getRequest().user.role;
        if (role != Role.Admin) throw new ForbiddenException(); // check role in jwt
        return true
    }
}

@Injectable()
export class AllRoleGuard extends AuthGuard("jwt") {
    constructor() {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const valid = await super.canActivate(context);
        if (!valid) throw new UnauthorizedException();
        const role = context.switchToHttp().getRequest().user.role;
        if (role != Role.Donator && role != Role.ProjectOwner && role != Role.Admin) throw new ForbiddenException(); // check role in jwt
        return true
    }
}