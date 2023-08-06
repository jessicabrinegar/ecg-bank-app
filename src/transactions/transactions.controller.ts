import { Controller, Get, Post, Body, NotAcceptableException, Param, ParseUUIDPipe } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { AccountsService } from 'src/accounts/accounts.service';
import { TransactionDto } from './dtos/transaction.dto';
import { TransactionValidationPipe } from './pipes/transaction-validation.pipe';

@Controller('accounts/:id/transactions')
export class TransactionsController {
    constructor(
        private transactionService: TransactionsService,
        private accountService: AccountsService
        ) {}

    @Get()
    findAllInAccount(@Param('id', new ParseUUIDPipe()) id: string) {
        this.accountService.findById(id);
        return this.transactionService.findAllInAccount(id);
    }

    @Post('add')
    deposit(@Param('id', ParseUUIDPipe) id: string, @Body(TransactionValidationPipe) body: TransactionDto) {
        if (body.target_account_id) {
            body.target_account_id = null;
        }
        this.accountService.updateBalance(id, body.amount_money.amount, 'deposit');
        return this.transactionService.deposit(body);
    }

    @Post('withdraw')
    withdraw(@Param('id', new ParseUUIDPipe()) id: string, @Body(TransactionValidationPipe) body: TransactionDto) {
        if (body.target_account_id) {
            body.target_account_id = null;
        }
        this.accountService.updateBalance(id, body.amount_money.amount, 'withdraw');
        return this.transactionService.withdraw(body);
    }

    @Post('send')
    send(@Param('id', new ParseUUIDPipe()) id: string, @Body(TransactionValidationPipe) body: TransactionDto) {
        const amount = body.amount_money.amount;
        this.accountService.updateBalance(id, amount, 'withdraw');
        this.accountService.updateBalance(body.target_account_id, amount, 'deposit');
        return this.transactionService.send(body);
    }
}
