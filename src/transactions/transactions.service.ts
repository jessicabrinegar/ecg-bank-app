import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionDto } from './dtos/transaction.dto';

@Injectable()
export class TransactionsService {
    private transactions: TransactionDto[] = [];

    findAll(): TransactionDto[] {
        return this.transactions;
    }

    findAllInAccount(id: string) {
        const transactions = this.transactions.filter((entry) => entry.account_id === id);
        if (!transactions) {
            throw new NotFoundException(`No transactions found for account with id ${id}.`);
        }
        return transactions;
    }

    deposit(data: TransactionDto) {
        this.transactions.push(data);
        return data;
    }

    withdraw(data: TransactionDto) {
        this.transactions.push(data);
        return data;
    }

    send(data: TransactionDto) {
        this.transactions.push(data);
        return data;
    }
}
