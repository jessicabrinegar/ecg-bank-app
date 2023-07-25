import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from './transactions.repository';
import { TransactionDto } from './dtos/transaction.dto';

@Injectable()
export class TransactionsService {
    transactionRepo: TransactionsRepository;

    constructor(repo: TransactionsRepository) {
        this.transactionRepo = repo;
    }

    getAllFromAccount(id: string) {
        return this.transactionRepo.getAllFromAccount(id);
    }

    depositMoney(body: TransactionDto) {
        return this.transactionRepo.depositMoney(body);
    }

    withdrawMoney(body: TransactionDto) {
        return this.transactionRepo.withdrawMoney(body);
    }

    sendMoney(body: TransactionDto) {
        return this.transactionRepo.sendMoney(body);
    }

    getAllTransactions() {
        return this.transactionRepo.getAll();
    }
}
