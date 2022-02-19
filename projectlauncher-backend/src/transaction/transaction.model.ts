import * as mongoose from 'mongoose';

export const TransactionSchema = new mongoose.Schema({
    timestamp: { type: Date, required: true},
    username: { type: String, required: true },
    type: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true }
});

export interface TransactionDTO{
    timestamp: string;
    username: string;
    type: string; // transfer, recieve, deposit, withdraw, fee
    status: string; // pending, processing, completed, canceled, rejected
    data: object;
    /*
    transfer: {
        toUsername: string,
        for: [donate, ],
        recieveTID: id
    }
    recieve: {
        fromUsername: string,
        for: [getDonation, ],
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