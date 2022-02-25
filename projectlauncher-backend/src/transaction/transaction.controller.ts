import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { AdminMarkTxAsInProgressDTO, GetListDTO, newUserDepositDTO, NewUserWithdrawDTO, TransactionObjective, TransactionUserDTO, TransactionUserEntity, UpdateUserTXrefDTO, UserDonateProjectDTO, UserTransactionAccessDTO } from './transaction.model';
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

    @Get('/adminGetUnfinishedUserTX')
    async adminGetUnfinishedUserTX(@Body() body: AdminMarkTxAsInProgressDTO) {
        if (!body.limit){
            body.limit = 10;
        }
        const result = await this.transactionService.getUnfinishedUserTX(body.limit);
        return result;
    }

    @Get('/getUserBalance')
    async getUserBalance(@Body() body: TransactionUserDTO) {
        const result = await this.transactionService.getUserBalance(body.username);
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

    @Post('/userDonateProject')
    async userDonateProject(@Body() body: UserDonateProjectDTO) {
        const result = await this.transactionService.userDonateProject(body.username, body.projectID, body.amount);
        return result;
    }

    // @Post('/withdraw')
    // async withdraw(@Body() body: any) {
    //     const result = await this.transactionService.newWithdraw(body.username, body.amount, null, body.paymentMethod,  body.bank);
    //     return result;
    // }
}
