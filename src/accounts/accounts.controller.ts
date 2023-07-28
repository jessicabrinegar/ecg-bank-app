import { Controller, Get, Post, Body } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { randomUUID } from 'crypto';
import { IsParamUUID } from 'src/utils/is-param-uuid.decorator';
import { Account } from './models/account.model';
import { PostAccountDto } from './dtos/post-account.dto';

@Controller('accounts')
export class AccountsController {
    constructor(private accountsService: AccountsService) {}
    @Get()
    findAll(): Account[] {
        return this.accountsService.findAll();
    }

    @Get("/:id")
    findByID(@IsParamUUID() id: string): Account {
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
