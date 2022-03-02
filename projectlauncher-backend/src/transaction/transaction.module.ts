import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from 'src/project/project.model';
import { UserDonatorSchema, UserProjectOwnerSchema } from 'src/registration-system/registration-system.model';
import { RegistrationSystemModule } from 'src/registration-system/registration-system.module';
import { TransactionController } from './transaction.controller';
import { TransactionSchema } from './transaction.model';
import { TransactionService } from './transaction.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'transaction', schema: TransactionSchema }]),
    MongooseModule.forFeature([
      {name: 'userDonator', schema: UserDonatorSchema},
      {name: 'userProjectOwner', schema: UserProjectOwnerSchema},
      {name: 'project', schema: ProjectSchema}
    ]),
    RegistrationSystemModule
  ],
  controllers: [TransactionController],
  providers: [TransactionService]
})
export class TransactionModule {}
