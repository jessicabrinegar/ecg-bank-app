import { Injectable } from '@nestjs/common';
import { BasicTransactionDto } from './dtos/basic-transaction.dto';
import { SendTransactionDto } from './dtos/basic-transaction.dto';

const transactions = [];

@Injectable()
export class TransactionsRepository {
    getAllFromAccount(id: string) {
        return transactions[id];
    }

    depositMoney(body: BasicTransactionDto) {
        transactions.push(body);
        return `Deposit of ${body.amount_money.amount} added successfully.`
    }

    withdrawMoney(body: BasicTransactionDto) {
        transactions.push(body);
        return `Withdrawal of ${body.amount_money.amount} withdrawn successfully.`
    }

    sendMoney(body: SendTransactionDto) {
        transactions.push(body);
        return `Successfully sent ${body.amount_money.amount}`;
    }
}