import { Controller, Get, Post, Body, NotAcceptableException } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { AccountsService } from 'src/accounts/accounts.service';
import { randomUUID } from 'crypto';
import { IsParamUUID } from 'src/utils/is-param-uuid.decorator';
import { Transaction } from './models/transaction.model';
import { TransactionDto } from './dtos/transaction.dto';

@Controller('accounts/:id/transactions')
export class TransactionsController {
    constructor(
        private transactionService: TransactionsService,
        private accountService: AccountsService
        ) {}

    @Get()
    findAllInAccount(@IsParamUUID() id: string) {
        this.accountService.findByID(id);
        return this.transactionService.findAllInAccount(id);
    }

    @Post('add')
    deposit(@IsParamUUID() id: string, @Body() body: TransactionDto) {
        this.accountService.deposit(id, body.amount_money.amount);
        const transaction: Transaction = {
            id: randomUUID(),
            target_account_id: null,
            ...body,
            account_id: id,
        };
        return this.transactionService.deposit(transaction);
    }

    @Post('withdraw')
    withdraw(@IsParamUUID() id: string, @Body() body: TransactionDto) {
        this.accountService.withdraw(id, body.amount_money.amount);
        const transaction: Transaction = {
            id: randomUUID(),
            target_account_id: null,
            ...body,
            account_id: id,
        };
        return this.transactionService.withdraw(transaction);
    }

    @Post('send')
    send(@IsParamUUID() id: string, @Body() body: TransactionDto) {
        const amount = body.amount_money.amount;
        if (amount < 1 || amount > 1000) {
            throw new NotAcceptableException('Amount sent must be between 1 and 1,000 USD.')
        }
        this.accountService.withdraw(id, amount);
        this.accountService.deposit(body.target_account_id, amount);
        const transaction: Transaction = {
            id: randomUUID(),
            ...body,
            account_id: id,
        };
        return this.transactionService.send(transaction);
    }
}
