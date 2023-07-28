import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { PostAccountDto } from './dtos/post-account.dto';
import { randomUUID } from 'crypto';
import { Account } from './models/account.model';

@Controller('accounts')
export class AccountsController {
    constructor(private accountsService: AccountsService) {}
    @Get()
    findAll(): Account[] {
        return this.accountsService.findAll();
    }

    @Get("/:id")
    findByID(@Param('id') id: string): Account {
        return this.accountsService.findByID(id);
    }

    @Post()
    create(@Body() body: PostAccountDto) {
        const account: Account = {
            id: randomUUID(),
            ...body,
        };
        return this.accountsService.create(account);
    }
}
