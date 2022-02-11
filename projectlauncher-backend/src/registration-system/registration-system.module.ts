import { Module } from '@nestjs/common';
import { RegistrationSystemController } from './registration-system.controller';
import { RegistrationSystemService } from './registration-system.service';

@Module({
  controllers: [RegistrationSystemController],
  providers: [RegistrationSystemService]
})
export class RegistrationSystemModule {}
