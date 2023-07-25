import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from './transactions.repository';
import { BasicTransactionDto, SendTransactionDto } from './dtos/basic-transaction.dto';

@Injectable()
export class TransactionsService {
    transactionRepo: TransactionsRepository;

    constructor(repo: TransactionsRepository) {
        this.transactionRepo = repo;
    }

    getAllFromAccount(id: string) {
        return this.transactionRepo.getAllFromAccount(id);
    }

    depositMoney(body: BasicTransactionDto) {
        return this.transactionRepo.depositMoney(body);
    }

    withdrawMoney(body: BasicTransactionDto) {
        return this.transactionRepo.withdrawMoney(body);
    }

    sendMoney(body: SendTransactionDto) {
        return this.transactionRepo.sendMoney(body);
    }

    getAllTransactions() {
        return this.transactionRepo.getAll();
    }
}
