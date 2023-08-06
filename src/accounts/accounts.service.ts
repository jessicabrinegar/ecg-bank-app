import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { AccountDto } from './dtos/account.dto';


@Injectable()
export class AccountsService {
    private accounts: AccountDto[] = [];

    findAll(): AccountDto[] {
        return this.accounts; 
    }

    findById(id: string) {
        const account = this.accounts.find((account) => account.id === id);
        if (!account) {
            throw new NotFoundException(`No account found with ID ${id}.`)
        }
        return account;
    }

    create(account: AccountDto): AccountDto {
        this.accounts.push(account);
        return account;
    }

    updateAccount(id: string, data: Partial<AccountDto>): AccountDto {
        // data should not be changed (immutable). create & return new version of the data
        const index = this.accounts.findIndex(account => account.id === id);
        if (index === -1) {
            throw new NotFoundException(`No account found with ID ${id}`);
        }
        const updatedAccount = { ...this.accounts[index], ...data};
        this.accounts = [
            ...this.accounts.slice(0, index),
            updatedAccount,
            ...this.accounts.slice(index + 1)
        ];
        return updatedAccount;
    }

    updateBalance(id: string, amount: number, type: string): { newBalance: number } {
        const index = this.accounts.findIndex(account => account.id === id);
        if (index === -1) {
            throw new NotFoundException(`No account found with ID ${id}`);
        }
        const current_balance = this.accounts[index].balance.amount;
        const account = { ...this.accounts[index]};
        if (type === 'withdraw') {
            if (current_balance < amount) {
                throw new NotAcceptableException('Amount exceeds the current balance of the account.')
            }
            account.balance.amount = current_balance - amount;
        }
        else if (type === 'deposit') {
            account.balance.amount = current_balance + amount;
        }
        this.accounts = [
            ...this.accounts.slice(0, index),
            account,
            ...this.accounts.slice(index + 1)
        ];
        return { newBalance: account.balance.amount };
    }
}