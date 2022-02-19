import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionController } from './transaction.controller';
import { TransactionSchema } from './transaction.model';
import { TransactionService } from './transaction.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'transaction', schema: TransactionSchema }]),],
  controllers: [TransactionController],
  providers: [TransactionService]
})
export class TransactionModule {}
