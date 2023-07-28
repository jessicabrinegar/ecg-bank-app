import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { PostAccountDto } from './dtos/post-account.dto';
// import { isUUID } from 'src/utils/uuid.util';
import { randomUUID } from 'crypto';
import { Account } from './models/account.model';
import { TransactionDto } from 'src/transactions/dtos/transaction.dto';

@Controller('accounts')
export class AccountsController {
    constructor(private accountsService: AccountsService) {}
    @Get()
    getAllAccounts() {
        return this.accountsService.getAllAccounts();
    }

    @Get("/:id")
    getAccount(@Param('id') id: string) {
        return this.accountsService.getAccount(id);
    }

    @Post()
    createAccount(@Body() body: PostAccountDto) {
        const account: Account = {
            id: randomUUID(),
            ...body,
        };
        console.log(account.balance, typeof account.balance);
        return this.accountsService.createAccount(account);
    }
}
