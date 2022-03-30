import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from 'src/project/project.model';
import { UserDonatorSchema, UserProjectOwnerSchema } from 'src/registration-system/registration-system.model';
import { RegistrationSystemModule } from 'src/registration-system/registration-system.module';
import { TransactionController } from './transaction.controller';
import { TransactionSchema } from './transaction.model';
import { TransactionService } from './transaction.service';
import { NotificationModule } from "src/notification/notification.module"
import { EmailModule } from "src/email/email.module"
import { ProjectModule } from 'src/project/project.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'transaction', schema: TransactionSchema }]),
    MongooseModule.forFeature([
      {name: 'userDonator', schema: UserDonatorSchema},
      {name: 'userProjectOwner', schema: UserProjectOwnerSchema},
      {name: 'project', schema: ProjectSchema}
    ]),
    RegistrationSystemModule,
    ProjectModule,
    NotificationModule,
    EmailModule
  ],
  controllers: [TransactionController],
  providers: [TransactionService]
})
export class TransactionModule {}
