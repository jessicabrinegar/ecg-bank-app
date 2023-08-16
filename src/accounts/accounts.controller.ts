import { Controller, Get, Post, Body, Param, ParseUUIDPipe, Patch, BadRequestException } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountDto } from './models/account.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Account } from './models/account.entity';

@Controller('accounts')
export class AccountsController {
    constructor(private accountsService: AccountsService) {}
    @Get()
    findAll(): Promise<Account[]> {
        return this.accountsService.findAll();
    }

    @Get("/:id")
    findById(@Param('id', new ParseUUIDPipe()) id: string): Promise<Account> {
        return this.accountsService.findById(id);
    }

    @Post()
    createAccount(@Body() body: AccountDto) {
        return this.accountsService.createAccount(body);
    }

    @Patch("/:id")
    async update(
        @Param('id', new ParseUUIDPipe()) id: string, 
        @Body() body: Partial<AccountDto>
    ){
        if (body.balance !== undefined) {
            throw new BadRequestException('Update to balance is unauthorized.')
        }
        // Convert the partial object to a complete AccountDto instance
        const accountDto = plainToClass(AccountDto, body);
        // Validate the complete object using class-validator
        const errors = await validate(accountDto, {skipMissingProperties: true});

        if (errors.length) {
            const message = errors.map((err) => err.constraints)
            throw new BadRequestException(message);
        }
        return this.accountsService.updateAccount(id, body);
    }
}
