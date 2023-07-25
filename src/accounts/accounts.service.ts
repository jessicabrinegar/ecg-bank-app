import { Injectable, NotFoundException } from '@nestjs/common';
import { PostAccountDto } from './dtos/post-account.dto';
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
            throw new NotFoundException(`No account with id ${id} was found.`)
        }
        return account;
    }

    postAccount(body: PostAccountDto): string {
        const account = body;
        this.accounts.push(account);
        return "Account created successfully."
    }
}