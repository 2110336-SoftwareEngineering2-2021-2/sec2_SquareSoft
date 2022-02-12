import { Module } from '@nestjs/common';
import { RegistrationSystemModule } from 'src/registration-system/registration-system.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [RegistrationSystemModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
