import { Injectable } from '@nestjs/common';
import { AccountsRepository } from './accounts.repository';
import { PostAccountDto } from './dtos/post-account.dto';


@Injectable()
export class AccountsService {
    accountsRepo: AccountsRepository;

    constructor(repo: AccountsRepository) {
      this.accountsRepo = repo;
    }

    getAllAccounts() {
        return this.accountsRepo.getAllAccounts();
    }

    getAccount(id: string) {
        return this.accountsRepo.getAccount(id);
    }

    postAccount(body: PostAccountDto) {
        console.log(body);
        return this.accountsRepo.postAccount(body);
    }
}
