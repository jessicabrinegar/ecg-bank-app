// import { UUID } from "crypto";

export class TransactionDto {
    // readonly id: string;
    target_account_id?: string;
    note: string | null;
    amount_money: {
        amount: number;
        currency: string;
    }
}