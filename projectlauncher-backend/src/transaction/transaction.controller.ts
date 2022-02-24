import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { GetListDTO, newUserDepositDTO, NewUserWithdrawDTO, TransactionObjective, TransactionUserEntity, UpdateUserTXrefDTO, UserTransactionAccessDTO } from './transaction.model';
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

    @Patch('/updateUserDepositRef')
    async updateUserDepositRef(@Body() body: UpdateUserTXrefDTO) {
        const result = await this.transactionService.updateUserDepositRef(body.username, body.internalTXID, body.txRef);
        return result;
    }

    @Patch('/userCancelTX')
    async userCancelTX(@Body() body: UserTransactionAccessDTO) {
        const result = await this.transactionService.userCancelTX(body.username, body.internalTXID);
        return result;
    }

    @Patch('/adminConfirmDeposit')
    async adminConfirmDeposit(@Body() body: UserTransactionAccessDTO) {
        const result = await this.transactionService.adminConfirmTX(body.username, body.internalTXID);
        return result;
    }

    @Patch('/adminRejectTX')
    async adminRejectTX(@Body() body: UserTransactionAccessDTO) {
        const result = await this.transactionService.adminRejectTX(body.username, body.internalTXID);
        return result;
    }

    @Get('/getUserTransaction')
    async getUserTransaction(@Body() body: GetListDTO) {
        const result = await this.transactionService.getUserTransaction(body.username, body.limit, body.type, body.status);
        return result;
    }

    @Post('/newUserWithdraw')
    async newUserWithdraw(@Body() body: NewUserWithdrawDTO) {
        const result = await this.transactionService.newUserWithdraw(body.username, body.amount);
        return result;
    }

    @Patch('/adminMarkTxAsInProgress')
    async adminMarkTxAsInProgress(@Body() body: UserTransactionAccessDTO) {
        const result = await this.transactionService.adminMarkTxAsInProgress(body.username, body.internalTXID);
        return result;
    }

    @Patch('/adminConfirmWithdraw')
    async adminConfirmWithdraw(@Body() body: UpdateUserTXrefDTO) {
        const result = await this.transactionService.adminConfirmWithdraw(body.username, body.internalTXID, body.txRef);
        return result;
    }

    // @Post('/withdraw')
    // async withdraw(@Body() body: any) {
    //     const result = await this.transactionService.newWithdraw(body.username, body.amount, null, body.paymentMethod,  body.bank);
    //     return result;
    // }
}
