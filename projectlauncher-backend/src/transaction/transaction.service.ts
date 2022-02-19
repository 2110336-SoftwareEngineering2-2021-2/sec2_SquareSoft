import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TransactionDTO, TransactionObjective, TransactionStatus, TransactionType } from './transaction.model';

@Injectable()
export class TransactionService {
    constructor(@InjectModel("transaction") private readonly transactionModel: Model<TransactionDTO>) {}
    
    async newTransfer(username: any, toUsername: string, objective: TransactionObjective, amount: number, recieveTID: any) {
        return await this.newTransaction(new Date(), username, TransactionType.Transfer, amount, {
            toUsername,
            objective,
            recieveTID
        })
    }

    async newTransaction(timestamp: Date, username: any, type: TransactionType, amount: number, data: object, status: TransactionStatus = TransactionStatus.Pending) {
        try {
            const newTransaction = new this.transactionModel({timestamp, username, type, amount, status, data});
            const result = await newTransaction.save();
            return {
                "status": "registration successful",
                "transaction": result
            };
        }
        catch (err) {
            throw new HttpException({
                "msg": "transaction failed",
                "err": err
            }, HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }


}
