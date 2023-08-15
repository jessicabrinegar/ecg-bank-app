import { BadRequestException, Injectable } from '@nestjs/common';
import { AccountDto } from './models/account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './models/account.entity';
import { Repository } from 'typeorm';


@Injectable()
export class AccountsService {
    private accounts: AccountDto[] = [];

    constructor(
        @InjectRepository(Account)
        private accountsRepository: Repository<Account>,
    ) {}

    async findAll(): Promise<AccountDto[]> {
        return this.accountsRepository.find();
    }

    async findById(id: string): Promise<AccountDto | null> {
        return this.accountsRepository.findOneBy({ id: id });
    }

    async create(account: AccountDto): Promise<AccountDto> {
        return this.accountsRepository.create(account);
    }

    async updateAccount(id: string, data: Partial<AccountDto>): Promise<AccountDto> {
        await this.accountsRepository.update(id, {...data});
        return this.accountsRepository.findOneBy({ id: id });
    }

    async updateBalance(id: string, amount: number, type: 'deposit' | 'withdraw'): Promise<{ newBalance: number }> {
        const account = await this.accountsRepository.findOneBy({ id: id });
        let updatedAmount: number;
        if (type === 'withdraw') {
            const currentBalance = account.balance.amount;
            if (currentBalance < amount) {
                throw new BadRequestException('Insufficient funds.')
            }
            updatedAmount = currentBalance - amount;
        }
        else if (type === 'deposit') {
            const currentBalance = account.balance.amount;
            updatedAmount = currentBalance + amount;
        }
        const updatedBalance = {amount: updatedAmount, currency: account.balance.currency};
        await this.accountsRepository.update(id, {balance: updatedBalance});

        return { newBalance: updatedAmount };
    }
}