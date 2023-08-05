import { Controller, Get, Post, Body, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { randomUUID } from 'crypto';
import { AccountDto } from './dtos/account.dto';
import { AccountValidationPipe } from './pipes/account.pipe';
import { AccountUpdateValidationPipe } from './pipes/account-update.pipe';

@Controller('accounts')
export class AccountsController {
    constructor(private accountsService: AccountsService) {}
    @Get()
    findAll(): AccountDto[] {
        return this.accountsService.findAll();
    }

    @Get("/:id")
    findByID(@Param('id', new ParseUUIDPipe()) id: string): AccountDto {
        return this.accountsService.findById(id);
    }

    @Post()
    create(@Body(AccountValidationPipe) body: AccountDto) {
        const account: AccountDto = {
            id: randomUUID(),
            ...body,
        };
        return this.accountsService.create(account);
    }

    @Patch("/:id")
    update(@Param('id', new ParseUUIDPipe()) id: string, @Body(AccountUpdateValidationPipe) body: Partial<AccountDto>) {
        return this.accountsService.update(id, body);
    }
}
