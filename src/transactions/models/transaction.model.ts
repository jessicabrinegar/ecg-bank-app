export interface Transaction {
    id: string;
    target_account_id: string;
    note: string;
    amount_money: {
        amount: number;
        currency: string;
    }
    account_id: string;
}