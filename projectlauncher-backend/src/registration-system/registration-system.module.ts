import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegistrationSystemController } from './registration-system.controller';
import { AdminSchema, UserDonatorSchema, UserProjectOwnerSchema } from './registration-system.model';
import { RegistrationSystemService } from './registration-system.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'userDonator', schema: UserDonatorSchema},
      {name: 'userProjectOwner', schema: UserProjectOwnerSchema},
      {name: 'adminDB', schema: AdminSchema}
    ])
  ],
  controllers: [RegistrationSystemController],
  providers: [RegistrationSystemService],
  exports: [RegistrationSystemService]
})
export class RegistrationSystemModule {}
