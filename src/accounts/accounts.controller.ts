import { Controller, Get, Post, Body, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountDto } from './models/account.dto';
import { AccountValidationPipe } from './pipes/account.pipe';

@Controller('accounts')
export class AccountsController {
    constructor(private accountsService: AccountsService) {}
    @Get()
    findAll(): AccountDto[] {
        return this.accountsService.findAll();
    }

    @Get("/:id")
    findById(@Param('id', new ParseUUIDPipe()) id: string): AccountDto {
        return this.accountsService.findById(id);
    }

    @Post()
    create(@Body(AccountValidationPipe) body: AccountDto) {
        return this.accountsService.create(body);
    }

    @Patch("/:id")
    update(
        @Param('id', new ParseUUIDPipe()) id: string, 
        @Body(AccountValidationPipe) body: Partial<AccountDto>
    ){
        return this.accountsService.updateAccount(id, body);
    }
}
