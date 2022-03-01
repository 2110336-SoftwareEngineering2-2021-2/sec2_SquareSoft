import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/enums/role.enum';
import { RegistrationSystemService } from 'src/registration-system/registration-system.service';

@Injectable()
export class NoRoleGuard extends AuthGuard('jwt') { }

@Injectable()
export class DonatorGuard extends AuthGuard("jwt") {
    constructor(private readonly registrationSystemService: RegistrationSystemService) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const valid = await super.canActivate(context);
        if (!valid) throw new UnauthorizedException();

        // check role in jwt
        const payload = context.switchToHttp().getRequest().user;
        if (payload.role != Role.Donator && payload.role != Role.Admin) throw new ForbiddenException();

        // check if user exists
        const user = await this.registrationSystemService.findByID(payload._id, payload.role);
        if (!user || user.username != payload.username) throw new UnauthorizedException();

        return true
    }
}

@Injectable()
export class ProjectOwnerGuard extends AuthGuard("jwt") {
    constructor(private readonly registrationSystemService: RegistrationSystemService) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const valid = await super.canActivate(context);
        if (!valid) throw new UnauthorizedException();

        // check role in jwt
        const payload = context.switchToHttp().getRequest().user;
        if (payload.role != Role.ProjectOwner && payload.role != Role.Admin) throw new ForbiddenException();

        // check if user exists
        const user = await this.registrationSystemService.findByID(payload._id, payload.role);
        if (!user || user.username != payload.username) throw new UnauthorizedException();

        return true
    }
}

@Injectable()
export class AdminGuard extends AuthGuard("jwt") {
    constructor(private readonly registrationSystemService: RegistrationSystemService) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const valid = await super.canActivate(context);
        if (!valid) throw new UnauthorizedException();

        // check role in jwt
        const payload = context.switchToHttp().getRequest().user;
        if (payload.role != Role.Admin) throw new ForbiddenException();

        // check if user exists
        const user = await this.registrationSystemService.findByID(payload._id, payload.role);
        if (!user || user.username != payload.username) throw new UnauthorizedException();

        return true
    }
}

@Injectable()
export class AllRoleGuard extends AuthGuard("jwt") {
    constructor(private readonly registrationSystemService: RegistrationSystemService) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const valid = await super.canActivate(context);
        if (!valid) throw new UnauthorizedException();

        // check role in jwt
        const payload = context.switchToHttp().getRequest().user;
        if (payload.role != Role.Donator && payload.role != Role.ProjectOwner && payload.role != Role.Admin) throw new ForbiddenException();

        // check if user exists
        const user = await this.registrationSystemService.findByID(payload._id, payload.role);
        if (!user || user.username != payload.username) throw new UnauthorizedException();

        return true
    }
}