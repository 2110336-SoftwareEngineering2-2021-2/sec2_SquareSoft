import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegistrationSystemController } from './registration-system.controller';
import { UserDonatorSchema, UserProjectOwnerSchema } from './registration-system.model';
import { RegistrationSystemService } from './registration-system.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'userDonator', schema: UserDonatorSchema}]), MongooseModule.forFeature([{name: 'userProjectOwner', schema: UserProjectOwnerSchema}])],
  controllers: [RegistrationSystemController],
  providers: [RegistrationSystemService],
  exports: [RegistrationSystemService]
})
export class RegistrationSystemModule {}
