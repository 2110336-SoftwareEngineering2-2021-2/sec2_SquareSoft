import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { query } from 'express';
import { Model } from 'mongoose';
import { Role } from 'src/enums/role.enum';
import { project } from 'src/project/project.model';
import { userDonator, userProjectOwner } from 'src/registration-system/registration-system.model';
import { RegistrationSystemService } from 'src/registration-system/registration-system.service';
import { TransactionDTO, TransactionObjective, TransactionStatus, TransactionType, TransactionUserEntity, TransferType } from './transaction.model';

@Injectable()
export class TransactionService {
    constructor(
        @InjectModel("transaction") private readonly transactionModel: Model<TransactionDTO>,
        @InjectModel('userDonator') private readonly userDonatorModel: Model<userDonator>,
        @InjectModel('userProjectOwner') private readonly userProjectOwnerModel: Model<userProjectOwner>,
        @InjectModel('project') private readonly projectModel: Model<project>,
        private registrationSystemService: RegistrationSystemService,
    ) { }

    async newUserDeposit(username: TransactionUserEntity, amount: number, paymentMethod: string, bank: string){
        return await this.newDeposit(username, amount, null, paymentMethod, bank)
    }

    async updateUserDepositRef(username: TransactionUserEntity, internalTXID: string, txRef: string, status: TransactionStatus = TransactionStatus.InProgress){
        let tx = await this.getUserTransactionByTXID(username, internalTXID);
        this.validateTX(
            tx, 
            [TransactionType.Deposit],
            "TXRef can update in only Deposit transaction",
            [TransactionStatus.Pending, TransactionStatus.InProgress],
            "TXRef change is allow in only unfinished transaction"
        )
        await this.updateTransaction(username, internalTXID, {data:{"txRef": txRef}, status: status});
        return {
            "status": "update TXRef successful",
            "username": username,
            internalTXID,
            txRef
        }
    }

    async userCancelTX(username: TransactionUserEntity, internalTXID: string){
        let user = await this.registrationSystemService.findByUsername(username.username, username.role);
        let tx = await this.getUserTransactionByTXID(username, internalTXID);
        this.validateTX(
            tx, 
            [TransactionType.Deposit, TransactionType.Withdraw],
            "TXRef can reject in only Deposit and Withdraw transaction",
            [TransactionStatus.Pending],
            "transaction is not Pending"
        )
        tx = await this.updateTransaction(username, internalTXID, {status: TransactionStatus.Canceled});
        if ( tx.result.type === TransactionType.Withdraw ){
            user.balance += tx.result.amount;
            user.save();
        }
        return {
            "status": "deposit canceled",
            "username": username,
            internalTXID,
            "TXStatus": tx.result.status,
            "amount": tx.result.amount,
            "balance": user.balance
        }
    }

    async adminConfirmTX(username: TransactionUserEntity, internalTXID: string){
        let user = await this.registrationSystemService.findByUsername(username.username, username.role);
        let tx = await this.getUserTransactionByTXID(username, internalTXID);
        this.validateTX(
            tx, 
            [TransactionType.Deposit, TransactionType.Withdraw],
            "TX can confirm in only Deposit and Withdraw transaction",
            [TransactionStatus.InProgress],
            "transaction is not InProgress"
        )
        tx = await this.updateTransaction(username, internalTXID, {status: TransactionStatus.Completed});
        user.balance += tx.result.amount;
        user.save()
        return {
            "status": "deposit successful",
            "username": username,
            internalTXID,
            "TXStatus": tx.result.status,
            "amount": tx.result.amount,
            "balance": user.balance
        }
    }

    async adminRejectTX(username: TransactionUserEntity, internalTXID: string){
        let user = await this.registrationSystemService.findByUsername(username.username, username.role);
        let tx = await this.getUserTransactionByTXID(username, internalTXID);
        this.validateTX(
            tx, 
            [TransactionType.Deposit, TransactionType.Withdraw],
            "TX can reject in only Deposit and Withdraw transaction",
            [TransactionStatus.InProgress],
            "transaction is not InProgress"
        )
        tx = await this.updateTransaction(username, internalTXID, {status: TransactionStatus.Rejected});
        if ( tx.result.type === TransactionType.Withdraw ){
            user.balance += tx.result.amount;
            user.save();
        }
        return {
            "status": "deposit rejected",
            "username": username,
            internalTXID,
            "TXStatus": tx.result.status,
            "amount": tx.result.amount,
            "balance": user.balance
        }
    }

    async newUserWithdraw(username: TransactionUserEntity, amount: number){
        let user = await this.registrationSystemService.findByUsername(username.username, username.role);
        if (user.balance < amount){
            throw new HttpException({
                "msg": "insufficient balance to withdraw"
            }, HttpStatus.UNPROCESSABLE_ENTITY); 
        }
        let result = await this.newWithdraw(username, amount, null, "bank transfer", user.bankAccountBank);
        user.balance -= amount;
        user.save();
        return result; //await this.newDeposit(username, amount, null, user., bank)
    }

    async adminMarkTxAsInProgress(username: TransactionUserEntity, internalTXID: string){
        let tx = await this.getUserTransactionByTXID(username, internalTXID);
        this.validateTX(
            tx, 
            [TransactionType.Deposit, TransactionType.Withdraw],
            "TX can reject in only Deposit and Withdraw transaction",
            [TransactionStatus.Pending],
            "transaction is not Pending"
        )
        let result = await this.updateTransaction(username, internalTXID, {status: TransactionStatus.InProgress});
        return {
            "status": "tx is InProgress",
            "username": username,
            internalTXID,
            "txStatus": result.result.status
        }
    }

    async adminConfirmWithdraw(username: TransactionUserEntity, internalTXID: string, txRef: string){
        let tx = await this.getUserTransactionByTXID(username, internalTXID);
        this.validateTX(
            tx, 
            [TransactionType.Withdraw],
            "TXRef can update in only Withdraw transaction",
            [TransactionStatus.InProgress],
            "TXRef change is allow in only InProgress transaction"
        )
        await this.updateTransaction(username, internalTXID, {data:{"txRef": txRef}, status: TransactionStatus.Completed});
        return {
            "status": "withdraw successful",
            "username": username,
            internalTXID,
            txRef
        }
    }

    async userDonateProject(username: TransactionUserEntity, projectID: string, amount: number){
        let project = undefined
        try{
            project = await this.projectModel.findById(projectID);   
        }
        catch(err){
            throw new HttpException({
                "msg": "invalid projectID"
            }, HttpStatus.BAD_REQUEST);
        }
        if ( project === null ){
            throw new HttpException({
                "msg": "project not found"
            }, HttpStatus.NOT_FOUND);
        }
        let user = await this.registrationSystemService.findByUsername(username.username, username.role);
        if (user.balance < amount){
            throw new HttpException({
                "msg": "insufficient balance to donate"
            }, HttpStatus.UNPROCESSABLE_ENTITY); 
        }
        project.fundingMoneyStatus += amount;
        await project.save();
        user.balance -= amount;
        await user.save();
        let result = await this.newTransfer(username, amount, TransferType.Donate, projectID, TransactionStatus.Completed);
        return {
            "status": "donate successful",
            "username": username,
            "txResult": result
        }
    }

    validateTX(tx: any, types: Array<TransactionType>, typeErrorMsg: string, status: Array<TransactionStatus>, statusErrorMsg: string): boolean{
        for (let type of types){
            if (type === tx.type){
                for (let s of status){
                    if (s === tx.status){
                        return true
                    }
                }
                throw new HttpException({
                    "msg": statusErrorMsg
                }, HttpStatus.UNPROCESSABLE_ENTITY); 
            }
        }
        throw new HttpException({
            "msg": typeErrorMsg
        }, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    async getUserTransaction(username: TransactionUserEntity, limit: number = 10, type: TransactionType|null = null, status: TransactionStatus = null){
        let q = {'username': username}
        if (type){
            q["type"] = type;
        }
        if (status){
            q["status"] = status;
        }
        const result = await this.transactionModel.find(q).sort('-timestamp').limit(limit);
        return result
    }

    async getUnfinishedUserTX(limit: number = 10){
        const result = await this.transactionModel.find({
            $or:[
                {
                    type: TransactionType.Deposit, 
                    $or:[{status:TransactionStatus.Pending}, {status:TransactionStatus.InProgress}]
                }, {
                    type: TransactionType.Withdraw,
                    $or:[{status:TransactionStatus.Pending}, {status:TransactionStatus.InProgress}]
                }
            ],}).sort('+timestamp').limit(limit);
        return result
    }


    async getUserTransactionByTXID(username: TransactionUserEntity, internalTXID: string){
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
            }, HttpStatus.FORBIDDEN);
        }
        return tx;
    }

    async updateTransaction(username: TransactionUserEntity, internalTXID: string, update: Object){
        let tx = await this.getUserTransactionByTXID(username, internalTXID);
        tx = this.updateField(tx, update);

        const result = await tx.save();
        return {
            status: "transaction update success",
            result
        }
    }

    updateField(obj: any, update: Object){
        for (const [key, value] of Object.entries(update)) {
            //console.log(key, value)
            if ((typeof value) == (typeof {})) {
                this.updateField(obj[key], value)
            }
            else {
                obj[key] = value;
            }
        }
        return new this.transactionModel(obj);
    }
    
    async newTransfer(username: TransactionUserEntity, amount: number,
                        transferType: TransferType, toProjectID: string|null = null, 
                        status: TransactionStatus = TransactionStatus.Pending) {
        let data = {}
        data["transferType"] = transferType;
        if (transferType === TransferType.Donate){
            data["data"] = {toProjectID};
        }
        return await this.newTransaction(new Date(), username, TransactionType.Transfer, amount, data, status)
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
