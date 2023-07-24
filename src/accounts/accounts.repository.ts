import { Injectable } from '@nestjs/common';
import { PostAccountDto } from './dtos/post-account.dto';

const accounts = [];

@Injectable()
export class AccountsRepository {
    getAllAccounts() {
        return accounts; 
    }

    getAccount(id: string) {
        return accounts[id];
    }

    postAccount(body: PostAccountDto) {
        const account = body;
        accounts.push(account);
        return "Account created successfully."
    }
}

