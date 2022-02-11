import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegistrationSystemController } from './registration-system.controller';
import { UserDonatorSchema } from './registration-system.model';
import { RegistrationSystemService } from './registration-system.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'userDonator', schema: UserDonatorSchema}]), ],
  controllers: [RegistrationSystemController],
  providers: [RegistrationSystemService]
})
export class RegistrationSystemModule {}
