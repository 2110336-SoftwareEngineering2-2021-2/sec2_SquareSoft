import { Module,forwardRef } from '@nestjs/common';
import { RegistrationSystemModule } from '../../src/registration-system/registration-system.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { AdminGuard, ProjectOwnerGuard, NoRoleGuard, DonatorGuard ,AllRoleGuard } from "./jwt-auth.guard"

@Module({
  imports: [
    forwardRef(() => RegistrationSystemModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.signOptions.expiresIn },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    AdminGuard, ProjectOwnerGuard, NoRoleGuard, DonatorGuard ,AllRoleGuard
  ],
  controllers: [AuthController],
  exports: [AuthService,AdminGuard, ProjectOwnerGuard, NoRoleGuard, DonatorGuard ,AllRoleGuard]
})
export class AuthModule { }
