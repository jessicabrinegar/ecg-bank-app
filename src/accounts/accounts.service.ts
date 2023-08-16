import { BadRequestException, Injectable } from '@nestjs/common';
import { AccountDto } from './models/account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './models/account.entity';
import { AccountsRepository } from './accounts.repository';

@Injectable()
export class AccountsService {

    constructor(
        @InjectRepository(Account)
        private accountsRepository: AccountsRepository,
    ) {}

    findAll(): Promise<Account[]> {
        return this.accountsRepository.find();
    }

    findById(id: string): Promise<Account | null> {
        return this.accountsRepository.findOneBy({id: id});
    }

    createAccount(account: AccountDto): Promise<Account> {
        const newAccount = this.accountsRepository.create(account);
        return this.accountsRepository.save(newAccount);
    }

    sayHello(){
        return this.accountsRepository.sayHello();
    }

    async updateAccount(id: string, data: Partial<AccountDto>): Promise<Account> {
        await this.accountsRepository.update(id, {...data});
        const account = await this.accountsRepository.findOneBy({ id: id });
        return account;
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