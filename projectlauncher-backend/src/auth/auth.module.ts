import { Module } from '@nestjs/common';
import { RegistrationSystemModule } from 'src/registration-system/registration-system.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    RegistrationSystemModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2m' },
    })
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
