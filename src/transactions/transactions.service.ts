import { Injectable, NotFoundException } from '@nestjs/common';
import { Transaction } from './models/transaction.model';

@Injectable()
export class TransactionsService {
    private transactions: Transaction[] = [];

    findAll(): Transaction[] {
        return this.transactions;
    }

    findAllInAccount(id: string) {
        const transactions = this.transactions.filter((entry) => entry.account_id === id);
        if (!transactions) {
            throw new NotFoundException(`No transactions found for account with id ${id}.`);
        }
        return transactions;
    }

    deposit(data: Transaction) {
        this.transactions.push(data);
        return `${data.amount_money.amount} deposited successfully.`
    }

    withdraw(data: Transaction) {
        this.transactions.push(data);
        return `${data.amount_money.amount} withdrawn successfully.`
    }

    send(data: Transaction) {
        this.transactions.push(data);
        return `${data.amount_money.amount} successfully sent.`;
    }
}
