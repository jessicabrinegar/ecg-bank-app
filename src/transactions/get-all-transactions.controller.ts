import { Controller, Get } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from './models/transaction.model';

@Controller('transactions')
export class AllTransactionsController {
    constructor(private transactionService: TransactionsService) {}

    @Get()
    getAllTransactions(): Transaction[] {
        return this.transactionService.findAll();
    }
}