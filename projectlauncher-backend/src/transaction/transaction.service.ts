import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userDonator, userProjectOwner } from 'src/registration-system/registration-system.model';
import { RegistrationSystemService } from 'src/registration-system/registration-system.service';
import { TransactionDTO, TransactionObjective, TransactionStatus, TransactionType, TransactionUserEntity } from './transaction.model';

@Injectable()
export class TransactionService {
    constructor(
        @InjectModel("transaction") private readonly transactionModel: Model<TransactionDTO>,
        @InjectModel('userDonator') private readonly userDonatorModel: Model<userDonator>,
        @InjectModel('userProjectOwner') private readonly userProjectOwnerModel: Model<userProjectOwner>
    ) { }

    async newUserDeposit(username: TransactionUserEntity, amount: number, paymentMethod: string, bank: string){
        return await this.newDeposit(username, amount, null, paymentMethod, bank)
    }

    async markUserDepositAsInProgress(username: TransactionUserEntity, internalTXID: string){
        const result = await this.updateTransaction(username, internalTXID, {status: TransactionStatus.InProgress})
        return result;
    }

    async updateUserTXRef(username: TransactionUserEntity, internalTXID: string, txRef: string){
        const result = await this.updateTransaction(username, internalTXID, {data:{"txRef": txRef}, status: TransactionStatus.InProgress});
        return result;
    }

    async updateTransaction(username: TransactionUserEntity, internalTXID: string, update: Object){
        let tx = undefined
        try{
            tx = await this.transactionModel.findById(internalTXID);
        }
        catch(err){
            throw new HttpException({
                "msg": "invalid internalTXID"
            }, HttpStatus.BAD_REQUEST);
        }
        if ( tx === null ){
            throw new HttpException({
                "msg": "internalTXID not found"
            }, HttpStatus.NOT_FOUND);
        }
        if ( tx.username.username !== username.username || tx.username.role !== username.role ){
            throw new HttpException({
                "msg": "this user has no permission on this internalTXID"
            }, HttpStatus.UNAUTHORIZED);
        }

        tx = this.updateField(tx, update);

        const result = await tx.save();
        return {
            status: "transaction update success",
            result
        }
    }

    updateField(obj: any, update: Object){
        for (const [key, value] of Object.entries(update)) {
            console.log(key, value)
            if ((typeof value) == (typeof {})) {
                this.updateField(obj[key], value)
            }
            else {
                obj[key] = value;
            }
        }
        return new this.transactionModel(obj);
    }
    
    async newTransfer(username: TransactionUserEntity, toUsername: string, objective: TransactionObjective, 
                        amount: number, recieveTXID: any, status: TransactionStatus = TransactionStatus.Pending) {
        return await this.newTransaction(new Date(), username, TransactionType.Transfer, amount, {
            toUsername,
            objective,
            recieveTXID
        }, status)
    }
    
    async newRecieve(username: TransactionUserEntity, fromUsername: string, objective: TransactionObjective, amount: number, 
                        transferTXID: any, status: TransactionStatus = TransactionStatus.Pending) {
        return await this.newTransaction(new Date(), username, TransactionType.Recieve, amount, {
            fromUsername,
            objective,
            transferTXID
        }, status)
    }

    async newDeposit(username: TransactionUserEntity, amount: number, txRef: string, paymentMethod: string, 
                        bank: string, status: TransactionStatus = TransactionStatus.Pending) {
        return await this.newTransaction(new Date(), username, TransactionType.Deposit, amount, {
            paymentMethod,
            bank,
            txRef
        }, status)
    }

    async newWithdraw(username: TransactionUserEntity, amount: number, txRef: string, paymentMethod: string, 
                        bank: string, status: TransactionStatus = TransactionStatus.Pending) {
        return await this.newTransaction(new Date(), username, TransactionType.Withdraw, amount, {
            paymentMethod,
            bank,
            txRef
        }, status)
    }

    async newTransaction(timestamp: Date, username: TransactionUserEntity, type: TransactionType, amount: number, 
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
