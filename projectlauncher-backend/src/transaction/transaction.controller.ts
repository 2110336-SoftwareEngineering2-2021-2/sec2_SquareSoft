import { Body, Controller, Post } from '@nestjs/common';
import { TransactionObjective } from './transaction.model';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Post('/transfer')
    async transfer(@Body() body: any) {
        const result = await this.transactionService.newTransfer(body.username, body.toUsername, TransactionObjective.Donate, body.amount, null);
        return result;
    }

    @Post('/recieve')
    async recieve(@Body() body: any) {
        const result = await this.transactionService.newRecieve(body.username, body.fromUsername, TransactionObjective.GetDonation, body.amount, null);
        return result;
    }
}
