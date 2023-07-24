import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from './transactions.repository';

@Injectable()
export class TransactionsService {
    transactionRepo: TransactionsRepository;

    constructor(repo: TransactionsRepository) {
        this.transactionRepo = repo;
    }

    getAllFromAccount(id: string) {
        return this.transactionRepo.getAllFromAccount(id);
    }
}
