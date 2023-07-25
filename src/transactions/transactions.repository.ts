import { Injectable } from '@nestjs/common';
import { TransactionDto } from './dtos/transaction.dto';

const transactions = [];

@Injectable()
export class TransactionsRepository {
    getAllFromAccount(id: string) {
        return transactions[id];
    }

    depositMoney(body: TransactionDto) {
        transactions.push(body);
        return `Deposit of ${body.amount_money.amount} added successfully.`
    }

    withdrawMoney(body: TransactionDto) {
        transactions.push(body);
        return `Withdrawal of ${body.amount_money.amount} withdrawn successfully.`
    }

    sendMoney(body: TransactionDto) {
        transactions.push(body);
        return `Successfully sent ${body.amount_money.amount}`;
    }

    getAll() {
        return transactions;
    }
}