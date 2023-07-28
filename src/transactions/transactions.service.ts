import { Injectable } from '@nestjs/common';
// import { TransactionDto } from './dtos/transaction.dto';
import { Transaction } from './models/transaction.model';

@Injectable()
export class TransactionsService {
    private transactions: Transaction[] = [];

    getAllFromAccount(id: string) {
        const transactions = this.transactions.filter((entry) => entry.account_id === id);
        // if (!transactions) {
        //     throw new NotFoundException(`No transactions found for account with id ${id}.`);
        // }
        return transactions;
    }

    depositMoney(body: Transaction) {
        this.transactions.push(body);
        return `Deposit of ${body.amount_money.amount} added successfully.`
    }

    withdrawMoney(body: Transaction) {
        this.transactions.push(body);
        return `Withdrawal of ${body.amount_money.amount} withdrawn successfully.`
    }

    sendMoney(body: Transaction) {
        this.transactions.push(body);
        return `Successfully sent ${body.amount_money.amount}`;
    }

    getAll() {
        return this.transactions;
    }
}
