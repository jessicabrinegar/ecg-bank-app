import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
// import { PostAccountDto } from './dtos/post-account.dto';
import { Account } from './models/account.model';


@Injectable()
export class AccountsService {
    private accounts: Account[] = [];

    findAll(): Account[] {
        return this.accounts; 
    }

    findByID(id: string) {
        const account = this.accounts.find((account) => account.id === id);
        if (!account) {
            throw new NotFoundException(`No account found with ID ${id}.`)
        }
        return account;
    }

    create(account: Account): string {
        this.accounts.push(account);
        return `Account with ID ${account.id} created successfully.`
    }

    withdraw(id: string, amount: number) {
        const account = this.findByID(id);
        const current_balance = account.balance.amount;
        if(current_balance < amount) {
            throw new NotAcceptableException('Amount exceeds the current balance of the account.')
        }
        return account.balance.amount -= amount;
    }

    deposit(id: string, amount: number) {
        const account = this.findByID(id);
        return account.balance.amount += amount;
    }
}