import { Controller, Get } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionDto } from './models/transaction.dto';
import { Transaction } from './models/transaction.entity';

@Controller('transactions')
export class AllTransactionsController {
    constructor(private transactionService: TransactionsService) {}

    @Get()
    async getAllTransactions(): Promise<Transaction[]> {
        return await this.transactionService.findAll();
    }
}