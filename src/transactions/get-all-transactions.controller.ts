import { Controller, Get } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class AllTransactionsController {
    constructor(private transactionService: TransactionsService) {}

    @Get()
    getAllTransactions() {
        return this.transactionService.getAllTransactions();
    }
}