import { Controller, Get, Post, Body } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionDto } from './dtos/transaction.dto';

@Controller('accounts')
export class TransactionsController {
    constructor(private transactionService: TransactionsService) {}

    @Get('/:id/transactions')
    getAllFromAccount(id: string) {
        return this.transactionService.getAllFromAccount(id);
    }

    @Post('/:id/transactions/add')
    depositMoney(@Body() body: TransactionDto) {
        return this.transactionService.depositMoney(body);
    }

    @Post('/:id/transactions/withdraw')
    withdrawMoney(@Body() body: TransactionDto) {
        return this.transactionService.withdrawMoney(body);
    }

    @Post('/:id/transactions/send')
    sendMoney(@Body() body: TransactionDto) {
        return this.transactionService.sendMoney(body);
    }
}
