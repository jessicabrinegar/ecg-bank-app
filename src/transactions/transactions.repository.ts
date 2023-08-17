import { Repository } from 'typeorm';
import { Transaction } from './models/transaction.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SendDto, TransactionDto } from './models/transaction.dto';
import { AccountsRepository } from 'src/accounts/accounts.repository';

@Injectable()
export class TransactionsRepository {

    constructor(
        @InjectRepository(Transaction)
        private transactionsRepo: Repository<Transaction>,
        private accountsRepo: AccountsRepository
    ) {}

    queryBuilder() {
        return this.transactionsRepo.createQueryBuilder("transaction")
        .select(['transaction.*'])
        .leftJoin('transaction.account', 'account')
    }

    findAll(): Promise<Transaction[]> {
        const transactions = this.queryBuilder()
        .getRawMany();
        return transactions;
    }

    async findAllInAccount(id: string): Promise<Transaction[]> {
        const transactions = this.queryBuilder()
        .where('account_id = :accountId', {accountId: id})
        .getRawMany();
        return transactions;
    }

    async newTransaction(id: string, data: SendDto | TransactionDto): Promise<Transaction> {
        const newTransaction = this.transactionsRepo.create({
            ...data,
            account: await this.accountsRepo.findOneBy({id: id})
        });
        if('target_account_id' in data) {
            newTransaction.target_account = await this.accountsRepo.findOneBy({id: data.target_account_id})
        }
        await this.transactionsRepo.save(newTransaction);
        const result = this.queryBuilder()
        .where('transaction.id = :transactionId', {transactionId: newTransaction.id})
        .getRawOne();
        return result;
    }
}