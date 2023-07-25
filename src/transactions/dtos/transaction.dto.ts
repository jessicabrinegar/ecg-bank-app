import { UUID } from "crypto";

export class TransactionDto {
    readonly id: UUID;
    readonly target_account_id?: string;
    readonly note: string;
    readonly amount_money: {
        amount: number;
        currency: string;
    }
}