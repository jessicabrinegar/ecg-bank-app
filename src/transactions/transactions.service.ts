import { Injectable } from '@nestjs/common';
import { Transaction } from './models/transaction.model';

@Injectable()
export class TransactionsService {
    private transactions: Transaction[] = [];

    findAll(): Transaction[] {
        return this.transactions;
    }

    findAllInAccount(id: string) {
        const transactions = this.transactions.filter((entry) => entry.account_id === id);
        // if (!transactions) {
        //     throw new NotFoundException(`No transactions found for account with id ${id}.`);
        // }
        return transactions;
    }

    deposit(body: Transaction) {
        this.transactions.push(body);
        return `Deposit of ${body.amount_money.amount} added successfully.`
    }

    withdraw(body: Transaction) {
        this.transactions.push(body);
        return `Withdrawal of ${body.amount_money.amount} withdrawn successfully.`
    }

    send(body: Transaction) {
        this.transactions.push(body);
        return `Successfully sent ${body.amount_money.amount}`;
    }
}
