import { Repository } from 'typeorm';
import { Account } from './models/account.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AccountsRepository extends Repository<Account> {

    constructor(
        @InjectRepository(Account)
        repo: Repository<Account>
    ) {
        super(repo.target, repo.manager, repo.queryRunner);
    }
}