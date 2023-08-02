import { Controller, Get, Post, Body, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { randomUUID } from 'crypto';
import { Account } from './models/account.model';
import { PostAccountDto } from './dtos/post-account.dto';
import { AccountValidationPipe } from './pipes/account.pipe';
import { AccountUpdateValidationPipe } from './pipes/account-update.pipe';

@Controller('accounts')
export class AccountsController {
    constructor(private accountsService: AccountsService) {}
    @Get()
    findAll(): Account[] {
        return this.accountsService.findAll();
    }

    @Get("/:id")
    findByID(@Param('id', new ParseUUIDPipe()) id: string): Account {
        return this.accountsService.findByID(id);
    }

    @Post()
    create(@Body(AccountValidationPipe) body: PostAccountDto) {
        const account: Account = {
            id: randomUUID(),
            ...body,
        };
        return this.accountsService.create(account);
    }

    @Patch("/:id")
    update(@Param('id', new ParseUUIDPipe()) id: string, @Body(AccountUpdateValidationPipe) body: Partial<PostAccountDto>) {
        return this.accountsService.update(id, body);
    }
}
