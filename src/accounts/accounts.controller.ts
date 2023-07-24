import { Controller, Get, Post, Body } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { PostAccountDto } from './dtos/post-account.dto';

@Controller('accounts')
export class AccountsController {
    constructor(private accountsService: AccountsService) {}
    // get all accounts
    @Get()
    getAllAccounts() {
        return this.accountsService.getAllAccounts();
    }

    @Get("/:id")
    getAccount(id: string) {
        return this.accountsService.getAccount(id);
    }

    @Post()
    createAccount(@Body() body: PostAccountDto) {
        return this.accountsService.postAccount(body);
    }
}
