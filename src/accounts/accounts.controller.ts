import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { PostAccountDto } from './dtos/post-account.dto';
import { isUUID } from 'src/utils/uuid.util';

@Controller('accounts')
export class AccountsController {
    constructor(private accountsService: AccountsService) {}
    // get all accounts
    @Get()
    getAllAccounts() {
        return this.accountsService.getAllAccounts();
    }

    @Get("/:id")
    getAccount(@Param() params: any) {
        return this.accountsService.getAccount(params.id);
    }

    @Post()
    createAccount(@Body() body: PostAccountDto) {
        return this.accountsService.postAccount(body);
    }
}
