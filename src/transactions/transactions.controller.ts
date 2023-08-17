import { Controller, Get, Post, Body, NotAcceptableException, Param, ParseUUIDPipe } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { AccountsService } from 'src/accounts/accounts.service';
import { SendDto, TransactionDto } from './models/transaction.dto';

@Controller('accounts/:id/transactions')
export class TransactionsController {
    constructor(
        private transactionService: TransactionsService,
        private accountService: AccountsService
        ) {}

    @Get()
    findAllInAccount(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.transactionService.findAllInAccount(id);
    }

    @Post('add')
    deposit(@Param('id', ParseUUIDPipe) id: string, @Body() body: TransactionDto) {
        this.accountService.updateBalance(id, body.amount_money.amount, 'deposit');
        return this.transactionService.newTransaction(id, body);
    }

    @Post('withdraw')
    withdraw(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: TransactionDto) {
        this.accountService.updateBalance(id, body.amount_money.amount, 'withdraw');
        return this.transactionService.newTransaction(id, body);
    }

    @Post('send')
    send(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: SendDto) {
        const amount = body.amount_money.amount;
        this.accountService.updateBalance(id, amount, 'withdraw');
        this.accountService.updateBalance(body.target_account_id, amount, 'deposit');
        return this.transactionService.newTransaction(id, body);
    }
}
