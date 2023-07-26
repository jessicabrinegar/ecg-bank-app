// import { UUID } from "crypto";

export interface Transaction {
    id: string;
    target_account_id?: string | null;
    note: string | null;
    amount_money: {
        amount: number;
        currency: string;
    }
    account_id: string;
}