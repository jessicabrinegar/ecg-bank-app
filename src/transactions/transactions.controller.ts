import { Controller, Get, Post, Body, Param, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionDto } from './dtos/transaction.dto';
import { AccountsService } from 'src/accounts/accounts.service';
import { randomUUID } from 'crypto';
import { isUUID } from 'src/utils/uuid.util';
import { Transaction } from './models/transaction.model';

@Controller('accounts/:id/transactions')
export class TransactionsController {
    constructor(
        private transactionService: TransactionsService,
        private accountService: AccountsService
        ) {}

    @Get()
    findAllInAccount(@Param('id') id: string) {
        if(!isUUID(id)) {
            throw new NotAcceptableException('The account ID must be a 36-character UUID');
        }
        return this.transactionService.findAllInAccount(id);
    }

    @Post('add')
    deposit(@Param('id') id: string, @Body() body: TransactionDto) {
        if(!isUUID(id)) {
            throw new NotAcceptableException('The account ID must be a 36-character UUID');
        }
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
    withdraw(@Param('id') id: string, @Body() body: TransactionDto) {
        if(!isUUID(id)) {
            throw new NotAcceptableException('The account ID must be a 36-character UUID');
        }
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
    send(@Param('id') id: string, @Body() body: TransactionDto) {
        if(!isUUID(id)) {
            throw new NotAcceptableException('The account ID must be a 36-character UUID');
        }
        this.accountService.withdraw(id, body.amount_money.amount);
        this.accountService.deposit(body.target_account_id, body.amount_money.amount);
        const transaction: Transaction = {
            id: randomUUID(),
            ...body,
            account_id: id,
        };
        return this.transactionService.send(transaction);
    }
}
