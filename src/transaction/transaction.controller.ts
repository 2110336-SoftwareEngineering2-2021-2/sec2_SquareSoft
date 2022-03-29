import { Body, Controller, Get, Headers, Patch, Post, UseGuards,Request } from '@nestjs/common';
import { getUnpackedSettings } from 'http2';
import {AdminGuard, AllRoleGuard, DonPOGuard,ProjectOwnerGuard } from 'src/auth/jwt-auth.guard';
import { AdminMarkTxAsInProgressDTO, GetListDTO, newUserDepositDTO, NewUserWithdrawDTO, TransactionObjective, TransactionUserEntity, UpdateUserTXrefDTO, UserDonateProjectDTO, UserTransactionAccessDTO } from './transaction.model';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    // @Post('/transfer')
    // async transfer(@Body() body: any) {
    //     const result = await this.transactionService.newTransfer({username: req["user"]["username"], role: req["user"]["role"]}, body.toUsername, TransactionObjective.Donate, body.amount, null);
    //     return result;
    // }

    // @Post('/recieve')
    // async recieve(@Body() body: any) {
    //     const result = await this.transactionService.newRecieve({username: req["user"]["username"], role: req["user"]["role"]}, body.fromUsername, TransactionObjective.GetDonation, body.amount, null);
    //     return result;
    // }
    

    @Post('/newUserDeposit')
    @UseGuards(DonPOGuard)
    async newUserDeposit(@Body() body: newUserDepositDTO, @Request() req: Request) {
        // let username = await getUser(header.authorization.split(" ")[1])
        const result = await this.transactionService.newUserDeposit(new TransactionUserEntity({username: req["user"]["username"], role: req["user"]["role"]}), body.amount, body.paymentMethod, body.bank);
        return result;
    }

    @Patch('/updateUserDepositRef')
    @UseGuards(DonPOGuard)
    async updateUserDepositRef(@Body() body: UpdateUserTXrefDTO, @Request() req: Request) {
        const result = await this.transactionService.updateUserDepositRef(new TransactionUserEntity({username: req["user"]["username"], role: req["user"]["role"]}), body.internalTXID, body.txRef);
        return result;
    }

    @Patch('/userCancelTX')
    @UseGuards(DonPOGuard)
    async userCancelTX(@Body() body: UserTransactionAccessDTO, @Request() req: Request) {
        const result = await this.transactionService.userCancelTX(new TransactionUserEntity({username: req["user"]["username"], role: req["user"]["role"]}), body.internalTXID);
        return result;
    }

    @Patch('/adminConfirmDeposit')
    @UseGuards(AdminGuard)
    async adminConfirmDeposit(@Body() body: UserTransactionAccessDTO, @Request() req: Request) {
        const result = await this.transactionService.adminConfirmTX({username: req["user"]["username"], role: req["user"]["role"]}, body.internalTXID);
        return result;
    }

    @Patch('/adminRejectTX')
    @UseGuards(AdminGuard)
    async adminRejectTX(@Body() body: UserTransactionAccessDTO, @Request() req: Request) {
        const result = await this.transactionService.adminRejectTX({username: req["user"]["username"], role: req["user"]["role"]}, body.internalTXID);
        return result;
    }

    @Get('/getUserTransaction')
    @UseGuards(DonPOGuard)
    async getUserTransaction(@Body() body: GetListDTO, @Request() req: Request) {
        const result = await this.transactionService.getUserTransaction(new TransactionUserEntity({username: req["user"]["username"], role: req["user"]["role"]}), body.limit, body.type, body.status);
        return result;
    }

    @Get('/adminGetUnfinishedUserTX')
    @UseGuards(AdminGuard)
    async adminGetUnfinishedUserTX(@Body() body: AdminMarkTxAsInProgressDTO) {
        if (!body.limit){
            body.limit = 10;
        }
        const result = await this.transactionService.getUnfinishedUserTX(body.limit);
        return result;
    }

    @Get('/getUserBalance')
    @UseGuards(DonPOGuard)
    async getUserBalance(@Body() body: any, @Request() req: Request) {
        const result = await this.transactionService.getUserBalance(new TransactionUserEntity({username: req["user"]["username"], role: req["user"]["role"]}));
        return result;
    }

    @Post('/newUserWithdraw')
    @UseGuards(DonPOGuard)
    async newUserWithdraw(@Body() body: 
    NewUserWithdrawDTO, @Request() req: Request) {
        const result = await this.transactionService.newUserWithdraw(new TransactionUserEntity({username: req["user"]["username"], role: req["user"]["role"]}), body.amount);
        return result;
    }

    @Patch('/adminMarkTxAsInProgress')
    @UseGuards(AdminGuard)
    async adminMarkTxAsInProgress(@Body() body: UserTransactionAccessDTO, @Request() req: Request) {
        const result = await this.transactionService.adminMarkTxAsInProgress(new TransactionUserEntity({username: req["user"]["username"], role: req["user"]["role"]}), body.internalTXID);
        return result;
    }

    @Patch('/adminConfirmWithdraw')
    @UseGuards(AdminGuard)
    async adminConfirmWithdraw(@Body() body: UpdateUserTXrefDTO, @Request() req: Request) {
        const result = await this.transactionService.adminConfirmWithdraw(new TransactionUserEntity({username: req["user"]["username"], role: req["user"]["role"]}), body.internalTXID, body.txRef);
        return result;
    }

    @Post('/userDonateProject')
    @UseGuards(DonPOGuard)
    async userDonateProject(@Body() body: UserDonateProjectDTO, @Request() req: Request) {
        const result = await this.transactionService.userDonateProject(new TransactionUserEntity({username: req["user"]["username"], role: req["user"]["role"]}), body.projectID, body.amount);
        return result;
    }

    @Post('/projectOwnerWithdrawFromProject')
    @UseGuards(ProjectOwnerGuard)
    async projectOwnerWithdrawFromProject(@Body() body: UserDonateProjectDTO, @Request() req: Request) {
        const result = await this.transactionService.projectOwnerWithdrawFromProject(new TransactionUserEntity({username: req["user"]["username"], role: req["user"]["role"]}), body.projectID, body.amount);
        return result;
    }

    // @Post('/withdraw')
    // async withdraw(@Body() body: any) {
    //     const result = await this.transactionService.newWithdraw({username: req["user"]["username"], role: req["user"]["role"]}, body.amount, null, body.paymentMethod,  body.bank);
    //     return result;
    // }
}