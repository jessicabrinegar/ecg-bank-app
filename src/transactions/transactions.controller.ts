import { Controller, Get } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('accounts')
export class TransactionsController {
    constructor(private transactionService: TransactionsService) {}

    @Get('/:id/transactions')
    getAllFromAccount(id: string) {
        return this.transactionService.getAllFromAccount(id);
    }
}
