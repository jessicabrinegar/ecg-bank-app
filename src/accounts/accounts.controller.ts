import { Controller, Get, Post, Body, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountDto } from './models/account.dto';
import { AccountValidationPipe } from './pipes/account.pipe';
// import { Account } from './models/account.entity';

@Controller('accounts')
export class AccountsController {
    constructor(private accountsService: AccountsService) {}
    @Get()
    findAll(): Promise<AccountDto[]> {
        return this.accountsService.findAll();
    }

    @Get("/:id")
    findById(@Param('id', new ParseUUIDPipe()) id: string): Promise<AccountDto> {
        this.accountsService.sayHello()
        return this.accountsService.findById(id);
    }

    @Post()
    createAccount(@Body() body: AccountDto) {
        return this.accountsService.createAccount(body);
    }

    @Patch("/:id")
    update(
        @Param('id', new ParseUUIDPipe()) id: string, 
        @Body(AccountValidationPipe) body: Partial<AccountDto>
    ){
        return this.accountsService.updateAccount(id, body);
    }
}
