import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { AccountDto, Balance } from './dtos/account.dto';


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
        const accountToUpdate = this.accounts.find(account => account.id === id);
        if (!accountToUpdate) {
            throw new NotFoundException(`No account found with ID ${id}`);
        }
        const updatedAccount = { ...accountToUpdate, ...data};
        this.accounts = this.accounts.map(account => 
            account.id === id ? updatedAccount : account
        );
        return updatedAccount;
    }

    updateBalance(id: string, amount: number, type: 'deposit' | 'withdraw'): { newBalance: number } {
        const accountToUpdate = this.accounts.find(account => account.id === id);
        if (!accountToUpdate) {
            throw new NotFoundException(`No account found with ID ${id}`);
        }
        const currentBalance = accountToUpdate.balance;
        let updatedBalance: Balance;
        if (type === 'withdraw') {
            if (currentBalance.amount < amount) {
                throw new NotAcceptableException('Amount exceeds the current balance of the account.')
            }
            updatedBalance = {...currentBalance, amount: currentBalance.amount - amount};
        }
        else if (type === 'deposit') {
            updatedBalance = {...currentBalance, amount: currentBalance.amount + amount};
        }
        const updatedAccount = { ...accountToUpdate, updatedBalance }
        this.accounts = this.accounts.map(account => 
            account.id === id ? updatedAccount : account
        );
        return { newBalance: updatedBalance.amount };
    }
}