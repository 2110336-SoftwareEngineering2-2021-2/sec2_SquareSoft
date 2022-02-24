import { Body, Controller, Patch, Post } from '@nestjs/common';
import { newUserDepositDTO, TransactionObjective, TransactionUserEntity, UpdateUserTXrefDTO, UserTransactionAccessDTO } from './transaction.model';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    // @Post('/transfer')
    // async transfer(@Body() body: any) {
    //     const result = await this.transactionService.newTransfer(body.username, body.toUsername, TransactionObjective.Donate, body.amount, null);
    //     return result;
    // }

    // @Post('/recieve')
    // async recieve(@Body() body: any) {
    //     const result = await this.transactionService.newRecieve(body.username, body.fromUsername, TransactionObjective.GetDonation, body.amount, null);
    //     return result;
    // }

    @Post('/newUserDeposit')
    async newUserDeposit(@Body() body: newUserDepositDTO) {
        const result = await this.transactionService.newUserDeposit(body.username, body.amount, body.paymentMethod, body.bank);
        return result;
    }

    @Patch('/markUserDepositAsInProgress')
    async markUserDepositAsInProgress(@Body() body: UserTransactionAccessDTO) {
        const result = await this.transactionService.markUserDepositAsInProgress(body.username, body.internalTXID);
        return result;
    }

    @Patch('/updateUserTXRef')
    async updateUserTXRef(@Body() body: UpdateUserTXrefDTO) {
        const result = await this.transactionService.updateUserTXRef(body.username, body.internalTXID, body.txRef);
        return result;
    }

    @Patch('/adminConfirmDeposit')
    async adminConfirmDeposit(@Body() body: UserTransactionAccessDTO) {
        const result = await this.transactionService.adminConfirmDeposit(body.username, body.internalTXID);
        return result;
    }

    // @Post('/withdraw')
    // async withdraw(@Body() body: any) {
    //     const result = await this.transactionService.newWithdraw(body.username, body.amount, null, body.paymentMethod,  body.bank);
    //     return result;
    // }
}
