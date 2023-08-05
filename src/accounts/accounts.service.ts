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

    update(id: string, data: Partial<AccountDto>): AccountDto {
        // immutable data should not be changed. create & return new version of the data
        const index = this.accounts.findIndex(account => account.id === id);
        const updatedAccount = { ...this.accounts[index], ...data};
        this.accounts = [
            ...this.accounts.slice(0, index),
            updatedAccount,
            ...this.accounts.slice(index + 1)
        ];
        return updatedAccount;
    }

    withdraw(id: string, amount: number): { newBalance: number } {
        const index = this.accounts.findIndex(account => account.id === id);
        const current_balance = this.accounts[index].balance.amount;
        if(current_balance < amount) {
            throw new NotAcceptableException('Amount exceeds the current balance of the account.')
        }
        const updatedAccount = { ...this.accounts[index]};
        updatedAccount.balance.amount = current_balance - amount;
        this.accounts = [
            ...this.accounts.slice(0, index),
            updatedAccount,
            ...this.accounts.slice(index + 1)
        ];
        // return structured data that the client can use (vs a success message)
        return { newBalance: updatedAccount.balance.amount };
    }

    deposit(id: string, amount: number): { newBalance: number } {
        const index = this.accounts.findIndex(account => account.id === id);
        const current_balance = this.accounts[index].balance.amount;
        const updatedAccount = { ...this.accounts[index]};
        updatedAccount.balance.amount = current_balance + amount;
        this.accounts = [
            ...this.accounts.slice(0, index),
            updatedAccount,
            ...this.accounts.slice(index + 1)
        ];
        return { newBalance: updatedAccount.balance.amount };
    }
}