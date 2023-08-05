import { Controller, Get, Post, Body, NotAcceptableException, Param, ParseUUIDPipe } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { AccountsService } from 'src/accounts/accounts.service';
import { randomUUID } from 'crypto';
import { TransactionDto } from './dtos/transaction.dto';
import { TransactionValidationPipe } from './pipes/transaction-validation.pipe';
import { SendValidationPipe } from './pipes/send-validation.pipe';

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
        this.accountService.deposit(id, body.amount_money.amount);
        const transaction: TransactionDto = {
            id: randomUUID(),
            // target_account_id: null,
            ...body,
            account_id: id,
        };
        return this.transactionService.deposit(transaction);
    }

    @Post('withdraw')
    withdraw(@Param('id', new ParseUUIDPipe()) id: string, @Body(TransactionValidationPipe) body: TransactionDto) {
        if (body.target_account_id) {
            body.target_account_id = null;
        }
        this.accountService.withdraw(id, body.amount_money.amount);
        const transaction: TransactionDto = {
            id: randomUUID(),
            ...body,
            account_id: id,
        };
        return this.transactionService.withdraw(transaction);
    }

    @Post('send')
    send(@Param('id', new ParseUUIDPipe()) id: string, @Body(TransactionValidationPipe, SendValidationPipe) body: TransactionDto) {
        const amount = body.amount_money.amount;
        if (amount < 1 || amount > 1000) {
            throw new NotAcceptableException('Amount sent must be between 1 and 1,000 USD.')
        }
        this.accountService.withdraw(id, amount);
        this.accountService.deposit(body.target_account_id, amount);
        const transaction: TransactionDto = {
            id: randomUUID(),
            ...body,
            account_id: id,
        };
        return this.transactionService.send(transaction);
    }
}
