import { Injectable, NotFoundException } from '@nestjs/common';
// import { PostAccountDto } from './dtos/post-account.dto';
import { Account } from './models/account.model';


@Injectable()
export class AccountsService {
    private accounts: Account[] = [];

    getAllAccounts(): Account[] {
        return this.accounts; 
    }

    getAccount(id: string) {
        const account = this.accounts.find((account) => account.id === id);
        if (!account) {
            throw new NotFoundException(`No account with ID ${id} was found.`)
        }
        return account;
    }

    createAccount(account: Account): string {
        this.accounts.push(account);
        return `Account with ID ${account.id} created successfully.`
    }

    removeMoney(id: string, amount: number) {
        const account = this.accounts.find((account) => account.id === id);
        account.balance.amount -= amount;
        return console.log('removeMoney service fx called');
    }

    addMoney(id: string, amount: number) {
        const account = this.accounts.find((account) => account.id === id);
        console.log(this.accounts);
        account.balance.amount += amount;
        return console.log('addMoney service fx called');
    }
}