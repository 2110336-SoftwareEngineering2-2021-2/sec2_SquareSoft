import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TransactionDTO, TransactionObjective, TransactionStatus, TransactionType } from './transaction.model';

@Injectable()
export class TransactionService {
    constructor(@InjectModel("transaction") private readonly transactionModel: Model<TransactionDTO>) {}
    
    async newTransfer(username: any, toUsername: string, objective: TransactionObjective, 
                        amount: number, recieveTXID: any, status: TransactionStatus = TransactionStatus.Pending) {
        return await this.newTransaction(new Date(), username, TransactionType.Transfer, amount, {
            toUsername,
            objective,
            recieveTXID
        }, status)
    }
    
    async newRecieve(username: any, fromUsername: string, objective: TransactionObjective, amount: number, 
                        transferTXID: any, status: TransactionStatus = TransactionStatus.Pending) {
        return await this.newTransaction(new Date(), username, TransactionType.Recieve, amount, {
            fromUsername,
            objective,
            transferTXID
        }, status)
    }

    async newDeposit(username: any, amount: number, txid: string, paymentMethod: string, 
                        bank: string, status: TransactionStatus = TransactionStatus.Pending) {
        return await this.newTransaction(new Date(), username, TransactionType.Deposit, amount, {
            paymentMethod,
            bank,
            txid
        }, status)
    }

    async newWithdraw(username: any, amount: number, txid: string, paymentMethod: string, 
                        bank: string, status: TransactionStatus = TransactionStatus.Pending) {
        return await this.newTransaction(new Date(), username, TransactionType.Withdraw, amount, {
            paymentMethod,
            bank,
            txid
        }, status)
    }


    async newTransaction(timestamp: Date, username: any, type: TransactionType, amount: number, 
                            data: object, status: TransactionStatus = TransactionStatus.Pending) {
        try {
            const newTransaction = new this.transactionModel({timestamp, username, type, amount, status, data});
            const result = await newTransaction.save();
            return {
                "status": "new transaction pending",
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
