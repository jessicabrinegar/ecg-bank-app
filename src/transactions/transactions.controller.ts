import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionDto } from './dtos/transaction.dto';
import { AccountsService } from 'src/accounts/accounts.service';
import { randomUUID } from 'crypto';
import { Transaction } from './models/transaction.model';

@Controller('accounts/:id/transactions')
export class TransactionsController {
    constructor(
        private transactionService: TransactionsService,
        private accountService: AccountsService
        ) {}

    @Get()
    getAllFromAccount(@Param('id') id: string) {
        return this.transactionService.getAllFromAccount(id);
    }

    @Post('add')
    depositMoney(@Param('id') id: string, @Body() body: TransactionDto) {
        this.accountService.addMoney(id, body.amount_money.amount);
        const transaction: Transaction = {
            id: randomUUID(),
            target_account_id: null,
            ...body,
            account_id: id,
        };
        return this.transactionService.depositMoney(transaction);
    }

    @Post('withdraw')
    withdrawMoney(@Param('id') id: string, @Body() body: TransactionDto) {
        this.accountService.removeMoney(id, body.amount_money.amount);
        const transaction: Transaction = {
            id: randomUUID(),
            target_account_id: null,
            ...body,
            account_id: id,
        };
        return this.transactionService.withdrawMoney(transaction);
    }

    @Post('send')
    sendMoney(@Param('id') id: string, @Body() body: TransactionDto) {
        this.accountService.removeMoney(id, body.amount_money.amount);
        this.accountService.addMoney(body.target_account_id, body.amount_money.amount);
        const transaction: Transaction = {
            id: randomUUID(),
            ...body,
            account_id: id,
        };
        return this.transactionService.sendMoney(transaction);
    }
}
