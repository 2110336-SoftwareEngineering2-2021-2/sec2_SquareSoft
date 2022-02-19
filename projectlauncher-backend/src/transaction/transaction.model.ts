import * as mongoose from 'mongoose';

export const TransactionSchema = new mongoose.Schema({
    timestamp: { type: Date, required: true},
    username: { type: String, required: true },
    type: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true },
    data: { type: Object }
});

export interface TransactionDTO{
    timestamp: string;
    username: string;
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
    Processing = "Processing", 
    Completed = "Completed", 
    Canceled = "Canceled", 
    Rejected = "Rejected"
}