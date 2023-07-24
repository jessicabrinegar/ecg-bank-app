import { UUID } from "crypto";

export class BasicTransactionDto {
    id: UUID;
    note: string;
    amount_money: {
        amount: number;
        currency: string;
    }
}

export class SendTransactionDto {
    id: UUID;
    target_account_id: string;
    note: string;
    amount_money: {
        amount: number;
        currency: string;
    };
}