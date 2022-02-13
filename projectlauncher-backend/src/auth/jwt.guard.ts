import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { AdminService } from "src/admin/admin.service"

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {}

@Injectable()
export class PasswordGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const password = context.switchToHttp().getRequest().headers.password
    if (password !== process.env.GUARD_PASSWORD) throw new UnauthorizedException()
    return true
  }
}

@Injectable()
export class AdminGuard extends AuthGuard("jwt") {
  constructor(private readonly adminService: AdminService) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const valid = await super.canActivate(context)
    if (!valid) throw new UnauthorizedException()
    const payload = context.switchToHttp().getRequest().user
    if (payload.role != "Admin") throw new ForbiddenException() // check role in jwt
    const admin = await this.adminService.getAdminById(context.switchToHttp().getRequest().user.userId)
    if (admin == null) throw new UnauthorizedException() // check if user exists
    return true
  }
}
