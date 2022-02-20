import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IS_ALPHA, Validate, ValidateNested } from 'class-validator';
import * as mongoose from 'mongoose';
import { Role } from 'src/enums/role.enum';

export const TransactionSchema = new mongoose.Schema({
    timestamp: { type: Date, required: true},
    username: { type: Object, required: true },
    type: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true },
    data: { type: Object }
});

export interface TransactionDTO{
    timestamp: string;
    username: Object;
    type: string; // transfer, recieve, deposit, withdraw, fee
    status: string; // pending, processing, completed, canceled, rejected
    amount: number;
    data: object;
    /*
    transfer: {
        toUsername: string,
        objective: [donate, ],
        recieveTID: id
    }
    recieve: {
        fromUsername: string,
        objective: [getDonation, ],
        transferTID: id
    }
    deposit: {
        paymentMethod: mobileBanking, bankTransfer, promptpay etc.,
        bank: string,
        txid: string
    }
    deposit: {
        paymentMethod: mobileBanking, bankTransfer, promptpay etc.,
        bank: string,
        txid: string
    }
    */
}

export enum TransactionObjective {
    Donate = "Donate",
    GetDonation = "getDonation"
}

export enum TransactionType {
    Transfer = "Transfer", 
    Recieve = "Recieve", 
    Deposit = "Deposit", 
    Withdraw = "Withdraw", 
    Fee = "Fee"
}

export enum TransactionStatus {
    Pending = "Pending", 
    InProgress = "InProgress", 
    Completed = "Completed", 
    Canceled = "Canceled", 
    Rejected = "Rejected"
}

export class TransactionUserEntity{
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    @IsEnum(Role)
    role: Role;
}

export class TransactionUserDTO{
    @IsNotEmpty()
    @Type(() => TransactionUserEntity)
    @ValidateNested()
    username: TransactionUserEntity;
}

export class newUserDepositDTO extends TransactionUserDTO{
    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    paymentMethod: string;

    @IsNotEmpty()
    bank: string;
}

export class UserTransactionAccessDTO extends TransactionUserDTO{
    @IsNotEmpty()
    internalTXID: string;
}