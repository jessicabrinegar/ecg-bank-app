import { Controller, Get } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionDto } from './models/transaction.dto';

@Controller('transactions')
export class AllTransactionsController {
    constructor(private transactionService: TransactionsService) {}

    @Get()
    getAllTransactions(): TransactionDto[] {
        return this.transactionService.findAll();
    }
}