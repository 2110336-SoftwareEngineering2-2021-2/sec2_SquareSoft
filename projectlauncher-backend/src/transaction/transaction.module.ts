import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDonatorSchema, UserProjectOwnerSchema } from 'src/registration-system/registration-system.model';
import { TransactionController } from './transaction.controller';
import { TransactionSchema } from './transaction.model';
import { TransactionService } from './transaction.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'transaction', schema: TransactionSchema }]),
    MongooseModule.forFeature([
      {name: 'userDonator', schema: UserDonatorSchema},
      {name: 'userProjectOwner', schema: UserProjectOwnerSchema}
    ])
  ],
  controllers: [TransactionController],
  providers: [TransactionService]
})
export class TransactionModule {}
