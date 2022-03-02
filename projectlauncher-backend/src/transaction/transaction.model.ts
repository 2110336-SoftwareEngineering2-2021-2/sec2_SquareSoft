import { Type } from 'class-transformer';
import { IsEnum, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, IS_ALPHA, Min, Validate, ValidateNested } from 'class-validator';
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
        type: TransferType,
        data: {
            // Donate
            toProjectID: projectID
        }
    }
    recieve: {
        type: RecieveType,
        data: {
            // GetDonation
            fromUsername: TransactionUserEntity
        }
    }
    deposit: {
        paymentMethod: mobileBanking, bankTransfer, promptpay etc.,
        bank: string,
        txRef: string
    }
    deposit: {
        paymentMethod: mobileBanking, bankTransfer, promptpay etc.,
        bank: string,
        txRef: string
    }
    */
}

export enum TransferType{
    Donate = "Donate",
    UserTransfer = "UserTransfer"
}

export enum RecieveType{
    GetDonation = "GetDonation",
    UserRecieve = "UserRecieve"
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
    constructor(username: object = undefined){
        if(username){
            this.username = username["username"];
            this.role = username['role'];
        }
    }
}

export class TransactionUserDTO{
    @IsNotEmpty()
    @Type(() => TransactionUserEntity)
    @ValidateNested()
    username: TransactionUserEntity;
    

}

export class newUserDepositDTO {
    @IsNotEmpty()
    @IsNumber()
    @Min(0.01)
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

export class UpdateUserTXrefDTO extends UserTransactionAccessDTO{
    @IsNotEmpty()
    @IsUrl()
    txRef: string;
}

export class GetListDTO {
    @IsNumber()
    @IsOptional()
    limit: number;

    @IsEnum(TransactionType)
    @IsOptional()
    type: TransactionType;

    @IsEnum(TransactionStatus)
    @IsOptional()
    status: TransactionStatus;
}

export class NewUserWithdrawDTO extends TransactionUserDTO{
    @IsNotEmpty()
    @IsNumber()
    @Min(0.01)
    amount: number;
}

export class AdminMarkTxAsInProgressDTO{
    @IsNumber()
    @IsOptional()
    limit: number;
}

export class UserDonateProjectDTO extends NewUserWithdrawDTO{
    @IsNotEmpty()
    @IsString()
    projectID: string;
}