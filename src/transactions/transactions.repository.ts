import { Repository } from 'typeorm';
import { Transaction } from './models/transaction.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionDto } from './models/transaction.dto';
import { AccountsRepository } from 'src/accounts/accounts.repository';

@Injectable()
export class TransactionsRepository {

    constructor(
        @InjectRepository(Transaction)
        private repo: Repository<Transaction>,
        private accountsRepo: AccountsRepository
    ) {}

    queryBuilder() {
        return this.repo.createQueryBuilder("transaction")
        .select(['transaction.*'])
        .leftJoin('transaction.account', 'account')
    }

    findAll(): Promise<Transaction[]> {
        const transactions = this.queryBuilder()
        .getRawMany();
        return transactions;
    }

    findAllInAccount(id: string): Promise<Transaction[]> {
        const transactions = this.queryBuilder()
        .where('account_id = :accountId', {accountId: id})
        .getRawMany();
        return transactions;
    }

    async newTransaction(id: string, data: TransactionDto): Promise<Transaction> {
        const newTransaction = this.repo.create({
            ...data,
            account: await this.accountsRepo.findOneBy({id: id})
        });
        await this.repo.save(newTransaction);
        const result = this.queryBuilder()
        .where('transaction.id = :transactionId', {transactionId: newTransaction.id})
        .getRawOne();
        return result;
    }

}