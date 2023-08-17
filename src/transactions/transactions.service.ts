import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TransactionDto } from './models/transaction.dto';
import { Repository } from 'typeorm';
import { Transaction } from './models/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/accounts/models/account.entity';
import { TransactionsRepository } from './transactions.repository';
import { AccountsRepository } from 'src/accounts/accounts.repository';

@Injectable()
export class TransactionsService {
    
    constructor(
        private transactionsRepo: TransactionsRepository
    ) {}

    async findAll(): Promise<Transaction[]> {
        return await this.transactionsRepo.findAll();
    }

    async findAllInAccount(id: string): Promise<Transaction[]> {
        const transactions = await this.transactionsRepo.findAllInAccount(id)
        if (!transactions) {
            throw new NotFoundException(`No transactions found for account with id ${id}.`);
        }
        return transactions;
    }

    async newTransaction(id: string, data: TransactionDto): Promise<Transaction> {
        return await this.transactionsRepo.newTransaction(id, data);
    }
}
